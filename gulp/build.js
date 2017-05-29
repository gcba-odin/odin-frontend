var gulp = require('gulp');

gulp.task('build', [
  'clean',
  'vendors',
  'bundle-general',
  'bundles',
  'lazy-loading',
  'styles',
  'static',
  'leaflet',
  'pdf-build',
  'custom-defaults'
]);
