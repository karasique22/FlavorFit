# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Red Winter 2026** - Turborepo monorepo with GraphQL API (NestJS) and Next.js frontend for a recipe/meal planning application.

**Stack:**
- Backend: NestJS + Apollo GraphQL (port 3000)
- Frontend: Next.js 16 App Router + TailwindCSS v4 (port 3002)
- Database: PostgreSQL with Prisma ORM
- Package Manager: **pnpm** (enforced via packageManager field)

## Repository Structure

```
red-winter-2026/
├── apps/
│   ├── api/          # NestJS GraphQL API
│   ├── web/          # Next.js frontend
│   └── docs/         # Documentation site (Next.js)
├── packages/
│   ├── database/     # Shared Prisma schema and client
│   ├── ui/           # Shared React components
│   ├── eslint-config/    # Shared ESLint configs
│   └── typescript-config/ # Shared TypeScript configs
```

## Common Commands

### Development

```bash
# Start all apps in development mode (uses Turbo parallel execution)
pnpm dev

# Start specific app
pnpm dev --filter=api    # API only (port 3000)
pnpm dev --filter=web    # Frontend only (port 3002)
pnpm dev --filter=docs   # Docs only

# Build all apps
pnpm build

# Build specific app
pnpm build --filter=api
```

### Database (Prisma)

**IMPORTANT:** Always run database commands from the root directory using turbo, NOT from packages/database.

```bash
# Generate Prisma Client (after schema changes)
pnpm db:generate

# Create and apply migration
pnpm db:migrate

# Push schema changes without migration (dev only)
pnpm db:push

# Open Prisma Studio (database GUI)
pnpm db:studio
```

### Linting and Formatting

```bash
# Lint all packages
pnpm lint

# Format all files
pnpm format

# Type check all packages
pnpm check-types
```

### Testing (NestJS API)

```bash
cd apps/api

# Run all tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage
pnpm test:cov

# E2E tests
pnpm test:e2e

# Debug tests
pnpm test:debug
```

## Architecture

### Monorepo Organization

This is a **Turborepo** monorepo with task orchestration defined in `turbo.json`. Turbo handles:
- Parallel task execution
- Task dependency management (e.g., build depends on db:generate)
- Caching of build outputs

**Workspace packages** are managed via `pnpm-workspace.yaml` and referenced using `workspace:*` protocol in package.json dependencies.

### Database Package (`@repo/database`)

**Critical:** The database package is shared between all apps.

- **Schema location:** `packages/database/prisma/schema/` (split into multiple files)
  - `schema.prisma` - Generator and datasource config
  - `user.prisma` - User, Profile, BodyMeasurements models
  - `recipe.prisma` - Recipe, Ingredient, RecipeIngredient, RecipeStep, Tag models
  - `order.prisma` - Order, OrderItem, Courier models
  - `feedback.prisma` - Comment, Like models

- **Generated client:** `packages/database/src/generated/prisma/`
- **Exported from:** `packages/database/src/index.ts`
- **Usage in apps:** `import { PrismaClient } from '@repo/database'`

**Important:** After schema changes, run `pnpm db:generate` from root to regenerate the client.

### NestJS API (`apps/api`)

**GraphQL API** using Apollo Server with code-first approach (no schema files, auto-generated from decorators).

**Module structure:**
- `src/app.module.ts` - Root module with GraphQL setup
- `src/main.ts` - Bootstrap (port 3000)
- `src/prisma/` - PrismaService for database connection
- `src/config/` - Configuration factories (graphql.config.ts, jwt.config.ts)
- `src/auth/` - Authentication (JWT-based)
- `src/users/` - User management
- `src/recipes/` - Recipe CRUD and nested ingredients
- `src/orders/` - Order management

**GraphQL configuration:**
- Code-first approach (`autoSchemaFile: true`)
- Apollo Sandbox enabled in development
- Context includes Express req/res for auth

**Key patterns:**
- Each module has: resolver, service, module file
- GraphQL decorators: `@Resolver()`, `@Query()`, `@Mutation()`, `@Field()`, `@InputType()`, `@ObjectType()`
- Dependency injection via constructor
- PrismaService injected for database access

**Creating new modules:**
```bash
cd apps/api
nest g resource modules/resource-name --no-spec
```

### Next.js Frontend (`apps/web`)

**Next.js 16** with App Router and **TailwindCSS v4**.

**Styling:**
- Uses inline Tailwind theme variables in `app/globals.css`
- Custom color palette: `--background`, `--foreground`
- Geist Sans and Geist Mono fonts loaded from Google Fonts

**Shared UI:**
- Components in `packages/ui/src/` (button, card, code)
- Exported with `"./*": "./src/*.tsx"` pattern
- Usage: `import { Button } from "@repo/ui/button"`

### Database Schema Overview

**Users & Profiles:**
- `User` - Auth (email, password, role)
- `Profile` - User details (fullName, avatar, gender, bio, socials)
- `BodyMeasurements` - Physical measurements (height, weight, circumferences)

