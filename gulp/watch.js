var gulp = require('gulp');

gulp.task('watch', ['serve'], function () {
  gulp.watch([
    'index.html',
    'directives/**/*.html',
    'views/**/*.html',
    'js/**/*.js',
    'css/**/*.css'
  ], gulp.browserSync.reload);
});