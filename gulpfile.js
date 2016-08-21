require('require-dir')('./gulp');

var gulp = require('gulp');

gulp.browserSync = require('browser-sync').create();

gulp.task('default', ['watch']);