**Recipes:**
- `Recipe` - Main recipe data (title, slug, description, nutrition, timing)
- `Ingredient` - Ingredient catalog with pricing
- `RecipeIngredient` - Join table (recipe ↔ ingredient with amount/unit)
- `RecipeStep` - Ordered cooking steps
- `Tag` - Recipe categorization
- `RecipeTag` - Many-to-many (recipe ↔ tag)

**Orders:**
- `Order` - User orders with status tracking
- `OrderItem` - Items in order (ingredient + quantity)
- `Courier` - Delivery personnel

**Social:**
- `Comment` - Recipe comments
- `Like` - Recipe likes (unique per user+recipe)

**Enums:**
- `Role`: USER, ADMIN
- `Gender`: MALE, FEMALE, OTHER
- `NutritionalGoal`: WEIGHT_LOSS, WEIGHT_GAIN, MUSCLE_GAIN, MAINTENANCE, ENDURANCE
- `ActivityLevel`: SEDENTARY → EXTREMELY_ACTIVE
- `Difficulty`: EASY, MEDIUM, HARD
- `MealType`: BREAKFAST, LUNCH, DINNER, SNACK, DESSERT, DRINK
- `DietType`: BALANCED, LOW_CARB, KETO, VEGETARIAN, VEGAN, DAIRY_FREE, GLUTEN_FREE, HIGH_PROTEIN, PALEO
- `Unit`: GRAM, KILOGRAM, MILLILITER, LITER, CUP, TABLESPOON, TEASPOON, PIECE
- `OrderStatus`: PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELED

**Naming conventions:**
- Prisma models: PascalCase
- Database tables: snake_case (via `@@map("users")`)
- Fields: camelCase in Prisma, snake_case in DB (via `@map("user_id")`)

## Critical Development Notes

### Prisma Workflow

1. **Schema changes:** Edit files in `packages/database/prisma/schema/`
2. **Generate client:** Run `pnpm db:generate` from root
3. **Create migration:** Run `pnpm db:migrate` and provide migration name
4. **Never commit** `packages/database/src/generated/` (gitignored)

### Environment Variables

Required in `.env` (root):
```
DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"
PORT=3000
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**JWT_SECRET** should also be added for auth (referenced in `jwt.config.ts`).

### GraphQL Development

**Auto-generated schema:** GraphQL schema is generated at runtime from TypeScript decorators. No `.graphql` files needed.

**Access Apollo Sandbox:** http://localhost:3000/graphql (development only)

**Typical resolver pattern:**
```typescript
@Resolver()
export class RecipesResolver {
  constructor(private readonly recipesService: RecipesService) {}

  @Query(() => [Recipe])
  async recipes() {
    return this.recipesService.findAll();
  }

  @Mutation(() => Recipe)
  async createRecipe(@Args('input') input: CreateRecipeInput) {
    return this.recipesService.create(input);
  }
}
```

**Input/Output types:**
```typescript
@InputType()
export class CreateRecipeInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;
}

@ObjectType()
export class Recipe {
  @Field()
  id: string;

  @Field()
  title: string;
}
```

### PrismaService Integration

The API uses a custom `PrismaService` that extends `PrismaClient`:
- Located in `apps/api/src/prisma/prisma.service.ts`
- Implements `OnModuleInit` and `OnModuleDestroy` for connection lifecycle
- Import Prisma types from `@repo/database` package
- Inject `PrismaService` into services (not raw PrismaClient)

### Port Configuration

- **API (NestJS):** Port 3000 (configurable via PORT env var)
- **Frontend (Next.js web):** Port 3002 (set in package.json script)
- **Docs:** Port 3001 (default Next.js port)

When adding API URL to frontend, use `NEXT_PUBLIC_API_URL` env var.

### Turborepo Task Dependencies

From `turbo.json`:
- `build` depends on `db:generate` (Prisma client must be generated first)
- Database tasks (`db:*`) have `cache: false` (always run fresh)
- `dev` and `db:studio` are persistent tasks

## Common Pitfalls

1. **Don't run pnpm commands from package directories** - Use root with `--filter` flag
2. **Don't forget db:generate after schema changes** - Build will fail if Prisma client is stale
3. **GraphQL schema is code-first** - Don't look for .graphql files, check decorators
4. **Workspace references use `workspace:*`** - Not file paths or versions
5. **Database tables use snake_case** - Even though models are PascalCase
6. **Always use pnpm** - Package manager is locked to pnpm@9.0.0

## File Patterns to Recognize

- `*.resolver.ts` - GraphQL resolvers (queries/mutations)
- `*.service.ts` - Business logic layer
- `*.module.ts` - NestJS module definitions
- `*.input.ts` - GraphQL input types
- `*.entity.ts` or `*.model.ts` - GraphQL object types (if present)
- `*.prisma` - Prisma schema fragments
