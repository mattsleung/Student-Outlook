import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Write for Us",
  description: "Learn about Student Outlook's approved writers and community collections.",
};

export default function WriteForUsPage() {
  return (
    <main id="main-content">
      <header className="page-hero page-hero-coral section-shell write-hero">
        <p className="eyebrow">Write for Us</p>
        <h1>Have an idea worth sharing?</h1>
        <p>
          Student Outlook is written by a small, invited group of approved student writers
          known by the editor. We are not accepting full articles from the public.
        </p>
      </header>

      <section className="contribution-process">
        <div className="section-shell process-inner">
          <div>
            <p className="eyebrow">Community contributions</p>
            <h2>Have a quick tip or a good joke?</h2>
          </div>
          <ol>
            <li>
              <span>1</span>
              <div>
                <h3>Wait for the contact email</h3>
                <p>We will add an email address here when we are ready to receive messages.</p>
              </div>
            </li>
            <li>
              <span>2</span>
              <div>
                <h3>Share one short contribution</h3>
                <p>Students may email a brief joke, study tip, good habit, or helpful method.</p>
              </div>
            </li>
            <li>
              <span>3</span>
              <div>
                <h3>Editors review and collect</h3>
                <p>
                  A short submission will not become its own article. Strong contributions may
                  be combined with others in a special community edition.
                </p>
              </div>
            </li>
            <li>
              <span>4</span>
              <div>
                <h3>Credit contributors safely</h3>
                <p>Selected contributions will be credited using a first name and last initial.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="section-shell safety-note" aria-labelledby="privacy-title">
        <span className="safety-icon" aria-hidden="true">✓</span>
        <div>
          <p className="eyebrow">How collections work</p>
          <h2 id="privacy-title">Good small ideas can be stronger together.</h2>
          <p>
            Editors may gather selected community ideas into special editions. Sending
            something does not guarantee publication, and individual tips or jokes will not
            receive their own article pages.
          </p>
        </div>
      </section>

      <section className="section-shell write-footer-cta">
        <p>Contact email: <span className="contact-placeholder">to be added</span></p>
        <Link className="text-link" href="/about">
          Learn more about our mission <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  );
}
