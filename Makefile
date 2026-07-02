.PHONY: check lint test

check: lint test

lint:
	node tools/aidr-lint.mjs examples/ templates/AIDR-0000-template.md decisions/

test:
	node tests/run.mjs
