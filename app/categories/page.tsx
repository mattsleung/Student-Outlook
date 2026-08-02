import type { Metadata } from "next";
import Link from "next/link";

import { categoryDetails, getAllArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Categories",
  description: "Explore Student Outlook articles by topic.",
};

export default function CategoriesPage() {
  const articles = getAllArticles();

  return (
    <main id="main-content">
      <header className="page-hero page-hero-yellow section-shell">
        <p className="eyebrow">Choose a direction</p>
        <h1>There&apos;s more than one way to look ahead.</h1>
        <p>Find the kind of idea, reminder, or creative break that fits your day.</p>
      </header>
      <section className="section-shell category-directory" aria-labelledby="category-list-title">
        <h2 className="visually-hidden" id="category-list-title">
          Article categories
        </h2>
        {categoryDetails.map((category) => {
          const count = articles.filter((article) => article.category === category.name).length;
          return (
            <Link
              className={`directory-row category-${category.accent}`}
              href={`/categories/${category.slug}`}
              key={category.slug}
            >
              <span className="directory-number">{category.number}</span>
              <div>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>
              <span className="directory-count">
                {count} {count === 1 ? "article" : "articles"}
              </span>
              <span className="directory-arrow" aria-hidden="true">→</span>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
