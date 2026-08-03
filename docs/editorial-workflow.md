# Student Outlook editorial workflow

Student Outlook uses two roles: writers and one owner/publisher.

## Writers

Writers create articles in the unlisted writing dashboard. They are not added
as collaborators to the official Student Outlook repository. The dashboard is
not linked from the public website, but its address and GitHub pull requests are
not secret.

Only GitHub usernames listed in the private Netlify
`ALLOWED_GITHUB_USERS` environment variable can enter the dashboard. The owner
adds or removes writers in Netlify without changing the public repository.

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

Open Authoring still stores each writer's work in that writer's GitHub fork.
Only the owner can merge a proposal into `main` and publish it.

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
4. Use
   `https://student-outlook-auth.netlify.app/.netlify/functions/oauth-callback`
   as its authorization callback URL.
5. In the Netlify project's environment variables, set:
   - `GITHUB_OAUTH_CLIENT_ID` to the OAuth application's client ID.
   - `GITHUB_OAUTH_CLIENT_SECRET` to its client secret.
   - `OAUTH_STATE_SECRET` to a private random value containing at least 32
     characters.
   - `ALLOWED_GITHUB_USERS` to a comma-separated list of exact GitHub usernames,
     starting with `mattsleung`.
6. Scope every secret and allowlist variable to **Production only**. Never make
   them available to deploy previews, because a proposed pull request can
   change preview code.
7. Test the owner account and one writer account before inviting the rest of the
   group.

To approve a writer later, edit `ALLOWED_GITHUB_USERS` in Netlify and trigger a
new production deploy. To remove a writer, remove the username and deploy again.
Usernames are compared without regard to uppercase or lowercase letters.

Never commit the OAuth secret, state secret, or environment-variable values to
this repository or send them through Discord. The authentication function
checks a signed, ten-minute browser request before exchanging a GitHub code and
returns a token only for an approved username.
