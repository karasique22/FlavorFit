# CLAUDE.md

## Project Overview

**Red Winter 2026** — Turborepo monorepo: GraphQL API (NestJS 11) + Next.js 16 frontend for a recipe/meal planning app.

**Stack:** NestJS 11 + Apollo Server 5 + GraphQL code-first | Next.js 16 App Router + TailwindCSS v4 | PostgreSQL + Prisma 7 (PrismaPg adapter) | pnpm 9 (enforced)

**Ports:** API 3000 (default fallback 4200) | Web 3002 | Docs 3001

---

## Repository Structure

```
apps/
  api/          # NestJS GraphQL API
  web/          # Next.js 16 frontend
  docs/         # Documentation site
packages/
  database/     # Shared Prisma schema + client (@repo/database)
  ui/           # Shared React components (@repo/ui)
  eslint-config/
  typescript-config/
```

---

## Commands (always from root)

```bash
pnpm dev                    # All apps
pnpm dev --filter=api       # API only
pnpm dev --filter=web       # Frontend only
pnpm build                  # Build all
pnpm lint                   # Lint all
pnpm check-types            # Type check all
pnpm format                 # Prettier

# Database (always from root, never from packages/database)
pnpm db:generate            # Generate Prisma client (after schema changes)
pnpm db:migrate             # Create + apply migration
pnpm db:push                # Push schema without migration (dev only)
pnpm db:studio              # Prisma Studio GUI

# Tests (from apps/api)
cd apps/api && pnpm test    # Run tests
pnpm test:e2e               # E2E tests
```

---

## API Architecture (`apps/api/src/`)

**Modules registered in AppModule:** ConfigModule, GraphQLModule, PrismaModule, AuthModule, UsersModule, RecipesModule, OrdersModule

**Module structure:**

```
auth/           # JWT auth: resolver, service, guards (auth.guard, admin.guard), jwt.strategy
users/          # User CRUD: resolver, service, input, models
recipes/        # Public queries (resolver + service) + Admin CRUD (admin.resolver + admin.service)
  ingredients/  # Nested: admin resolver + service
orders/         # Order management: resolver, service
prisma/         # PrismaService (PrismaPg adapter + pg Pool)
config/         # graphql.config.ts, jwt.config.ts
common/         # graphql-enums.ts, decorators (current-user), utils (prisma-error), types (graphql context)
```

**When creating new modules:** Always read an existing module (e.g. `recipes/`) first and follow the same file structure and patterns.

**Key patterns:**

- GraphQL code-first — no .graphql files, schema from TypeScript decorators
- Public vs Admin split: `recipes.resolver.ts` (queries) + `recipes-admin.resolver.ts` (CRUD with guards)
- Same pattern for ingredients: `ingredients-admin.resolver.ts`
- Auth: JWT with `@UseGuards(AuthGuard)`, `@Auth()` decorator, `AdminGuard` for admin-only
- PrismaService: extends PrismaClient with PrismaPg adapter, OnModuleInit/OnModuleDestroy lifecycle
- **Prisma error handling:** Always use `handlePrismaError` from `src/common/utils` in try-catch blocks for all Prisma operations that can fail (create/update/delete). Pattern: `try { return await prisma... } catch (error) { handlePrismaError(error); }`
- Apollo Sandbox at `/graphql` (dev only)
- CORS allows localhost:3002 and localhost:3001 in dev
- ValidationPipe global: whitelist, forbidNonWhitelisted, transform

---

## Database (`packages/database`)

**Schema location:** `packages/database/prisma/schema/` (multi-file)

- `schema.prisma` — generator + datasource
- `user.prisma` — User, Profile, BodyMeasurements
- `recipe.prisma` — Recipe, Ingredient, RecipeIngredient, RecipeStep, Tag, RecipeTag
- `order.prisma` — Order, OrderItem, Courier
- `feedback.prisma` — Comment, Like

**Naming:** Models PascalCase, tables snake_case (`@@map`), fields camelCase in Prisma / snake_case in DB (`@map`)

**Exports:** `import { PrismaClient, ... } from '@repo/database'`

**Workflow:** Edit .prisma files → `pnpm db:generate` → `pnpm db:migrate`

---

## Frontend (`apps/web`)

Next.js 16 App Router + TailwindCSS v4 with inline theme variables. Shared UI from `@repo/ui` (`import { Button } from "@repo/ui/button"`). Geist fonts.

---

## Pitfalls

- Always run pnpm from root with `--filter`, not from package dirs
- Run `pnpm db:generate` after any schema change — build fails without it
- GraphQL is code-first — don't look for .graphql files
- `build` depends on `db:generate` (turbo.json)
- Database tasks have `cache: false` in turbo
- Package manager locked to pnpm@9.0.0
