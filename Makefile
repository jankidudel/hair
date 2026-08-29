.DEFAULT_GOAL := help

.PHONY: help install dev build lint test format format-check content-check infra-build infra-synth infra-diff-dev infra-diff-prod

help:
	@echo "Everyday Hair commands (run from the repository root):"
	@echo "  make install          Install all workspace dependencies"
	@echo "  make dev              Start the Angular development server"
	@echo "  make build            Create production builds for all workspaces"
	@echo "  make lint | test      Run checks across all workspaces"
	@echo "  make format           Format repository files"
	@echo "  make content-check    Check editorial safety rules"
	@echo "  make infra-synth      Synthesize CDK templates (no AWS changes)"
	@echo "  make infra-diff-dev   Show planned development infrastructure changes"

install:
	npm install

dev:
	npm run dev

build:
	npm run build

lint:
	npm run lint

test:
	npm run test

format:
	npm run format

format-check:
	npm run format:check

content-check:
	npm run content:check

infra-build:
	npm run infra:build

infra-synth:
	npm run synth --workspace=infra

infra-diff-dev:
	npm run infra:diff:dev

infra-diff-prod:
	npm run infra:diff:prod
