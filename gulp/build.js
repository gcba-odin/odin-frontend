var gulp = require('gulp');

gulp.task('build', [
  'clean',
  'vendors',
  'javascript',
  'styles',
  'static',
  'leaflet'
]);
