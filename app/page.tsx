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
            <span aria-hidden="true">✦</span> Made with students in mind
          </p>
          <h1 id="hero-title">
            Your ideas matter.
            <span>Let&apos;s look ahead.</span>
          </h1>
          <p className="hero-description">
            Student Outlook is a bright corner of the internet made by students, for students,
            with useful advice, honest encouragement, creative fun, and thoughtful student voices.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/articles">
              Explore articles <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="hero-collage" aria-hidden="true">
          <div className="hero-card hero-card-main">
            <span className="hero-card-kicker">STUDENT OUTLOOK</span>
            <strong>Fresh ideas for your week.</strong>
            <span className="hero-sun" />
          </div>
          <div className="hero-card hero-card-note">
            <span>Be curious.</span>
            <span>Be kind.</span>
            <span>Be you.</span>
          </div>
          <span className="hero-sticker">NEW<br />VOICES</span>
          <span className="hero-sparkle">✦</span>
        </div>
      </section>

      <section className="ticker" aria-label="Student Outlook topics">
        <div>
          <span>STUDY SMARTER</span>
          <span aria-hidden="true">✦</span>
          <span>FIND YOUR VOICE</span>
          <span aria-hidden="true">✦</span>
          <span>TRY SOMETHING NEW</span>
          <span aria-hidden="true">✦</span>
          <span>KEEP GOING</span>
        </div>
      </section>

      {featuredArticle && (
        <section className="section-shell featured-section" aria-labelledby="featured-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Editor&apos;s pick</p>
              <h2 id="featured-title">Featured article</h2>
            </div>
            <Link className="text-link" href="/articles">
              View all articles <span aria-hidden="true">→</span>
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
                Read the story <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        </section>
      )}

      <section className="section-shell latest-section" aria-labelledby="latest-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Fresh perspectives</p>
            <h2 id="latest-title">Latest articles</h2>
          </div>
          <Link className="text-link" href="/articles">
            Browse the archive <span aria-hidden="true">→</span>
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
            <h3>Welcome to Student Outlook.</h3>
            <p>Our first student-written articles are being prepared for publication.</p>
          </div>
        )}
      </section>

    </main>
  );
}
