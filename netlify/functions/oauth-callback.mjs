import {
  CALLBACK_URL,
  parseAllowedUsers,
  readCookie,
  renderAuthorizationPage,
  verifySignedState,
} from "./oauth-lib.mjs";

const STATE_COOKIE = "student_outlook_oauth_state";

function page(success, payload) {
  const response = renderAuthorizationPage({
    success,
    payload,
    title: success
      ? "Student Outlook authorization complete"
      : "Student Outlook access denied",
  });
  response.multiValueHeaders = {
    "Set-Cookie": [
      `${STATE_COOKIE}=; Path=/.netlify/functions/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`,
    ],
  };
  return response;
}

async function revokeToken(token, clientId, clientSecret) {
  try {
    await fetch(`https://api.github.com/applications/${clientId}/token`, {
      method: "DELETE",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        "Content-Type": "application/json",
        "User-Agent": "Student-Outlook-OAuth",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify({ access_token: token }),
    });
  } catch {
    // A failed cleanup must not grant dashboard access.
  }
}

export async function handler(event) {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;
  const stateSecret = process.env.OAUTH_STATE_SECRET;
  const allowedUsers = parseAllowedUsers(process.env.ALLOWED_GITHUB_USERS);
  if (!clientId || !clientSecret || !stateSecret || allowedUsers.size === 0) {
    return page(false, { message: "Authentication is not configured." });
  }

  try {
    const query = event.queryStringParameters ?? {};
    if (query.error) {
      throw new Error("GitHub authorization was cancelled.");
    }

    const cookieNonce = readCookie(event.headers?.cookie, STATE_COOKIE);
    const verifiedState = verifySignedState(query.state, stateSecret, cookieNonce);
    if (!query.code) {
      throw new Error("GitHub did not return an authorization code.");
    }

    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "User-Agent": "Student-Outlook-OAuth",
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code: query.code,
          redirect_uri: CALLBACK_URL,
        }),
      },
    );
    const tokenData = await tokenResponse.json();
    if (!tokenResponse.ok || !tokenData.access_token) {
      throw new Error("GitHub did not issue an access token.");
    }

    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${tokenData.access_token}`,
        "User-Agent": "Student-Outlook-OAuth",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    const user = await userResponse.json();
    const login = typeof user.login === "string" ? user.login.toLowerCase() : "";
    const isApproved =
      verifiedState.audience === "publisher"
        ? login === "mattsleung"
        : allowedUsers.has(login);
    if (!userResponse.ok || !isApproved) {
      await revokeToken(tokenData.access_token, clientId, clientSecret);
      return page(false, {
        message:
          verifiedState.audience === "publisher"
            ? "Only the Student Outlook owner can manage published articles."
            : "This GitHub account is not an approved Student Outlook writer.",
      });
    }

    return page(true, {
      provider: "github",
      token: tokenData.access_token,
    });
  } catch {
    return page(false, {
      message: "Authorization could not be verified. Please try again.",
    });
  }
}
