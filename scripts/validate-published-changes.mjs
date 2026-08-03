import { execFileSync } from "node:child_process";

import { assertPublishedChangesAllowed } from "./published-workflow.mjs";

const [baseSha, headSha, author] = process.argv.slice(2);
if (!baseSha || !headSha || !author) {
  throw new Error("Expected a base commit, head commit, and pull-request author.");
}

const changedFiles = execFileSync(
  "git",
  ["diff", "--name-only", baseSha, headSha, "--", "content/articles"],
  { encoding: "utf8" },
)
  .split("\n")
  .map((file) => file.trim())
  .filter(Boolean);

assertPublishedChangesAllowed(author, changedFiles);
console.log("Published article ownership check passed.");
