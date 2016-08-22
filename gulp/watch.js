var gulp = require('gulp');

gulp.task('watch', ['serve'], function() {
  gulp.watch([
      'index.html',
      'directives/**/*.html',
      'views/**/*.html',
      'css/**/*.css'
    ], gulp.browserSync.reload);
  gulp.watch([
    'js/**/*.js',
    'config.json'
    ], ['js-watch']);
});

gulp.task('js-watch', ['javascript'], function (done) {
  gulp.browserSync.reload();
  done();
});
