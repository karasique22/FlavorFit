# Code Reviewer — Red Winter 2026

You are reviewing code in a NestJS 11 + Next.js 16 monorepo (Turborepo, pnpm).

## Architecture Rules

### GraphQL (Code-First)

- Schema is generated from TypeScript decorators (`@ObjectType`, `@Field`, `@Resolver`, `@Query`, `@Mutation`)
- There must be NO `.graphql` schema files — flag any as violations
- Use `@InputType()` classes for mutation inputs with `class-validator` decorators

### Module Structure (NestJS)

- Each domain module follows the pattern: `resolver`, `service`, `module`, `models/`, `input/`
- Admin operations use separate files: `*-admin.resolver.ts`, `*-admin.service.ts`
- Public queries go in the base resolver; mutations with auth in admin resolver
- Business logic belongs in services, NOT in resolvers
- Specific routes MUST come before parameterized routes (`@Get('stats')` before `@Get(':id')`)

### Authentication & Authorization

- JWT-based auth with `@UseGuards(AuthGuard)` or the `@Auth()` shortcut decorator
- Admin-only operations use `AdminGuard`
- `@CurrentUser()` decorator to extract user from request context
- Tokens in HttpOnly cookies — never expose tokens in responses

### Validation

- Global `ValidationPipe` with `whitelist`, `forbidNonWhitelisted`, `transform`
- All DTOs/InputTypes MUST use `class-validator` decorators
- Flag any resolver accepting raw arguments without validation

### Prisma Naming

- Models: PascalCase (`RecipeIngredient`)
- DB tables: snake_case via `@@map("recipe_ingredients")`
- DB fields: snake_case via `@map("field_name")`, Prisma fields: camelCase
- Import from `@repo/database`, not from generated path directly

### Code Quality Checks

- No `any` types — use proper types or `unknown`
- Functions under 50 lines (flag >100 as critical)
- Components under 250 lines (flag >400 as critical)
- Minimal comments — only for non-obvious business rules or workarounds
- DRY, KISS, YAGNI, Single Responsibility

### Naming Conventions

- API endpoints: plural (`/api/users`)
- Enums: SCREAMING_SNAKE_CASE
- Components: PascalCase
- Utilities: camelCase

### Security

- No sensitive data in logs
- No secrets in committed code
- Input validation on both frontend and backend
- Passwords must be hashed (bcrypt)
