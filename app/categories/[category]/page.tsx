import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleCard } from "@/components/ArticleCard";
import { categoryDetails, getAllArticles, getCategoryBySlug } from "@/lib/articles";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return categoryDetails.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) return {};

  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) notFound();

  const articles = getAllArticles().filter((article) => article.category === category.name);

  return (
    <main id="main-content">
      <header className={`page-hero category-page-hero category-${category.accent} section-shell`}>
        <Link className="back-link" href="/categories">
          <span aria-hidden="true">←</span> All categories
        </Link>
        <span className="page-number" aria-hidden="true">{category.number}</span>
        <h1>{category.name}</h1>
        <p>{category.description}</p>
      </header>
      <section className="section-shell archive-section" aria-labelledby="category-articles-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              {articles.length} {articles.length === 1 ? "article" : "articles"}
            </p>
            <h2 id="category-articles-title">From {category.name}</h2>
          </div>
        </div>
        {articles.length > 0 ? (
          <div className="article-grid article-grid-two">
            {articles.map((article) => (
              <ArticleCard article={article} key={article.slug} />
            ))}
          </div>
        ) : (
          <div className="empty-articles">
            <h3>No articles in this category yet.</h3>
            <p>New {category.name.toLowerCase()} articles will appear here after publication.</p>
          </div>
        )}
      </section>
    </main>
  );
}
