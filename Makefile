.PHONY: help dev dev-api dev-web build clean install lint format check-types test test-watch test-cov test-e2e db-generate db-migrate db-push db-studio db-reset

# Цвета для вывода
GREEN := \033[0;32m
YELLOW := \033[0;33m
RED := \033[0;31m
NC := \033[0m # No Color

help: ## Показать это сообщение помощи
	@echo "$(GREEN)Red Winter 2026 - Доступные команды:$(NC)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(YELLOW)%-20s$(NC) %s\n", $$1, $$2}'

# ======================
# Установка и очистка
# ======================

install: ## Установить зависимости (pnpm install)
	@echo "$(GREEN)Установка зависимостей...$(NC)"
	pnpm install

clean: ## Очистить node_modules и dist
	@echo "$(YELLOW)Очистка node_modules и dist...$(NC)"
	rm -rf node_modules apps/*/node_modules packages/*/node_modules
	rm -rf apps/*/dist apps/*/.next packages/*/dist
	rm -rf .turbo apps/*/.turbo packages/*/.turbo

# ======================
# Разработка
# ======================

dev: ## Запустить все приложения в dev режиме
	@echo "$(GREEN)Запуск всех приложений...$(NC)"
	pnpm dev

dev-api: ## Запустить только API в dev режиме
	@echo "$(GREEN)Запуск API...$(NC)"
	pnpm dev --filter=api

dev-web: ## Запустить только frontend в dev режиме
	@echo "$(GREEN)Запуск frontend...$(NC)"
	pnpm dev --filter=web

dev-docs: ## Запустить только docs в dev режиме
	@echo "$(GREEN)Запуск docs...$(NC)"
	pnpm dev --filter=docs

# ======================
# Сборка
# ======================

build: ## Собрать все приложения
	@echo "$(GREEN)Сборка всех приложений...$(NC)"
	pnpm build

build-api: ## Собрать только API
	@echo "$(GREEN)Сборка API...$(NC)"
	pnpm build --filter=api

build-web: ## Собрать только frontend
	@echo "$(GREEN)Сборка frontend...$(NC)"
	pnpm build --filter=web

# ======================
# Качество кода
# ======================

lint: ## Запустить линтер для всех приложений
	@echo "$(GREEN)Проверка кода линтером...$(NC)"
	pnpm lint

format: ## Форматировать код через Prettier
	@echo "$(GREEN)Форматирование кода...$(NC)"
	pnpm format

check-types: ## Проверить типы TypeScript
	@echo "$(GREEN)Проверка типов...$(NC)"
	pnpm check-types

# ======================
# Тестирование (API)
# ======================

test: ## Запустить unit тесты (API)
	@echo "$(GREEN)Запуск unit тестов...$(NC)"
	cd apps/api && pnpm test

test-watch: ## Запустить unit тесты в watch режиме (API)
	@echo "$(GREEN)Запуск unit тестов в watch режиме...$(NC)"
	cd apps/api && pnpm test:watch

test-cov: ## Запустить unit тесты с покрытием (API)
	@echo "$(GREEN)Запуск тестов с покрытием...$(NC)"
	cd apps/api && pnpm test:cov

test-e2e: ## Запустить e2e тесты (API)
	@echo "$(GREEN)Запуск e2e тестов...$(NC)"
	cd apps/api && pnpm test:e2e

# ======================
# База данных
# ======================

db-generate: ## Сгенерировать Prisma Client
	@echo "$(GREEN)Генерация Prisma Client...$(NC)"
	pnpm db:generate

db-migrate: ## Создать и применить миграцию
	@echo "$(GREEN)Применение миграций...$(NC)"
	pnpm db:migrate

db-push: ## Отправить схему в БД без миграции (dev only)
	@echo "$(YELLOW)Push схемы в БД (только для dev)...$(NC)"
	pnpm db:push

db-studio: ## Открыть Prisma Studio
	@echo "$(GREEN)Открытие Prisma Studio...$(NC)"
	pnpm db:studio

db-reset: ## Сбросить БД и применить миграции заново
	@echo "$(RED)Сброс БД и применение миграций...$(NC)"
	@printf "Вы уверены? Все данные будут удалены! [y/N] "
	@read REPLY; \
	case "$$REPLY" in \
		[Yy]) \
			cd packages/database && pnpm prisma migrate reset; \
			;; \
		*) \
			echo "Отменено."; \
			;; \
	esac

# ======================
# Docker
# ======================

# docker-up: ## Запустить Docker контейнеры
# docker-down: ## Остановить Docker контейнеры
# docker-logs: ## Показать логи Docker контейнеров

# ======================
# Утилиты
# ======================

.DEFAULT_GOAL := help
