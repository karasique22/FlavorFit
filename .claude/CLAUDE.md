# CLAUDE.md

## Project Overview

**Red Winter 2026** — Turborepo monorepo: GraphQL API (NestJS 11) + Next.js 16
frontend for a recipe/meal planning app.

**Stack:** NestJS 11 + Apollo Server 5 + GraphQL code-first | Next.js 16 App
Router + TailwindCSS v4 | PostgreSQL + Prisma 7 (PrismaPg adapter) | pnpm 9
(enforced)

**Ports:** API 4200 (fallback 3000) | Web 3000 | Docs 3001

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
pnpm db:generate            # Generate Prisma client + rebuild @repo/database (after schema changes)
pnpm db:migrate             # Create + apply migration
pnpm db:push                # Push schema without migration (dev only)
pnpm db:studio              # Prisma Studio GUI

# Tests (from apps/api)
cd apps/api && pnpm test    # Run tests
pnpm test:e2e               # E2E tests
```

---

## API Architecture (`apps/api/src/`)

**Modules registered in AppModule:** ConfigModule, GraphQLModule, PrismaModule,
AuthModule, UsersModule, RecipesModule, OrdersModule, EmailModule,
MediaUploadModule, ThrottlerModule, TurnstileModule, ServeStaticModule, ResendModule

**Module structure:**

```
auth/           # JWT auth: resolver, services/, guards/, decorators/, inputs/, strategies/
  services/     # auth.service (login/logout/refresh), auth-account.service (register/verify/reset), auth-cookie.service (JWT cookies)
  guards/       # auth.guard, admin.guard, gql-turnstile.guard (Cloudflare Turnstile captcha)
  decorators/   # auth.decorator.ts (@Auth), captcha.decorator.ts (@Captcha), current-user.decorator.ts (@CurrentUser)
  inputs/       # auth.input.ts, reset-password-input.ts, reset-password-request.input.ts
users/          # User CRUD: resolver, service, input, models
recipes/        # Public queries (resolver + service) + Admin CRUD (admin.resolver + admin.service)
  ingredients/  # Nested: admin resolver + service
orders/         # Order management: resolver, service
email/          # Email sending via Resend: EmailModule + EmailService + Handlebars templates
media-upload/   # File uploads: REST controller + service (not GraphQL)
prisma/         # PrismaService (PrismaPg adapter + pg Pool)
config/         # graphql.config.ts, jwt.config.ts, turnstile.config.ts
common/         # graphql-enums.ts, decorators/, utils/ (prisma-error, pagination), types/ (graphql context), guards/ (gql-throttler)
utils/          # generate-token.util.ts, is-dev.util.ts (API-level helpers)
```

**When creating new modules:** Always read an existing module (e.g. `recipes/`)
first and follow the same file structure and patterns.

**Key patterns:**

- GraphQL code-first — no .graphql files, schema from TypeScript decorators
- Public vs Admin split: `recipes.resolver.ts` (queries) +
  `recipes-admin.resolver.ts` (CRUD with guards)
- Same pattern for ingredients: `ingredients-admin.resolver.ts`
- Auth: JWT with `@UseGuards(AuthGuard)`, `@Auth()` decorator, `AdminGuard` for
  admin-only
- **Captcha:** Cloudflare Turnstile on sensitive mutations — use `@Captcha()` decorator + `GqlTurnstileGuard`
- PrismaService: extends PrismaClient with PrismaPg adapter,
  OnModuleInit/OnModuleDestroy lifecycle
- **Prisma error handling:** Always use `handlePrismaError` from
  `src/common/utils` in try-catch blocks for all Prisma operations that can fail
  (create/update/delete). Pattern:
  `try { return await prisma... } catch (error) { handlePrismaError(error); }`
- Apollo Sandbox at `/graphql` (dev only)
- CORS allows localhost:3000 and localhost:3001 in dev
- ValidationPipe global: whitelist, forbidNonWhitelisted, transform

---

## Database (`packages/database`)

**Schema location:** `packages/database/prisma/schema/` (multi-file)

- `schema.prisma` — generator + datasource
- `user.prisma` — User, Profile, BodyMeasurements
- `recipe.prisma` — Recipe, Ingredient, RecipeIngredient, RecipeStep, Tag,
  RecipeTag
- `order.prisma` — Order, OrderItem, Courier
- `feedback.prisma` — Comment, Like

**Naming:** Models PascalCase, tables snake_case (`@@map`), fields camelCase in
Prisma / snake_case in DB (`@map`)

**Exports:** `import { PrismaClient, ... } from '@repo/database'`

**Workflow:** Edit .prisma files → `pnpm db:generate` → `pnpm db:migrate`

**Important:** `@repo/database` exports from `dist/` (compiled). `pnpm db:generate` now also rebuilds `dist/` automatically. If API still shows stale types after schema change, run `pnpm --filter=@repo/database build` manually.

---

## Frontend (`apps/web`)

Next.js 16 App Router + TailwindCSS v4 with inline theme variables. Shared UI
from `@repo/ui` (`import { Button } from "@/shared/components/ui/button"`). Geist fonts.

**Structure:**

```
src/
  app/              # Next.js pages: auth/ (login, register, forgot-password, reset-password), dashboard/, verify-email/
  features/         # Feature modules — UI + graphql/ + types/: auth/, profile/, layout/
  shared/           # components/, config/, constants/, hooks/, lib/, types/, utils/
  proxy.ts          # Next.js middleware proxy with JWT validation
  app/ApolloWrapper.tsx # Apollo Client provider
```

**GraphQL в web:** `.graphql` файлы лежат в `features/*/graphql/` — codegen генерирует типы в `src/__generated__/`. В отличие от API, в web используются именно .graphql файлы.

**Auth flow:** Email verification (`/verify-email`), forgot password (`/auth/forgot-password`), reset password (`/auth/reset-password`).

---

## Pitfalls

- Always run pnpm from root with `--filter`, not from package dirs
- Run `pnpm db:generate` after any schema change — build fails without it
- GraphQL is code-first — don't look for .graphql files
- `build` depends on `db:generate` (turbo.json)
- Database tasks have `cache: false` in turbo
- Package manager locked to pnpm@9.0.0
