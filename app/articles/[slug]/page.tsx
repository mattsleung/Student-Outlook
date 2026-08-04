import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleArtwork } from "@/components/ArticleArtwork";
import { ArticleCard } from "@/components/ArticleCard";
import { ArticleTitleImage } from "@/components/ArticleTitleImage";
import { MarkdownArticle } from "@/components/MarkdownArticle";
import { getAllArticles, getArticleBySlug, getCategorySlug } from "@/lib/articles";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const articles = getAllArticles();

  // Next.js static export requires at least one value for a dynamic route.
  return articles.length > 0
    ? articles.map((article) => ({ slug: article.slug }))
    : [{ slug: "publication-coming-soon" }];
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) return {};

  return {
    title: article.title,
    description: article.summary,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const categorySlug = getCategorySlug(article.category);
  const hasArtwork = article.artwork === "default";
  const hasVisual = Boolean(article.titleImage) || hasArtwork;
  const relatedArticles = getAllArticles()
    .filter((item) => item.slug !== article.slug)
    .slice(0, 2);

  return (
    <main id="main-content">
      <article>
        <header
          className={`article-hero section-shell${hasVisual ? "" : " article-hero-no-artwork"}`}
        >
          <div className="article-hero-copy">
            <Link className="category-tag" href={`/categories/${categorySlug}`}>
              {article.category}
            </Link>
            <h1>{article.title}</h1>
            <p className="article-deck">{article.summary}</p>
            <div className="article-byline">
              <span className="author-avatar" aria-hidden="true">
                {article.author.charAt(0)}
              </span>
              <div>
                <strong>{article.author}</strong>
                <span>
                  <time dateTime={article.dateIso}>{article.date}</time>
                </span>
              </div>
            </div>
          </div>
          {article.titleImage ? (
            <ArticleTitleImage alt={article.titleImageAlt ?? ""} src={article.titleImage} />
          ) : hasArtwork ? (
            <ArticleArtwork accent={article.accent} symbol={article.symbol} />
          ) : null}
        </header>

        <div className="article-layout section-shell">
          <aside className="article-aside">
            <span>STUDENT OUTLOOK</span>
            <p>A useful idea is worth passing along.</p>
          </aside>
          <MarkdownArticle source={article.body} />
        </div>
      </article>

      <section className="section-shell related-section" aria-labelledby="keep-reading-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Keep going</p>
            <h2 id="keep-reading-title">Read next</h2>
          </div>
          <Link className="text-link" href="/articles">
            All articles <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="article-grid article-grid-two">
          {relatedArticles.map((item) => (
            <ArticleCard article={item} key={item.slug} />
          ))}
        </div>
      </section>
    </main>
  );
}
