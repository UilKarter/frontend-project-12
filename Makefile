install:
	npm ci

build:
	rm -rf frontend/dist
	npm run build

start:
	npx start-server -s ./frontend/dist

test-start:
	rm -rf frontend/dist
	npm run build
	npx start-server -s ./frontend/dist

