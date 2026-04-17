.PHONY: install build start develop lint

install:
	npm ci

build:
	rm -rf frontend/dist && cd frontend && npm run build && cd ..

start-frontend:
	make -C frontend start

start-backend:
	npx start-server -p 5001 -s ./frontend/dist

start:
	make start-backend

develop:
	make start-backend & make start-frontend

lint:
	cd frontend && npm run lint

test-start:
	rm -rf frontend/dist
	npm run build
	npx start-server -s ./frontend/dist