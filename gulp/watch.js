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
    ], ['styles-watch']);
});

gulp.task('javascript-watch', ['javascript'], function (done) {
  gulp.browserSync.reload();
  done();
});

gulp.task('styles-watch', ['styles'], function (done) {
  gulp.browserSync.reload();
  done();
});
