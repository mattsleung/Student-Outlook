import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Learn how Student Outlook handles information on its public website.",
};

export default function PrivacyPage() {
  return (
    <main id="main-content">
      <header className="page-hero page-hero-sky section-shell">
        <p className="eyebrow">Privacy</p>
        <h1>Read without sharing personal information.</h1>
        <p>Student Outlook is designed to be useful without requiring an account.</p>
      </header>

      <div className="section-shell privacy-content">
        <section aria-labelledby="information-title">
          <h2 id="information-title">Information we collect</h2>
          <p>
            The public Student Outlook website does not provide accounts, comments, forms,
            advertising, or analytics, and Student Outlook does not intentionally collect
            personal information from its readers.
          </p>
        </section>

        <section aria-labelledby="theme-title">
          <h2 id="theme-title">Your theme preference</h2>
          <p>
            If you switch between light and dark mode, your choice is saved only in your own
            browser. Student Outlook does not receive that preference.
          </p>
        </section>

        <section aria-labelledby="hosting-title">
          <h2 id="hosting-title">Website hosting</h2>
          <p>
            This website is hosted by GitHub Pages. GitHub may process technical information,
            such as an IP address, for security and service operation. You can read the{" "}
            <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">
              GitHub Privacy Statement
            </a>
            .
          </p>
        </section>

        <section aria-labelledby="changes-title">
          <h2 id="changes-title">If the website changes</h2>
          <p>
            This notice will be updated before Student Outlook adds any public feature that
            collects personal information.
          </p>
        </section>
      </div>
    </main>
  );
}
