var gulp = require('gulp');

gulp.task('reload', ['javascript'], function() {
  return gulp.browserSync.reload;
});