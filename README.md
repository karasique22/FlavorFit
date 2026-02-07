# Red Winter 2026

Turborepo-монорепозиторий: GraphQL API (NestJS) + Next.js frontend для приложения рецептов и планирования питания.

## Стек технологий

- **API:** NestJS 11, Apollo Server 5, GraphQL (code-first)
- **Frontend:** Next.js 16 (App Router), TailwindCSS v4
- **База данных:** PostgreSQL, Prisma 7 (PrismaPg adapter)
- **Монорепо:** Turborepo, pnpm 9

## Структура

```
apps/
  api/            # NestJS GraphQL API
  web/            # Next.js frontend
  docs/           # Документация
packages/
  database/       # Prisma-схема и клиент (@repo/database)
  ui/             # Общие React-компоненты (@repo/ui)
  eslint-config/  # Конфигурация ESLint
  typescript-config/
```

## Быстрый старт

**Требования:** Node.js 18+, pnpm 9, PostgreSQL

```bash
# Установить зависимости
make install

# Настроить окружение
cp apps/api/.env.example apps/api/.env
# Указать DATABASE_URL и JWT_SECRET в .env

# Применить миграции
make db-migrate

# Запустить все приложения
make dev
```

| Приложение | Порт |
|------------|------|
| API        | 3000 |
| Web        | 3002 |
| Docs       | 3001 |

GraphQL Sandbox доступен на `http://localhost:3000/graphql` в dev-режиме.

## Команды Makefile

Все команды запускаются из корня репозитория. `make help` покажет полный список.

### Разработка

| Команда | Описание |
|---------|----------|
| `make dev` | Запустить все приложения |
| `make dev-api` | Запустить только API |
| `make dev-web` | Запустить только frontend |
| `make dev-docs` | Запустить только docs |

### Сборка и качество кода

| Команда | Описание |
|---------|----------|
| `make build` | Собрать все |
| `make lint` | Линтер |
| `make format` | Форматирование (Prettier) |
| `make check-types` | Проверка типов TypeScript |

### Тестирование

| Команда | Описание |
|---------|----------|
| `make test` | Unit-тесты (API) |
| `make test-watch` | Тесты в watch-режиме |
| `make test-cov` | Тесты с покрытием |
| `make test-e2e` | E2E-тесты |

### База данных

| Команда | Описание |
|---------|----------|
| `make db-generate` | Сгенерировать Prisma Client |
| `make db-migrate` | Создать и применить миграцию |
| `make db-push` | Push схемы без миграции (dev) |
| `make db-studio` | Открыть Prisma Studio |
| `make db-reset` | Сбросить БД |

### Прочее

| Команда | Описание |
|---------|----------|
| `make install` | Установить зависимости |
| `make clean` | Очистить node_modules, dist, кеши |
