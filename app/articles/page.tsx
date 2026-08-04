import type { Metadata } from "next";

import { ArticleCard } from "@/components/ArticleCard";
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
        <p className="eyebrow">The article shelf</p>
        <h1>Ideas for school, life, and everything between.</h1>
        <p>
          Browse practical tips, creative prompts, and reminders written for students.
        </p>
      </header>
      <section className="section-shell archive-section" aria-labelledby="all-articles-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              {articles.length} {articles.length === 1 ? "story" : "stories"}
            </p>
            <h2 id="all-articles-title">The latest from Student Outlook</h2>
          </div>
        </div>
        {articles.length > 0 ? (
          <div className="article-grid">
            {articles.map((article) => (
              <ArticleCard article={article} key={article.slug} />
            ))}
          </div>
        ) : (
          <div className="empty-articles">
            <h3>Our first articles are on the way.</h3>
            <p>New stories will appear here after they are reviewed and published.</p>
          </div>
        )}
      </section>
    </main>
  );
}
