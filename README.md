# odin-frontend

ODIN Frontend

## Setup

- Install all dependencies: `npm install`
- Install gulp globaly: `npm install -g gulp`

> This assumes you already have Node.js installed.

## Build and Serve for Development

The default gulp task will generate the config module for Angular according to the environment, it will serve and watch the files.

- Local: `gulp`
- Staging: `NODE_ENV=staging gulp`

## Build for Deploy

To build the app for the different environments:

- Local: `gulp build`
- Staging: `NODE_ENV=staging gulp build`

> This task will generate and copy all necessary files to run the application under the `/dist` directory. This directory is ignored by git on purpose, since all it's files are regenerated on each build.

## Deploy

After build, serving the `/dist` directory is enough for deployment.

If you want to try on your local environment, execute a [Python SimpleHTTPServer](https://docs.python.org/2/library/simplehttpserver.html) on `\dist`.

> Have in mind that a new generated `index.html` is placed under `/dist` with the paths to the concatenated and minified files.
