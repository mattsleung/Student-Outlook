import Link from "next/link";

import { ArticleArtwork } from "@/components/ArticleArtwork";
import { ArticleCard } from "@/components/ArticleCard";
import { categoryDetails, getAllArticles, getCategorySlug } from "@/lib/articles";

export default function HomePage() {
  const articles = getAllArticles();
  const featuredArticle = articles.find((article) => article.featured) ?? articles[0];
  const featuredCategorySlug = getCategorySlug(featuredArticle.category);

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
            Student Outlook is a bright corner of the internet for useful advice, honest
            encouragement, creative fun, and thoughtful student voices.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/articles">
              Explore articles <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="hero-collage" aria-hidden="true">
          <div className="hero-card hero-card-main">
            <span className="hero-card-kicker">THE NEXT ISSUE</span>
            <strong>Ideas for your week.</strong>
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

      <section className="section-shell featured-section" aria-labelledby="featured-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Editor&apos;s pick</p>
            <h2 id="featured-title">Featured this week</h2>
          </div>
          <Link className="text-link" href="/articles">
            View all articles <span aria-hidden="true">→</span>
          </Link>
        </div>

        <article className="featured-article">
          <ArticleArtwork accent={featuredArticle.accent} symbol={featuredArticle.symbol} />
          <div className="featured-content">
            <Link className="category-tag" href={`/categories/${featuredCategorySlug}`}>
              {featuredArticle.category}
            </Link>
            <h3>{featuredArticle.title}</h3>
            <p>{featuredArticle.summary}</p>
            <div className="featured-byline">
              <span>By {featuredArticle.author}</span>
              <span aria-hidden="true">•</span>
              <span>{featuredArticle.readTime}</span>
            </div>
            <Link className="button button-dark" href={`/articles/${featuredArticle.slug}`}>
              Read the story <span aria-hidden="true">→</span>
            </Link>
          </div>
        </article>
      </section>

      <section className="section-shell categories-section" aria-labelledby="categories-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Find your corner</p>
            <h2 id="categories-title">Explore by category</h2>
          </div>
        </div>
        <div className="home-category-directory">
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
        </div>
      </section>

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
        <div className="article-grid">
          {articles.map((article) => (
            <ArticleCard article={article} key={article.slug} />
          ))}
        </div>
      </section>

      <section className="section-shell invitation-section" aria-labelledby="invitation-title">
        <div>
          <p className="eyebrow">Have something to share?</p>
          <h2 id="invitation-title">Small ideas are something worth sharing.</h2>
        </div>
        <div>
          <p>
            Short tips, helpful habits, and jokes may be selected and combined into special
            community collections.
          </p>
          <Link className="button button-dark" href="/write-for-us">
            See how contributions work <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
