<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Internationalization

This project uses next-intl. Every user-visible string must be wrapped before a
task is complete. The authoritative rules — API decision tree, plurals, number
and date formatting, locale-aware navigation, and what not to wrap — live in
`.agents/globalize-rules.md`. Read it before adding or editing UI copy.
