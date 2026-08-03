import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about the mission and values behind Student Outlook.",
};

export default function AboutPage() {
  return (
    <main id="main-content">
      <header className="page-hero page-hero-aqua section-shell about-hero">
        <p className="eyebrow">Our mission</p>
        <h1>A thoughtful publication for the school years—and beyond.</h1>
        <p>
          Student Outlook is made to help middle and high school students feel informed,
          encouraged, entertained, and heard.
        </p>
      </header>

      <section className="section-shell designer-message" aria-labelledby="designer-message-title">
        <div>
          <p className="eyebrow">A message from the designer</p>
          <h2 id="designer-message-title">Why Student Outlook exists</h2>
        </div>
        <blockquote>
          <p>
            I created Student Outlook with a simple mission: to give middle and high school
            students a welcoming place to find useful advice, thoughtful perspectives, and
            something enjoyable to read.
          </p>
          <p>
            School can bring exciting opportunities as well as difficult moments. I hope this
            publication helps students feel understood, discover ideas that make their lives a
            little easier, and remember that their experiences matter. Every article should
            leave readers with something helpful, encouraging, or worth thinking about.
          </p>
          <footer>— Matthew Leung, Website Designer</footer>
        </blockquote>
      </section>

      <section className="section-shell about-cta">
        <div>
          <p className="eyebrow">Explore the publication</p>
          <h2>Ready for a fresh perspective?</h2>
        </div>
        <Link className="button button-dark" href="/articles">
          Read the latest <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  );
}
