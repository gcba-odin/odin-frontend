var gulp = require('gulp');

gulp.task('watch', ['serve'], function() {
  // Static
  gulp.watch([
      'index.html',
      'directives/**/*.html',
      'views/**/*.html'
    ], gulp.browserSync.reload);

  // Javascript
  gulp.watch([
    'js/**/*.js',
    'config.json'
    ], ['javascript-watch']);

  // Style
  gulp.watch([
    'css/**/*.{css,scss}'
    ], ['styles']);
});

gulp.task('javascript-watch', ['javascript'], function (done) {
  gulp.browserSync.reload();
  done();
});
