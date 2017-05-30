var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    util = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('bundle-general', ['ng-config', 'ng-version', 'pdf-build'], function() {
  return gulp.src([
    'js/*.js',
    'js/services/*.js',
    'js/controllers/searchDatasetsController.js',
    'js/directives/main/*.js',
  ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(concat('bundle-general.min.js'))
      .pipe(ngAnnotate({
        add: true
      }))
      .pipe(uglify() )//: util.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});
