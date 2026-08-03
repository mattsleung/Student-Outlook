# Student Outlook

A public student publication featuring study advice, social tips, student stories, and
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

The planned Decap CMS dashboard uses Open Authoring. Writers create drafts, while the
repository owner performs the final review and merge. See
[`docs/editorial-workflow.md`](docs/editorial-workflow.md) for the writer, owner, Discord,
and authentication steps.
