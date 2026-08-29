import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import matter from "gray-matter";

export type ArticleAccent = "sky" | "aqua" | "yellow" | "coral" | "lilac" | "mint";
export type ArticleArtworkChoice = "default" | "none";

export type Article = {
  slug: string;
  title: string;
  author: string;
  date: string;
  dateIso: string;
  summary: string;
  featured: boolean;
  artwork: ArticleArtworkChoice;
  titleImage?: string;
  titleImageAlt?: string;
  accent: ArticleAccent;
  symbol: string;
  body: string;
};

const articlesDirectory = join(process.cwd(), "content", "articles");
const articleAccents: ArticleAccent[] = ["sky", "aqua", "yellow", "coral", "lilac", "mint"];
const allowedAccents = new Set<string>(articleAccents);
const authorPattern = /^[\p{L}][\p{L}'’ -]{0,29} \p{L}\.?$/u;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function requireString(value: unknown, field: string, fileName: string) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${fileName}: "${field}" must be a non-empty line of text.`);
  }

  return value.trim();
}

function normalizeDate(value: unknown, fileName: string) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  const dateIso = requireString(value, "dateIso", fileName);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateIso) || Number.isNaN(Date.parse(`${dateIso}T00:00:00Z`))) {
    throw new Error(`${fileName}: "dateIso" must use the YYYY-MM-DD format.`);
  }

  return dateIso;
}

function formatArticleDate(dateIso: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${dateIso}T00:00:00Z`));
}

function hashSlug(slug: string) {
  return [...slug].reduce((hash, character) => (hash * 31 + character.charCodeAt(0)) >>> 0, 7);
}

function getDefaultAccent(slug: string): ArticleAccent {
  return articleAccents[hashSlug(slug) % articleAccents.length];
}

function getDefaultSymbol(slug: string) {
  return String((hashSlug(slug) % 99) + 1).padStart(2, "0");
}

function validateArticleText(title: string, summary: string, author: string, body: string, fileName: string) {
  if (title.length < 5 || title.length > 100) {
    throw new Error(`${fileName}: "title" must contain between 5 and 100 characters.`);
  }

  if (summary.length < 20 || summary.length > 220) {
    throw new Error(`${fileName}: "summary" must contain between 20 and 220 characters.`);
  }

  if (author !== "Anonymous" && !authorPattern.test(author)) {
    throw new Error(`${fileName}: "author" must use a first name and last initial, such as "Jordan P.".`);
  }

  if (body.length < 20) {
    throw new Error(`${fileName}: the article body must contain at least 20 characters.`);
  }

  if (/<\/?[a-z][^>]*>/i.test(body)) {
    throw new Error(`${fileName}: raw HTML is not allowed in article content.`);
  }

  if (/!\[[^\]]*\]\([^)]*\)/.test(body)) {
    throw new Error(`${fileName}: image uploads are not enabled. Choose the default artwork or no artwork.`);
  }
}

function normalizeTitleImage(value: unknown, fileName: string) {
  if (value === undefined || value === null || String(value).trim() === "") return undefined;

  const image = String(value).trim();
  const normalized = image.replace(/^\/Student-Outlook/, "");
  if (!/^\/article-media\/[a-zA-Z0-9][a-zA-Z0-9._-]*\.(?:avif|jpe?g|png|webp)$/i.test(normalized)) {
    throw new Error(
      `${fileName}: "titleImage" must be a JPG, PNG, WebP, or AVIF file uploaded to the article media folder.`,
    );
  }

  return normalized;
}

function parseArticle(fileName: string): Article {
  const slug = fileName.replace(/\.md$/, "");
  if (!slugPattern.test(slug)) {
    throw new Error(`${fileName}: filenames may only contain lowercase letters, numbers, and single hyphens.`);
  }

  const source = readFileSync(join(articlesDirectory, fileName), "utf8");
  const { data, content } = matter(source);
  const body = content.trim();
  const title = requireString(data.title, "title", fileName);
  const authorValue = data.author === undefined || data.author === null ? "" : String(data.author).trim();
  const author = authorValue ? (authorValue.endsWith(".") ? authorValue : `${authorValue}.`) : "Anonymous";
  const summary = requireString(data.summary, "summary", fileName);
  const dateIso = normalizeDate(data.dateIso, fileName);
  const titleImage = normalizeTitleImage(data.titleImage, fileName);
  const requestedTitleImageAlt = data.titleImageAlt === undefined ? "" : String(data.titleImageAlt).trim();
  const titleImageAlt = titleImage ? requestedTitleImageAlt || title : undefined;

  if (titleImageAlt && titleImageAlt.length > 160) {
    throw new Error(`${fileName}: "titleImageAlt" must contain no more than 160 characters.`);
  }

  const requestedArtwork = data.artwork === undefined ? "default" : String(data.artwork);
  if (requestedArtwork !== "default" && requestedArtwork !== "none") {
    throw new Error(`${fileName}: "artwork" must be either "default" or "none".`);
  }

  const requestedAccent = data.accent === undefined ? "" : String(data.accent);
  const accent = allowedAccents.has(requestedAccent)
    ? (requestedAccent as ArticleAccent)
    : getDefaultAccent(slug);
  const legacyDate = data.date === undefined ? "" : String(data.date).trim();
  const parsedLegacySymbol = data.symbol === undefined ? "" : String(data.symbol).trim();
  const legacySymbol = /^\d{1,2}$/.test(parsedLegacySymbol)
    ? parsedLegacySymbol.padStart(2, "0")
    : parsedLegacySymbol;

  validateArticleText(title, summary, author, body, fileName);

  return {
    slug,
    title,
    author,
    date: legacyDate || formatArticleDate(dateIso),
    dateIso,
    summary,
    featured: data.featured === true || data.featured === "true",
    artwork: requestedArtwork,
    titleImage,
    titleImageAlt,
    accent,
    symbol: legacySymbol || getDefaultSymbol(slug),
    body,
  };
}

export function getAllArticles(): Article[] {
  const articles = readdirSync(articlesDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map(parseArticle)
    .sort((a, b) => b.dateIso.localeCompare(a.dateIso));

  const featuredArticles = articles.filter((article) => article.featured);
  if (featuredArticles.length > 1) {
    throw new Error(
      `Only one article may be featured. Currently featured: ${featuredArticles
        .map((article) => article.slug)
        .join(", ")}.`,
    );
  }

  return articles;
}

export function getArticleBySlug(slug: string) {
  return getAllArticles().find((article) => article.slug === slug);
}
