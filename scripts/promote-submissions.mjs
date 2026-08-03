import { join } from "node:path";

import { promoteSubmissions } from "./published-workflow.mjs";

const root = process.cwd();
const promoted = promoteSubmissions(
  join(root, "content", "submissions"),
  join(root, "content", "articles"),
);

if (promoted.length === 0) {
  console.log("No article submissions are waiting to be published.");
} else {
  console.log(`Promoted ${promoted.length} article submission(s): ${promoted.join(", ")}`);
}
