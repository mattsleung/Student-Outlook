# Student Outlook editorial workflow

Student Outlook uses two roles: writers and one owner/publisher.

## Writers

Writers create articles in the unlisted writing dashboard. They are not added
as collaborators to the official Student Outlook repository. The dashboard is
not linked from the public website, but its address and GitHub pull requests are
not secret.

1. Open the writing dashboard at
   `https://student-outlook-auth.netlify.app/admin/`.
2. Sign in with the approved GitHub account.
3. Select **New Article**.
4. Complete every required field.
5. Choose either Student Outlook default artwork or no artwork. Image uploads
   are not enabled.
6. Save the article as a draft.
7. When the draft is ready, mark it **Ready for Review**.
8. Share the GitHub pull-request link in the private Discord draft-review
   channel.
9. Make requested changes in the writing dashboard.

Drafts and pull requests may be publicly visible. Never include personal email
addresses, phone numbers, school names, schedules, addresses, exact locations,
or other identifying information.

Open Authoring can technically receive a proposal from another GitHub user who
finds the dashboard. That person still cannot publish or change `main`; the
owner should close unexpected pull requests without following their links or
downloading their files.

## Owner and publisher

Only the repository owner performs the final review and publication.

1. Read the complete article and its Discord discussion.
2. Check the author display name, category, summary, privacy, links, and
   appropriateness.
3. Confirm that every GitHub check passed.
4. Ask the writer for changes when necessary.
5. Resolve completed review conversations.
6. Merge the pull request into `main`.
7. Wait for the GitHub Pages workflow to finish.
8. Open the public article and check its layout on a phone and a computer.

Merging the pull request is the publishing confirmation. Student Outlook does
not add a separate passkey, email, phone, or two-factor confirmation.

## Recommended Discord structure

Create a private, invitation-only server with these channels:

- `#welcome` — how the writing group works
- `#rules` — privacy and respectful-review rules
- `#announcements` — owner updates
- `#article-ideas` — possible future topics
- `#draft-reviews` — one thread for each article
- `#writing-help` — general writing questions
- `#published-articles` — links to completed work
- `#writers-chat` — optional general conversation

Use a **Writer** role for approved contributors. Writers may read and send
messages and create threads, but they should not manage roles, create permanent
invites, add bots, remove members, or change server settings.

## Authentication configuration

GitHub Pages cannot safely store the private OAuth secret used during sign-in.
Student Outlook uses Netlify as an OAuth secret-holder. GitHub Pages continues
hosting Student Outlook; Netlify only completes the secure GitHub sign-in
exchange.

1. Create a Netlify account and a small Netlify project connected to the
   Student Outlook repository. This project is not the public website.
2. In GitHub, create an OAuth application named **Student Outlook Writing
   Dashboard**.
3. Use `https://mattsleung.github.io/Student-Outlook/` as its homepage URL.
4. Use `https://api.netlify.com/auth/done` as its authorization callback URL.
5. Copy the OAuth client ID and secret into the Netlify project's GitHub
   authentication-provider settings.
6. Copy the project's `.netlify.app` hostname, without `https://` or a trailing
   slash.
7. Set `site_domain` in `public/admin/config.yml` to that hostname.
8. Test with one writer before inviting the rest of the group.

Never commit the OAuth secret to this repository or send it through Discord.
Only the public client ID and the Netlify hostname may be shared when needed.
