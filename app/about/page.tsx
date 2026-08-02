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

      <section className="section-shell mission-section" aria-labelledby="why-title">
        <div className="mission-statement">
          <span className="statement-mark" aria-hidden="true">“</span>
          <h2 id="why-title">We believe student voices deserve care, curiosity, and room to grow.</h2>
        </div>
        <div className="mission-copy">
          <p>
            School life is full of questions, discoveries, challenges, and funny moments.
            Student Outlook creates a welcoming place to explore all of them through clear,
            age-appropriate articles.
          </p>
          <p>
            Our regular articles come from a small, invited group of approved writers known
            by the editor. Short community tips, habits, methods, or jokes may occasionally be
            selected for special collections, with credit given by first name and last initial.
            Every piece is reviewed before publication, and contributor privacy comes first.
          </p>
        </div>
      </section>

      <section className="values-section">
        <div className="section-shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">What guides us</p>
              <h2>Four values, one shared outlook</h2>
            </div>
          </div>
          <div className="values-grid">
            <article>
              <span>01</span>
              <h3>Useful</h3>
              <p>Ideas should give readers something clear to try, consider, or remember.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Encouraging</h3>
              <p>Honest support matters more than pretending everything is easy.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Curious</h3>
              <p>We make room for questions, creativity, and different ways of thinking.</p>
            </article>
            <article>
              <span>04</span>
              <h3>Respectful</h3>
              <p>Every article should protect privacy and treat its readers with care.</p>
            </article>
          </div>
        </div>
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
