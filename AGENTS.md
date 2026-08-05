# AGENTS.md

## Project summary

Student Outlook is a public online publication for middle and high
school students.

The site publishes thoughtful, encouraging, and entertaining articles
written by a small group of approved contributors.

The main content categories are:

- Academic Life
- Student Lifestyle
- Student Stories
- Entertainment

The website should be welcoming, easy to read, mobile-friendly,
accessible, and appropriate for students.

## Current project stage

The project is in its early development stage.

No application framework is currently installed. Before initializing a
framework, explain the proposed choice in beginner-friendly language and
get approval. Treat the initial framework setup as a major change.

Build the website gradually. Do not attempt to create every planned
feature in one task.

Before making a major change:

1. Inspect the existing project.
2. Explain the proposed approach.
3. Make only the requested changes.
4. Test the changes.
5. Summarize what changed.

## Development priorities

Build features in this general order:

1. Homepage and navigation
2. Sample article cards
3. Individual article pages
4. Article categories
5. About page
6. Contributor information page
7. Newsletter signup interface
8. Article management workflow
9. Deployment preparation

Do not begin a later step unless the user asks for it.

For the first homepage and navigation task, focus on the site header,
navigation links, a welcoming introduction, category links, and a simple
footer. Add article cards in the following task so each change remains
small and easy to review.

## Content and privacy rules

- Do not display students' private information.
- Do not expose personal email addresses.
- Use display names or pen names when appropriate.
- Do not add public comments or direct messaging.
- Do not add follower counts or public popularity rankings.
- Do not collect personal information without explicit approval.
- Do not connect a real newsletter service without explicit approval.
- Use placeholder content instead of inventing personal student stories.
- Use fictional display names for placeholder contributors.
- Do not invent school names, locations, ages, or identifying details.
- Do not create public contact links for contributors.
- Require editorial approval before publishing student work.
- Do not accept student submissions until a privacy-reviewed process has
  been explicitly approved.
- Do not use identifiable photos of minors without explicit approval and
  documented permission. Prefer illustrations, abstract graphics, or
  non-identifying images.
- Keep all content appropriate for middle and high school students.

## Technical rules

- Prefer simple, understandable solutions.
- Use TypeScript when the project supports it.
- Use accessible, semantic HTML.
- Aim for WCAG 2.2 Level AA. Include keyboard navigation, visible focus
  indicators, sufficient color contrast, semantic headings, form labels,
  and descriptive alternative text where relevant.
- Make all pages responsive for phones, tablets, and computers.
- Avoid unnecessary dependencies.
- Do not replace the existing framework without approval.
- Do not make major architectural changes without explaining them first.
- Before building article pages, explain and get approval for how article
  content will be stored. Prefer a simple option such as local TypeScript
  data, JSON, or Markdown before introducing a database or content
  management system.
- Once a package manager is configured, continue using it. Do not add a
  different package manager or a second lockfile.
- Keep components reasonably small and clearly named.
- Add comments only when they clarify something that is not obvious.

## Design direction

The visual style should feel:

- Bright
- Welcoming
- Calm
- Modern
- Student-focused

Preferred colors include:

- Sky blue
- Aqua
- Soft yellow
- Cream
- Dark blue for readable text

Avoid clutter, excessive animations, distracting effects, and
childish-looking design.

## Required checks

Before completing a coding task:

1. Run the formatter if one is configured.
2. Run the linter if one is configured.
3. Run TypeScript checks if configured.
4. Run relevant tests if they exist.
5. Run the production build when practical.
6. Fix errors caused by the changes.

If a check cannot be run, explain why.

## Git and GitHub workflow

- Do not commit secrets or `.env` files.
- Keep each task focused on one feature or fix.
- Do not rewrite unrelated files.
- Use clear commit and pull-request summaries.
- Describe what changed and how it was tested.
- Mention any known limitations.

## Communication style

Assume the project owner is learning web development.

Explain:

- What you changed
- Why you changed it
- Which files were changed
- How to test the result
- Any new commands or concepts

Use clear language and define unfamiliar technical terms.

## Before editing

When the user's request is unclear or could require a major redesign,
ask for clarification before changing the project.

When asked only to inspect, explain, review, or plan, do not edit files.
