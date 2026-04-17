.PHONY: install build start

install-root:
	npm ci

install-frontend:
	cd frontend && npm ci --legacy-peer-deps

install: install-root install-frontend

build:
	cd frontend && npm run build

dev:
	cd frontend && npm run dev

start:
	npx serve -s frontend/dist -l 5001

preview:
	cd frontend && npm run preview

lint:
	cd frontend && npx eslint --no-config-lookup --config eslint.config.js . --fix

clean:
	rm -rf frontend/dist

test-start:
	rm -rf frontend/dist
	npm run build
	npx start-server -s ./frontend/dist