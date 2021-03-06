
install:
	npm ci

publish:
	npm publish --dry-run
	npm link

gendiff:
	node bin/gendiff.js

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage
