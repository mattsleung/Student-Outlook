import Link from "next/link";

import type { Article } from "@/lib/articles";

import { ArticleArtwork } from "./ArticleArtwork";
import { ArticleTitleImage } from "./ArticleTitleImage";

export function ArticleCard({ article }: { article: Article }) {
  const hasArtwork = article.artwork === "default";
  const hasVisual = Boolean(article.titleImage) || hasArtwork;

  return (
    <article className={`article-card${hasVisual ? "" : " article-card-no-artwork"}`}>
      <Link className="article-card-link" href={`/articles/${article.slug}`}>
        {hasVisual && (
          <div className="card-art-link">
            {article.titleImage ? (
              <ArticleTitleImage
                alt={article.titleImageAlt ?? ""}
                compact
                src={article.titleImage}
              />
            ) : (
              <ArticleArtwork accent={article.accent} symbol={article.symbol} compact />
            )}
          </div>
        )}
        <div className="article-card-content">
          <div className="article-meta-row">
            <span className="category-tag">{article.category}</span>
          </div>
          <h3>{article.title}</h3>
          <p>{article.summary}</p>
          <div className="article-card-footer">
            <span>By {article.author}</span>
            <span className="read-link">
              Read <span aria-hidden="true">→</span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
