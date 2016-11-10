# Contributing

General guide for contributing to odin-frontend.

## Scripts

Create new script files under `/js` for each component you are implementing (Controller, Service, Directive, Filter, etc.).

Register the component using the Angular module that better fits the functional scope of the component.

## Styles (SASS)

Create new SASS style files under `/css` prepending `_` to its name and appending `.scss` extension. For example: `/css/_new-sass-file.scss`.

Then import the file in `index.scss` like `@import 'new-sass-file';` (when importing you need to get rid of `_` and `.scss`).

> TODO: Rename `/css` to `/sass`.

## Environment specific configuration

Edit `config.json` to add new environment specific configurations. The values will be accessible in Angular as constants.

Each key in the JSON represents an environment that can be used to build the application.

For example, if you add a `production` key then you'll be able to build with: `NODE_ENV=production gulp build`.

## Vendor Scripts

You can install a vendor script (i.e. angular component, jquery plugin, your awesome favorite library, etc.) one of two ways:

- Download manually the scripts and place under `/plugins`.
- Through npm by executing `npm install --save`.

Then you need to add the dependency as a script tag in `index.html` between the section commented as `<!-- build:js vendors.min.js -->` and `<!-- endbuild -->`.

The process build will automatically pull the files between this section and create a unified file.

> TODO: Rename `/plugins` to `/vendors`.

## Vendor Styles

Same as [Vendor Scripts](#vendor-scripts) but adding the dependency as a link tag in the head of `index.html` between the section commented as `<!-- build:css vendors.min.css -->` and `<!-- endbuild -->`.

> TODO: Another way of adding third party styles is to place the file under `/css` and load it in the `index.scss`.

## Gulp Tasks

Create new gulp tasks in its own file under `/gulp`.

## Code Style

Imitate the coding conventions you see throughout the project :)
