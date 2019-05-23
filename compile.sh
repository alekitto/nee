#!/bin/bash

pushd lib
NODE_ENV=dist ../node_modules/.bin/babel event-emitter.js -d ../dist -s true
NODE_ENV=dist ../node_modules/.bin/babel emitters.js -d ../dist -s true
NODE_ENV=dist ../node_modules/.bin/babel utils.js -d ../dist -s true
popd
