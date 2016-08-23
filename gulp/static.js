var gulp = require('gulp');

gulp.task('static', function() {
  return gulp.src([
      'fonts/**/*',
      'images/**/*',
      'directives/**/*.html',
      'views/**/*.html',
      '*.{svg,png,xml}',
      'manifest.json'
    ], { base: '.' })
    .pipe(gulp.dest('./dist'));
});
