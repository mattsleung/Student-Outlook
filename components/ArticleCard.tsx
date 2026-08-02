import Link from "next/link";

import { getCategorySlug, type Article } from "@/lib/articles";

import { ArticleArtwork } from "./ArticleArtwork";

export function ArticleCard({ article }: { article: Article }) {
  const categorySlug = getCategorySlug(article.category);

  return (
    <article className="article-card">
      <Link className="card-art-link" href={`/articles/${article.slug}`} tabIndex={-1}>
        <ArticleArtwork accent={article.accent} symbol={article.symbol} compact />
      </Link>
      <div className="article-card-content">
        <div className="article-meta-row">
          <Link className="category-tag" href={`/categories/${categorySlug}`}>
            {article.category}
          </Link>
          <span>{article.readTime}</span>
        </div>
        <h3>
          <Link href={`/articles/${article.slug}`}>{article.title}</Link>
        </h3>
        <p>{article.summary}</p>
        <div className="article-card-footer">
          <span>By {article.author}</span>
          <Link className="read-link" href={`/articles/${article.slug}`} aria-label={`Read ${article.title}`}>
            Read <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
