# Student Outlook editorial workflow

Student Outlook uses two roles: writers and one owner/publisher.

## Writers

Writers draft and edit articles together in private Google Docs. They use
comments and Suggesting mode for feedback. Once the writing and editing are
finished, one writer copies the completed article into the unlisted writing
dashboard. Writers are not added as collaborators to the official Student
Outlook repository. The dashboard is not linked from the public website, but
its address and GitHub pull requests are not secret.

Only GitHub usernames listed in the private Netlify
`ALLOWED_GITHUB_USERS` environment variable can enter the dashboard. The owner
adds or removes writers in Netlify without changing the public repository.

1. Open the writing dashboard at
   `https://student-outlook-auth.netlify.app/admin/`.
2. Sign in with the approved GitHub account.
3. Finish writing and editing the article in its private Google Doc.
4. Select **Articles**, then select **New Article**.
5. Paste the finished article into Decap and complete every required field.
6. Optionally upload a suitable title image no larger than 5 MB and add its image description.
   Otherwise, choose Student Outlook default artwork or no artwork. Never use
   an identifiable student photo without documented permission.
7. Save the Decap entry as a draft while checking its fields and formatting.
8. When everything is complete, choose **Ready to Review**. Writers should do
   this only once; it sends the article to the owner's final-approval queue.
9. Share the GitHub pull-request link in the private Discord channel if the
   owner needs it.
10. If the owner requests a correction, make it in the Google Doc first and
    then update the Decap entry so both copies agree.
11. Use **Published** to read completed articles. Published entries have no
    publishing or editing controls for writers.

Drafts and pull requests may be publicly visible. Never include personal email
addresses, phone numbers, school names, schedules, addresses, exact locations,
or other identifying information.

Open Authoring still stores each writer's work in that writer's GitHub fork.
Only the owner can merge a proposal into `main` and publish it.

## Why the owner sees "In Review"

Open Authoring gives writers only two useful stages: **Draft** and **Ready to
Review**. Decap shows the same submitted article in the owner's **In Review**
column. For Student Outlook, **In Review** means **ready for the owner's final
approval**. It is not a separate editing round, because detailed editing has
already happened in Google Docs.

These names and internal stages are built into Decap. Hiding a column would not
remove its internal status and could make an article difficult to find, so the
supported Decap workflow remains unchanged.

## Owner and publisher

Only the repository owner performs the final review and publication.

1. Open the article from Decap's **In Review** column. Treat this as the
   final-approval queue.
2. Read the complete article and its Google Doc discussion.
3. Check the author display name, category, title image, image description,
   summary, privacy, links, and
   appropriateness.
4. Confirm that every GitHub check passed.
5. Ask the writer for changes when necessary. Changes should also be recorded
   in the Google Doc.
6. When the final review passes, move the entry to **Ready** and approve it by
   merging its pull request into `main`.
7. The protected publishing workflow moves the approved file from
   `content/submissions` to `content/articles` and saves that change to `main`.
8. Wait for the publishing and GitHub Pages workflows to finish.
9. Open the public article and check its layout on a phone and a computer.

Only pull requests authored by `mattsleung` may add, edit, rename, or remove a
file in `content/articles`. Other writers must work in `content/submissions`.
The dashboard presents published fields as read-only, and the GitHub check is
the security layer that prevents the interface from being bypassed.

The writers' **Published** dashboard view is intentionally read-only. When a
published article needs a correction or must be removed, the owner uses the
separate owner page at
`https://student-outlook-auth.netlify.app/publisher/`. That page uses a stricter
sign-in check that accepts only `mattsleung`. GitHub also accepts the resulting
protected change only when the pull-request author is `mattsleung`.

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
