

install:
#	NODE_ENV=development docker compose -f docker-compose.yml run --rm --no-deps server ash -ci 'yarn install --ignore-engines'
	NODE_ENV=development docker compose -f docker-compose.yml run --rm --no-deps server ash -ci 'npm install'
	NODE_ENV=development docker compose -f docker-compose.yml run --rm --no-deps server ash -ci 'cd my-app && npm install'

start-storybook:
#	npm run storybook
	docker compose up --build

start-with-local-node-binaries:
	npm run storybook

connect-server: ## Start a terminal session in server container
	docker compose -f docker-compose.yml exec server ash

delete-local-node-dependencies:
#	rm -rf ./app/node_modules
	rm -rf ./node_modules
	rm -rf ./my-app/node_modules

delete-images:
	docker rmi design-system-dsi-server

build-design-system-library:
	rm -rf ./dist
	docker compose -f docker-compose.yml run --rm --no-deps server ash -ci 'cd /app/ && npm run build'
#	mv ./app/dist ./dist

checkout-code-from-design-system-dsi-git:
	rm -rf design-system-dsi/*
	cd design-system-dsi && git archive --remote=git@arseche.cnam.fr:lebihanj/design-system-dsi.git main . | tar xvf -
	cp -r design-system-dsi/.storybook/* ./.storybook
	cp -r design-system-dsi/src/* ./src