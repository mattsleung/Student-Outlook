import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Why Student Outlook was created and what we hope it can offer students.",
};

export default function AboutPage() {
  return (
    <main id="main-content">
      <header className="page-hero page-hero-aqua section-shell about-hero">
        <p className="eyebrow">About us</p>
        <h1>A student publication that gets what school is like.</h1>
        <p>
          We share useful advice, different points of view, student experiences, and things
          worth reading when you have a few minutes.
        </p>
      </header>

      <section className="section-shell designer-message" aria-labelledby="designer-message-title">
        <div>
          <p className="eyebrow">From the developer</p>
          <h2 id="designer-message-title">Why I made Student Outlook</h2>
        </div>
        <blockquote>
          <p>
            I created Student Outlook to give students one place to find helpful advice and hear
            perspectives they might not come across otherwise.
          </p>
          <p>
            I&apos;m a student too, so I know school can be interesting, stressful, fun, and confusing—
            sometimes all in the same day. I hope this site helps make school life a little easier,
            gives you some new ideas, and lets student writers share something real.
          </p>
          <footer>— Matthew Leung, Student Outlook Developer</footer>
        </blockquote>
      </section>

      <section className="section-shell about-cta">
        <div>
          <p className="eyebrow">Keep reading</p>
          <h2>See what students are writing about.</h2>
        </div>
        <Link className="button button-dark" href="/articles">
          Browse articles <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  );
}
