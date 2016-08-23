var gulp = require('gulp');

gulp.task('static', function() {
  return gulp.src([
      'fonts/**/*',
      'images/**/*',
      'directives/**/*.html',
      'views/**/*.html'
    ], { base: '.' })
    .pipe(gulp.dest('./dist'));
});
