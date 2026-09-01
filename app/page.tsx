import Link from "next/link";

import { ArticleArtwork } from "@/components/ArticleArtwork";
import { ArticleCard } from "@/components/ArticleCard";
import { ArticleTitleImage } from "@/components/ArticleTitleImage";
import { getAllArticles } from "@/lib/articles";

export default function HomePage() {
  const articles = getAllArticles();
  const featuredArticle = articles.find((article) => article.featured) ?? articles[0];
  const featuredHasArtwork = featuredArticle?.artwork === "default";
  const featuredHasVisual = Boolean(featuredArticle?.titleImage) || featuredHasArtwork;

  return (
    <main id="main-content">
      <section className="hero section-shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">
            <span aria-hidden="true">✦</span> By students, for students
          </p>
          <h1 id="hero-title">
            Student life,
            <span>from students.</span>
          </h1>
          <p className="hero-description">
            Honest articles about school, everyday life, and the things students actually care
            about.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/articles">
              Explore articles <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="hero-editorial-card" aria-hidden="true">
          <div className="hero-editorial-topline">
            <span>STUDENT OUTLOOK</span>
            <span>ISSUE 01</span>
          </div>
          <p>Articles for the parts of student life that do not fit in a textbook.</p>
          <div className="hero-editorial-tags">
            <span>Academic life</span>
            <span>Student lifestyle</span>
            <span>Stories</span>
            <span>Entertainment</span>
          </div>
        </div>
      </section>

      {featuredArticle && (
        <section className="section-shell featured-section" aria-labelledby="featured-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Start here</p>
              <h2 id="featured-title">Featured article</h2>
            </div>
            <Link className="text-link" href="/articles">
              See all articles <span aria-hidden="true">→</span>
            </Link>
          </div>
          <Link
            className={`featured-article${featuredHasVisual ? "" : " featured-article-no-artwork"}`}
            href={`/articles/${featuredArticle.slug}`}
          >
            {featuredArticle.titleImage ? (
              <ArticleTitleImage alt={featuredArticle.titleImageAlt ?? ""} src={featuredArticle.titleImage} />
            ) : featuredHasArtwork ? (
              <ArticleArtwork accent={featuredArticle.accent} symbol={featuredArticle.symbol} />
            ) : null}
            <div className="featured-content">
              <h3>{featuredArticle.title}</h3>
              <p>{featuredArticle.summary}</p>
              <div className="featured-byline">
                <span>By {featuredArticle.author}</span>
              </div>
              <span className="button button-dark">
                Read article <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        </section>
      )}

      <section className="section-shell latest-section" aria-labelledby="latest-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">New on Student Outlook</p>
            <h2 id="latest-title">Latest articles</h2>
          </div>
          <Link className="text-link" href="/articles">
            See all articles <span aria-hidden="true">→</span>
          </Link>
        </div>
        {articles.length > 0 ? (
          <div className="article-grid">
            {articles.map((article) => (
              <ArticleCard article={article} key={article.slug} />
            ))}
          </div>
        ) : (
          <div className="empty-articles">
            <h3>Articles are on the way.</h3>
            <p>We&apos;re getting the first Student Outlook stories ready to publish.</p>
          </div>
        )}
      </section>

    </main>
  );
}
