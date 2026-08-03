import assert from "node:assert/strict";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import {
  assertPublishedChangesAllowed,
  promoteSubmissions,
} from "./published-workflow.mjs";

test("only mattsleung may change published article files", () => {
  assert.doesNotThrow(() =>
    assertPublishedChangesAllowed("mattsleung", ["content/articles/example.md"]),
  );
  assert.doesNotThrow(() =>
    assertPublishedChangesAllowed("approved-writer", ["content/submissions/example.md"]),
  );
  assert.throws(
    () =>
      assertPublishedChangesAllowed("approved-writer", [
        "content/articles/example.md",
      ]),
    /Only mattsleung/,
  );
});

test("approved submissions move into the published article folder", () => {
  const testRoot = join(tmpdir(), `student-outlook-publish-${process.pid}-${Date.now()}`);
  const submissions = join(testRoot, "submissions");
  const articles = join(testRoot, "articles");
  mkdirSync(submissions, { recursive: true });
  writeFileSync(join(submissions, "new-article.md"), "article contents");

  try {
    assert.deepEqual(promoteSubmissions(submissions, articles), ["new-article.md"]);
    assert.equal(readFileSync(join(articles, "new-article.md"), "utf8"), "article contents");
  } finally {
    rmSync(testRoot, { recursive: true, force: true });
  }
});

test("publishing refuses to overwrite an existing article", () => {
  const testRoot = join(tmpdir(), `student-outlook-collision-${process.pid}-${Date.now()}`);
  const submissions = join(testRoot, "submissions");
  const articles = join(testRoot, "articles");
  mkdirSync(submissions, { recursive: true });
  mkdirSync(articles, { recursive: true });
  writeFileSync(join(submissions, "same-name.md"), "new");
  writeFileSync(join(articles, "same-name.md"), "existing");

  try {
    assert.throws(
      () => promoteSubmissions(submissions, articles),
      /already uses that filename/,
    );
    assert.equal(readFileSync(join(articles, "same-name.md"), "utf8"), "existing");
  } finally {
    rmSync(testRoot, { recursive: true, force: true });
  }
});
