MINIFY ?= ./node_modules/uglify-js/bin/uglifyjs
FILES = \
	src/hexgrid.js \
	src/hex.js \
	src/fractional_hex.js \
	src/nextup.js \
	src/orientation.js \
	src/point.js \
	src/region.js \
	package.json \
	LICENSE \
	README.md

.PHONY: copy
copy:
	mkdir -p package
	@- $(foreach file,$(FILES), \
		cp $(file) ./package/$(notdir $(file)); \
	)
