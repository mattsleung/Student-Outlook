import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found section-shell" id="main-content">
      <p className="eyebrow">404 · Page not found</p>
      <h1>This page took a different path.</h1>
      <p>The link may be old, or the page may have moved.</p>
      <Link className="button button-primary" href="/">
        Return home <span aria-hidden="true">→</span>
      </Link>
    </main>
  );
}
