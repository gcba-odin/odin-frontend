# odin-frontend

ODIN Frontend

## Setup

- Install all dependencies: `npm install`
- Install gulp globaly: `npm install -g gulp`

## Build and Serve

The default gulp task will generate the config module for Angular according to the environment, it will serve and watch the files.

- Local: `gulp`
- Staging: `NODE_ENV=staging gulp`

## Build only

To build the app for the different environments:

- Local: `gulp build`
- Staging: `NODE_ENV=staging gulp build`
