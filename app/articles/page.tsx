import type { Metadata } from "next";

import { ArticleSearch } from "@/components/ArticleSearch";
import { getAllArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Articles",
  description: "Browse every Student Outlook article.",
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <main id="main-content">
      <header className="page-hero page-hero-sky section-shell">
        <p className="eyebrow">All articles</p>
        <h1>Find something worth reading.</h1>
        <p>
          Student-written advice, experiences, reviews, and ideas—all in one place.
        </p>
      </header>
      <section className="section-shell archive-section" aria-labelledby="all-articles-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Browse the publication</p>
            <h2 id="all-articles-title">Latest articles</h2>
          </div>
        </div>
        {articles.length > 0 ? (
          <ArticleSearch articles={articles} />
        ) : (
          <div className="empty-articles">
            <h3>Nothing here yet.</h3>
            <p>We&apos;re getting the first Student Outlook articles ready.</p>
          </div>
        )}
      </section>
    </main>
  );
}
