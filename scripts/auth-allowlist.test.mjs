import assert from "node:assert/strict";
import test from "node:test";

import { handler as startAuthentication } from "../netlify/functions/auth.mjs";
import { handler as finishAuthentication } from "../netlify/functions/oauth-callback.mjs";
import {
  createSignedState,
  parseAllowedUsers,
  readCookie,
  renderAuthorizationPage,
  verifySignedState,
} from "../netlify/functions/oauth-lib.mjs";

const secret = "a-secure-test-secret-with-more-than-32-characters";

test("normalizes and deduplicates approved GitHub users", () => {
  assert.deepEqual(
    [...parseAllowedUsers(" mattsleung,Writer-One,MATTSLEUNG ")],
    ["mattsleung", "writer-one"],
  );
});

test("accepts a matching, unexpired signed state", () => {
  const created = createSignedState(secret, 1_000, "browser-nonce");
  assert.equal(
    verifySignedState(created.state, secret, "browser-nonce", 2_000).nonce,
    "browser-nonce",
  );
});

test("rejects modified, mismatched, and expired state", () => {
  const created = createSignedState(secret, 1_000, "browser-nonce");
  assert.throws(() =>
    verifySignedState(`${created.state}x`, secret, "browser-nonce", 2_000),
  );
  assert.throws(() =>
    verifySignedState(created.state, secret, "other-browser", 2_000),
  );
  assert.throws(() =>
    verifySignedState(created.state, secret, "browser-nonce", 700_000),
  );
});

test("reads an exact cookie value", () => {
  assert.equal(readCookie("one=1; oauth=hello%20world", "oauth"), "hello world");
  assert.equal(readCookie("one=1", "oauth"), undefined);
});

test("authorization pages use strict headers and the Decap handshake", () => {
  const response = renderAuthorizationPage({
    success: false,
    payload: { message: "Denied <script>" },
    title: "Denied",
  });
  assert.equal(response.statusCode, 403);
  assert.match(response.headers["Content-Security-Policy"], /default-src 'none'/);
  assert.match(response.body, /authorizing:github/);
  assert.doesNotMatch(response.body, /Denied <script>/);
});

test("authentication start creates a signed request and secure cookie", async () => {
  const previousClientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const previousStateSecret = process.env.OAUTH_STATE_SECRET;
  process.env.GITHUB_OAUTH_CLIENT_ID = "test-client";
  process.env.OAUTH_STATE_SECRET = secret;

  try {
    const response = await startAuthentication({
      httpMethod: "GET",
      queryStringParameters: { provider: "github" },
    });
    assert.equal(response.statusCode, 302);
    assert.match(response.headers.Location, /^https:\/\/github\.com\/login\/oauth/);
    assert.match(response.headers["Set-Cookie"], /HttpOnly; Secure; SameSite=Lax/);
  } finally {
    process.env.GITHUB_OAUTH_CLIENT_ID = previousClientId;
    process.env.OAUTH_STATE_SECRET = previousStateSecret;
  }
});

test("callback denies an unapproved GitHub login and revokes its token", async () => {
  const previousFetch = globalThis.fetch;
  const previousEnvironment = {
    allowed: process.env.ALLOWED_GITHUB_USERS,
    clientId: process.env.GITHUB_OAUTH_CLIENT_ID,
    clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
    stateSecret: process.env.OAUTH_STATE_SECRET,
  };
  const created = createSignedState(secret, Date.now(), "browser-nonce");
  const requests = [];

  process.env.ALLOWED_GITHUB_USERS = "mattsleung";
  process.env.GITHUB_OAUTH_CLIENT_ID = "test-client";
  process.env.GITHUB_OAUTH_CLIENT_SECRET = "test-secret";
  process.env.OAUTH_STATE_SECRET = secret;
  globalThis.fetch = async (url, options = {}) => {
    requests.push({ url: String(url), method: options.method ?? "GET" });
    if (String(url).includes("login/oauth/access_token")) {
      return new Response(JSON.stringify({ access_token: "denied-token" }), {
        status: 200,
      });
    }
    if (String(url).endsWith("/user")) {
      return new Response(JSON.stringify({ login: "not-approved" }), {
        status: 200,
      });
    }
    return new Response(null, { status: 204 });
  };

  try {
    const response = await finishAuthentication({
      httpMethod: "GET",
      headers: { cookie: `student_outlook_oauth_state=browser-nonce` },
      queryStringParameters: { code: "test-code", state: created.state },
    });
    assert.equal(response.statusCode, 403);
    assert.ok(requests.some((request) => request.method === "DELETE"));
    assert.doesNotMatch(response.body, /denied-token/);
  } finally {
    globalThis.fetch = previousFetch;
    process.env.ALLOWED_GITHUB_USERS = previousEnvironment.allowed;
    process.env.GITHUB_OAUTH_CLIENT_ID = previousEnvironment.clientId;
    process.env.GITHUB_OAUTH_CLIENT_SECRET = previousEnvironment.clientSecret;
    process.env.OAUTH_STATE_SECRET = previousEnvironment.stateSecret;
  }
});
