var gulp = require('gulp');

gulp.task('build', [
  'vendors',
  'javascript',
  'styles'
]);
