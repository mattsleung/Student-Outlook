import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

export const categoryDetails = [
  {
    name: "Study Tips",
    slug: "study-tips",
    description: "Practical ways to plan, focus, and learn with less stress.",
    number: "01",
    accent: "sky",
  },
  {
    name: "Social Tips",
    slug: "social-tips",
    description: "Thoughtful ways to connect, communicate, and handle everyday relationships.",
    number: "02",
    accent: "aqua",
  },
  {
    name: "Student Stories",
    slug: "student-stories",
    description: "Experiences, reflections, and creative perspectives from student life.",
    number: "03",
    accent: "yellow",
  },
  {
    name: "Entertainment",
    slug: "entertainment",
    description: "Reviews of recent movies and games, joke collections, and other fun reads.",
    number: "04",
    accent: "coral",
  },
] as const;

export type CategoryName = (typeof categoryDetails)[number]["name"];
export type CategorySlug = (typeof categoryDetails)[number]["slug"];
export type ArticleAccent = "sky" | "aqua" | "yellow" | "coral" | "lilac" | "mint";

export type Article = {
  slug: string;
  title: string;
  author: string;
  date: string;
  dateIso: string;
  category: CategoryName;
  summary: string;
  readTime: string;
  featured: boolean;
  accent: ArticleAccent;
  symbol: string;
  body: string;
};

const articlesDirectory = join(process.cwd(), "content", "articles");

function parseFrontMatter(source: string) {
  const sections = source.split("---");

  if (sections.length < 3) {
    throw new Error("Article Markdown files must begin with front matter.");
  }

  const metadata = Object.fromEntries(
    sections[1]
      .trim()
      .split("\n")
      .map((line) => {
        const separator = line.indexOf(":");
        return [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
      }),
  );

  return { metadata, body: sections.slice(2).join("---").trim() };
}

export function getAllArticles(): Article[] {
  return readdirSync(articlesDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const source = readFileSync(join(articlesDirectory, fileName), "utf8");
      const { metadata, body } = parseFrontMatter(source);

      return {
        slug,
        title: metadata.title,
        author: metadata.author,
        date: metadata.date,
        dateIso: metadata.dateIso,
        category: metadata.category as CategoryName,
        summary: metadata.summary,
        readTime: metadata.readTime,
        featured: metadata.featured === "true",
        accent: metadata.accent as ArticleAccent,
        symbol: metadata.symbol,
        body,
      };
    })
    .sort((a, b) => b.dateIso.localeCompare(a.dateIso));
}

export function getArticleBySlug(slug: string) {
  return getAllArticles().find((article) => article.slug === slug);
}

export function getCategoryBySlug(slug: string) {
  return categoryDetails.find((category) => category.slug === slug);
}

export function getCategorySlug(categoryName: CategoryName) {
  return categoryDetails.find((category) => category.name === categoryName)?.slug;
}
