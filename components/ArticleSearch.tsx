"use client";

import { useMemo, useState } from "react";

import type { Article } from "@/lib/articles";

import { ArticleCard } from "./ArticleCard";

export function ArticleSearch({ articles }: { articles: Article[] }) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredArticles = useMemo(() => {
    if (!normalizedQuery) return articles;

    return articles.filter((article) =>
      [article.title, article.summary, article.author, article.body]
        .join(" ")
        .toLocaleLowerCase()
        .includes(normalizedQuery),
    );
  }, [articles, normalizedQuery]);

  return (
    <div className="article-search-area">
      <div className="article-search">
        <label htmlFor="article-search-input">Search articles</label>
        <div className="article-search-input-wrap">
          <span aria-hidden="true">⌕</span>
          <input
            id="article-search-input"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by topic, title, or author"
            type="search"
            value={query}
          />
        </div>
        <p aria-live="polite">
          {normalizedQuery
            ? `${filteredArticles.length} ${filteredArticles.length === 1 ? "article" : "articles"} found`
            : `${articles.length} ${articles.length === 1 ? "article" : "articles"}`}
        </p>
      </div>

      {filteredArticles.length > 0 ? (
        <div className="article-grid">
          {filteredArticles.map((article) => (
            <ArticleCard article={article} key={article.slug} />
          ))}
        </div>
      ) : (
        <div className="empty-articles search-empty-state">
          <h3>No matches.</h3>
          <p>Try a shorter search or a different word.</p>
          <button className="text-button" onClick={() => setQuery("")} type="button">
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}
