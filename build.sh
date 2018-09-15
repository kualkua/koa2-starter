#!/bin/sh

rm -rf dist/

cd app

NODE_ENV=development ../../../node_modules/.bin/tsc -p tsconfig.json > /dev/null

cp -r config ../dist
cp -r locales ../dist
cp -r templates ../dist
#cp -r modules/games/providers/pantaloo/configs ../dist/modules/games/providers/pantaloo
#cp -r modules/games/providers/outcomebet/ssl ../dist/modules/games/providers/outcomebet

cd ../