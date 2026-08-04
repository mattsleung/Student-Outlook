import Link from "next/link";

import { ThemeToggle } from "./ThemeToggle";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-intro">
          <Link className="brand brand-footer" href="/">
            <span className="brand-mark" aria-hidden="true">
              SO
            </span>
            <span>Student Outlook</span>
          </Link>
          <p>Good ideas. Real encouragement. A place for student voices.</p>
        </div>

        <nav className="footer-navigation" aria-label="Footer navigation">
          <div>
            <p className="footer-label">Explore</p>
            <Link href="/articles">Articles</Link>
            <Link href="/categories">Categories</Link>
          </div>
          <div>
            <p className="footer-label">About</p>
            <Link href="/about">Our mission</Link>
            <Link href="/write-for-us">Write for Us</Link>
          </div>
        </nav>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Student Outlook. Built for curious students.</p>
        <p>Placeholder publication for demonstration.</p>
      </div>
      <div className="footer-theme-control">
        <ThemeToggle />
      </div>
    </footer>
  );
}
