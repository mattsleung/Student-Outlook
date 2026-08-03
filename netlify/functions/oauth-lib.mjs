import {
  createHmac,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";

export const DASHBOARD_ORIGIN = "https://student-outlook-auth.netlify.app";
export const CALLBACK_URL = `${DASHBOARD_ORIGIN}/.netlify/functions/oauth-callback`;
export const STATE_MAX_AGE_MS = 10 * 60 * 1000;

function sign(value, secret) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

export function parseAllowedUsers(value = "") {
  return new Set(
    value
      .split(",")
      .map((login) => login.trim().toLowerCase())
      .filter(Boolean),
  );
}

export function createSignedState(secret, now = Date.now(), nonce) {
  if (!secret || secret.length < 32) {
    throw new Error("OAUTH_STATE_SECRET must contain at least 32 characters.");
  }

  const stateNonce = nonce ?? randomBytes(24).toString("base64url");
  const payload = Buffer.from(
    JSON.stringify({
      nonce: stateNonce,
      issuedAt: now,
    }),
  ).toString("base64url");

  return {
    nonce: stateNonce,
    state: `${payload}.${sign(payload, secret)}`,
  };
}

export function verifySignedState(state, secret, cookieNonce, now = Date.now()) {
  if (!state || !secret || !cookieNonce) {
    throw new Error("The authorization request is missing required state.");
  }

  const [payload, signature, extra] = state.split(".");
  if (!payload || !signature || extra) {
    throw new Error("The authorization state is invalid.");
  }

  const expected = Buffer.from(sign(payload, secret));
  const received = Buffer.from(signature);
  if (
    expected.length !== received.length ||
    !timingSafeEqual(expected, received)
  ) {
    throw new Error("The authorization state signature is invalid.");
  }

  const data = JSON.parse(Buffer.from(payload, "base64url").toString());
  if (data.nonce !== cookieNonce) {
    throw new Error("The authorization state does not match this browser.");
  }
  if (
    typeof data.issuedAt !== "number" ||
    data.issuedAt > now + 30_000 ||
    now - data.issuedAt > STATE_MAX_AGE_MS
  ) {
    throw new Error("The authorization request has expired.");
  }

  return data;
}

export function readCookie(cookieHeader = "", name) {
  for (const part of cookieHeader.split(";")) {
    const [key, ...value] = part.trim().split("=");
    if (key === name) {
      return decodeURIComponent(value.join("="));
    }
  }
  return undefined;
}

function safeJson(value) {
  return JSON.stringify(value).replace(/[<>&\u2028\u2029]/g, (character) =>
    `\\u${character.charCodeAt(0).toString(16).padStart(4, "0")}`,
  );
}

export function renderAuthorizationPage({ success, payload, title }) {
  const scriptNonce = randomBytes(18).toString("base64url");
  const messageType = success ? "success" : "error";
  const message = `authorization:github:${messageType}:${safeJson(payload)}`;
  const messageJson = safeJson(message);
  const originJson = safeJson(DASHBOARD_ORIGIN);
  const heading = success ? "Authorized" : "Access denied";
  const detail = success
    ? "You can return to the Student Outlook writing dashboard."
    : "This GitHub account is not approved to use the writing dashboard.";

  return {
    statusCode: success ? 200 : 403,
    headers: {
      "Cache-Control": "no-store",
      "Content-Security-Policy": `default-src 'none'; script-src 'nonce-${scriptNonce}'; style-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'`,
      "Content-Type": "text/html; charset=utf-8",
      "Referrer-Policy": "no-referrer",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
    },
    body: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <style>
      body { align-items: center; background: #f9f4e8; color: #112b46; display: flex; font-family: system-ui, sans-serif; justify-content: center; margin: 0; min-height: 100vh; }
      main { background: white; border: 2px solid #112b46; border-radius: 1rem; max-width: 32rem; padding: 2rem; text-align: center; }
    </style>
  </head>
  <body>
    <main><h1>${heading}</h1><p>${detail}</p></main>
    <script nonce="${scriptNonce}">
      const dashboardOrigin = ${originJson};
      const authorizationMessage = ${messageJson};
      window.addEventListener("message", (event) => {
        if (
          event.origin === dashboardOrigin &&
          event.data === "authorizing:github" &&
          window.opener
        ) {
          window.opener.postMessage(authorizationMessage, dashboardOrigin);
        }
      });
      if (window.opener) {
        window.opener.postMessage("authorizing:github", dashboardOrigin);
      }
    </script>
  </body>
</html>`,
  };
}
