var gulp = require('gulp');

gulp.task('reload', function() {
  return gulp.browserSync.reload;
});