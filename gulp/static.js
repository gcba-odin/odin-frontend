var gulp = require('gulp');

gulp.task('static', function() {
  return gulp.src(gulp.paths.static, { base: '.' })
    .pipe(gulp.dest('dist'));
});
