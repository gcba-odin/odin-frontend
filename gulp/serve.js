var gulp = require('gulp'),
    connectLogger = require('connect-logger'),
    connectHistoryApiFallback = require('connect-history-api-fallback');

gulp.task('serve', ['build'], function() {
  return gulp.browserSync.init({
    server: {
      baseDir: './dist'
    },
    middleware: [connectLogger(), connectHistoryApiFallback()]
  });
});
