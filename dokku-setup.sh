#!/usr/bin/env bash

dokku config:set wallet-scanner BUILDPACK_URL='https://github.com/heroku/heroku-buildpack-nodejs'
dokku config:set wallet-scanner CUSTOM_VARIABLE='Hello-World'
