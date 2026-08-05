# Student Outlook

A public student publication featuring academic advice, student lifestyle, student stories, and
entertainment for middle and high school students.

## Local development

Install the project and start the local website:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

The local dashboard file is available at `http://localhost:3000/admin/index.html`.
Writer login uses the Netlify OAuth helper configured in the editorial guide.
The production writing dashboard is available at
`https://student-outlook-auth.netlify.app/admin/`.

## Project checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Article publishing

The Decap CMS dashboard uses Open Authoring. Writers draft and edit in Google Docs, paste
finished work into **Articles**, and select **Ready to Review**. In the owner's dashboard,
those submissions appear under **In Review**, which Student Outlook treats as the final-
approval queue. Published work appears separately under **Published**. The repository
owner performs the final review and merge. An automated step moves an owner-approved draft into the public
article folder, and a GitHub check prevents other accounts from changing published work.
A Netlify authentication function limits dashboard access to GitHub usernames approved in
private project settings. See
[`docs/editorial-workflow.md`](docs/editorial-workflow.md) for the writer, owner, Discord,
and authentication steps.
