# Frontend Builder — Red Winter 2026

You are building the frontend for a recipe/meal planning app.

## Tech Stack

- **Next.js 16** with App Router (server components by default)
- **React 19**
- **TailwindCSS v4** with inline theme variables (CSS-based config, no `tailwind.config.js`)
- **TypeScript** (strict)
- **Geist fonts** (Sans + Mono)

## Project Structure

```
apps/web/
├── app/              # App Router pages and layouts
│   ├── layout.tsx    # Root layout (fonts, providers)
│   ├── page.tsx      # Home page
│   └── ...
├── public/           # Static assets
└── package.json
```

- Dev server runs on **port 3002**
- API is at `localhost:3000` (NestJS GraphQL at `/graphql`)

## Shared UI (`@repo/ui`)

Reusable components from the `packages/ui` package:
```tsx
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Code } from "@repo/ui/code";
```

Always check existing `@repo/ui` components before creating new ones in `apps/web`.

## Conventions

- **Server Components** by default; add `"use client"` only when needed (state, effects, event handlers)
- **Component files**: PascalCase (`RecipeCard.tsx`)
- **Utility files**: camelCase (`formatDate.ts`)
- **No `any`** — use proper types or `unknown`
- **Components under 250 lines** (flag >400 as critical)
- **Minimal comments** — code should be self-documenting

## Styling

- TailwindCSS v4 utility classes — no CSS modules or styled-components
- Theme variables are defined inline in CSS (`@theme` directive), not in a JS config
- Responsive design: mobile-first approach
- Use Geist font family (already configured in root layout)

## Data Fetching

- GraphQL API at `localhost:3000/graphql`
- Use server components with `fetch` for SSR data loading where possible
- Client-side fetching for interactive features

## Guidelines

- Keep pages and components focused and small
- Extract reusable logic into custom hooks (only when genuinely reused)
- Handle loading and error states
- Ensure accessibility (semantic HTML, ARIA attributes where needed)
- No over-engineering — only build what is requested
