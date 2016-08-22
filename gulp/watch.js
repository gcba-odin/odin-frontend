var gulp = require('gulp');

gulp.task('watch', ['serve'], function() {
  gulp.watch([
      'index.html',
      'directives/**/*.html',
      'views/**/*.html',
      'css/**/*.css'
    ], ['reload']);
  gulp.watch([
    'js/**/*.js',
    'config.json'
    ], ['javascript', 'reload']);
});