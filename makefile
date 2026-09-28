

install:
#	NODE_ENV=development docker compose -f docker-compose.yml run --rm --no-deps server ash -ci 'yarn install --ignore-engines'
	NODE_ENV=development docker compose -f docker-compose.yml run --rm --no-deps server ash -ci 'npm install'

start-storybook:
#	npm run storybook
	docker compose up

start-with-local-node-binaries:
	npm run storybook

delete-local-node-dependencies:
	rm -rf ./app/node_modules
	rm -rf ./node_modules

delete-images:
	docker rmi design-system-dsi-server

build-design-system-library:
	docker compose -f docker-compose.yml run --rm --no-deps server ash -ci 'npm run build'