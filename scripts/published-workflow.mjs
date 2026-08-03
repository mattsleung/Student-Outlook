import { existsSync, mkdirSync, readdirSync, renameSync } from "node:fs";
import { basename, join } from "node:path";

export const PUBLISHER_GITHUB_LOGIN = "mattsleung";

export function assertPublishedChangesAllowed(author, changedFiles) {
  if (author.toLowerCase() === PUBLISHER_GITHUB_LOGIN) {
    return;
  }

  const publishedChanges = changedFiles.filter((file) =>
    file.startsWith("content/articles/"),
  );
  if (publishedChanges.length > 0) {
    throw new Error(
      `Only ${PUBLISHER_GITHUB_LOGIN} may change published articles. Blocked: ${publishedChanges.join(", ")}`,
    );
  }
}

export function promoteSubmissions(submissionsDirectory, articlesDirectory) {
  mkdirSync(submissionsDirectory, { recursive: true });
  mkdirSync(articlesDirectory, { recursive: true });

  const submissions = readdirSync(submissionsDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .sort();

  for (const fileName of submissions) {
    const source = join(submissionsDirectory, fileName);
    const destination = join(articlesDirectory, basename(fileName));
    if (existsSync(destination)) {
      throw new Error(
        `${fileName} cannot be published because an article already uses that filename.`,
      );
    }
    renameSync(source, destination);
  }

  return submissions;
}
