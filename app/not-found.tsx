import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found section-shell" id="main-content">
      <p className="eyebrow">404 · Page not found</p>
      <h1>We couldn&apos;t find that page.</h1>
      <p>The link might be old, or the page may have moved.</p>
      <Link className="button button-primary" href="/">
        Return home <span aria-hidden="true">→</span>
      </Link>
    </main>
  );
}
