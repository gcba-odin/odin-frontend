var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    util = require('gulp-util'),
    order = require("gulp-order"),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('bundles', [
  'bundle-home',
  'bundle-dataset',
  'bundle-dataset-list',
  'bundle-contact',
  'bundle-layout',
  'bundle-dataset-request'
]);

gulp.task('bundle-home', function() {
  return gulp.src([
      'js/controllers/home/*.js',
      'js/controllers/cacheController.js',
      'js/directives/home/*.js',
      'js/directives/dataset-list/datasetFiletypesDirective.js',
    ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(concat('bundle-home.min.js'))
      .pipe(ngAnnotate({
        add: true
      }))
      .pipe(uglify() )//: util.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

gulp.task('bundle-dataset', function() {
  return gulp.src([
      'js/controllers/dataset/*.js',
      'js/controllers/dataset-general/*.js',
      'js/controllers/cacheController.js',
      'js/directives/dataset-general/*.js',
      'js/directives/dataset/*.js',
      'js/directives/disqusDirectives.js',
    ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(concat('bundle-dataset.min.js'))
      .pipe(ngAnnotate({
        add: true
      }))
      .pipe(uglify() )//: util.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

gulp.task('bundle-dataset-list', function() {
  return gulp.src([
      'js/controllers/dataset-list/*.js',
      'js/controllers/dataset-general/*.js',
      'js/controllers/cacheController.js',
      'js/directives/dataset-general/*.js',
      'js/directives/dataset-list/*.js',
    ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(concat('bundle-dataset-list.min.js'))
      .pipe(ngAnnotate({
        add: true
      }))
      .pipe(uglify() )//: util.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

gulp.task('bundle-contact', function() {
  return gulp.src([
      'js/controllers/contactController.js',
    ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(concat('bundle-contact.min.js'))
      .pipe(ngAnnotate({
        add: true
      }))
      .pipe(uglify() )//: util.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

gulp.task('bundle-layout', function() {
  return gulp.src([
      'js/controllers/layoutController.js',
    ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(concat('bundle-layout.min.js'))
      .pipe(ngAnnotate({
        add: true
      }))
      .pipe(uglify() )//: util.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

gulp.task('bundle-dataset-request', function() {
  return gulp.src([
      'js/controllers/datasetRequestController.js',
    ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(concat('bundle-dataset-request.min.js'))
      .pipe(ngAnnotate({
        add: true
      }))
      .pipe(uglify() )//: util.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});
