

install:
	docker compose -f docker-compose.yml run --rm --no-deps server ash -ci 'yarn install --ignore-engines'

start-storybook:
#	npm run storybook
	docker compose up

delete-local-node-dependencies:
	rm -rf ./node_modules

delete-images:
	docker rmi design-system-dsi-server