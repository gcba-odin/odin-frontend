require('require-dir')('./gulp');

var gulp = require('gulp');

gulp.paths = {
  static: [
    'fonts/**/*',
    'images/**/*',
    'directives/**/*.html',
    'views/**/*.html',
    '*.{svg,png,xml,ico}',
    'manifest.json'
  ]
};

gulp.browserSync = require('browser-sync').create();

gulp.task('default', ['watch']);
