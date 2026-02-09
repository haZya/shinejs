# ShineJS docs

The `docs` workspace is the ShineJS documentation site, built with Next.js 16, Fumadocs, and MDX.

## Run locally

From the monorepo root:

```bash
npm install
npm -w apps/docs run dev
```

Open `http://localhost:3000/docs`.

## Build and lint

From the monorepo root:

```bash
npm -w apps/docs run build
npm -w apps/docs run lint
```

## Where to write docs

- Docs content lives in `apps/docs/content/docs`.
- Add new pages as `.mdx` files with frontmatter (`title`, `description`).
- Routes are generated from file paths and served under `/docs/*`.

## Interactive preview components

- Preview components live in `apps/docs/src/components/previews`.
- Register new components in `apps/docs/src/mdx-components.tsx` to use them directly inside MDX files.

## Key files

- `apps/docs/source.config.ts`: points Fumadocs to `content/docs`.
- `apps/docs/src/lib/source.ts`: configures the docs source loader (`baseUrl: "/docs"`).
- `apps/docs/src/app/docs/[[...slug]]/page.tsx`: docs page renderer and static params generation.
