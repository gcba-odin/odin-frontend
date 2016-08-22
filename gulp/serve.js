var gulp = require('gulp'),
    historyApiFallback = require('connect-history-api-fallback');

gulp.task('serve', ['build'], function() {
  return gulp.browserSync.init({
    server: {
      baseDir: './'
    },
    middleware: [require("connect-logger")(), historyApiFallback()]
  });
});
