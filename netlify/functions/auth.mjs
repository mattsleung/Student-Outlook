import { CALLBACK_URL, createSignedState } from "./oauth-lib.mjs";

const STATE_COOKIE = "student_outlook_oauth_state";

function configurationError() {
  return {
    statusCode: 503,
    headers: { "Cache-Control": "no-store", "Content-Type": "text/plain" },
    body: "The writing dashboard authentication service is not configured.",
  };
}

export async function handler(event) {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method not allowed" };
  }
  if (event.queryStringParameters?.provider !== "github") {
    return { statusCode: 400, body: "Only GitHub authentication is supported." };
  }

  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const stateSecret = process.env.OAUTH_STATE_SECRET;
  if (!clientId || !stateSecret) {
    return configurationError();
  }

  let signedState;
  try {
    signedState = createSignedState(stateSecret);
  } catch {
    return configurationError();
  }

  const authorizeUrl = new URL("https://github.com/login/oauth/authorize");
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("redirect_uri", CALLBACK_URL);
  authorizeUrl.searchParams.set("scope", "public_repo user:email");
  authorizeUrl.searchParams.set("state", signedState.state);

  return {
    statusCode: 302,
    headers: {
      "Cache-Control": "no-store",
      Location: authorizeUrl.toString(),
      "Set-Cookie": `${STATE_COOKIE}=${encodeURIComponent(signedState.nonce)}; Path=/.netlify/functions/; Max-Age=600; HttpOnly; Secure; SameSite=Lax`,
    },
    body: "",
  };
}
