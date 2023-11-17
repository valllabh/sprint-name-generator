run:
	npx tailwindcss -i ./src/css/style.css -o ./dist/css/style.css --watch

install:
	npm install

build:
	# clean dist folder
	rm -rf ./dist

	# create dist folder if do not exists
	mkdir -p ./dist
	mkdir -p ./dist/css
	mkdir -p ./dist/js

	npx tailwindcss -i ./src/css/style.css -o ./dist/css/style.css --minify
	
	# copy index.html to dist
	cp ./src/index.html ./dist/index.html
	
	# change css path in index.html from "/dist/css/style.css" to "css/style.css"
	sed -i 's/\/dist\/css\/style.css/css\/style.css/g' ./dist/index.html

	# copy script.js to dist
	cp ./src/js/script.js ./dist/js/
	# minify script.js
	npx terser ./dist/js/script.js --output ./dist/js/script.js --compress --mangle

run-server:
	npx http-server ./