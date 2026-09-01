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
          <p>A student-run publication about school, life, and what students care about.</p>
        </div>

        <nav className="footer-navigation" aria-label="Footer navigation">
          <div>
            <p className="footer-label">Explore</p>
            <Link href="/articles">Articles</Link>
          </div>
          <div>
            <p className="footer-label">About</p>
            <Link href="/about">About us</Link>
            <Link href="/privacy">Privacy</Link>
          </div>
        </nav>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Student Outlook.</p>
        <p>Articles remain the property of their authors.</p>
      </div>
      <div className="footer-theme-control">
        <ThemeToggle />
      </div>
    </footer>
  );
}
