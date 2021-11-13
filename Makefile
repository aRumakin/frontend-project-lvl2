
install:
	npm ci

publish:
	npm publish --dry-run
	npm link

gendiff:
	node bin/gendiff.js

lint:
	npx eslint .
