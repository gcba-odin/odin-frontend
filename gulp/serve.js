var gulp = require('gulp'),
    historyApiFallback = require('connect-history-api-fallback');

gulp.task('serve', ['build'], function() {
  gulp.browserSync.init({
    server: {
      baseDir: './'
    },
    middleware: [require("connect-logger")(), historyApiFallback()]
  });
});
