var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    util = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('lazy-loading', [
  'lazy-home',
  'lazy-dataset',
  'lazy-dataset-list',
  'lazy-contact',
  'lazy-layout',
  // 'lazy-dataset-request'
]);

gulp.task('lazy-home', function() {
  return gulp.src([
      'bower_components/owl.carousel/dist/owl.carousel.min.js',
      'plugins/ngtweet.min.js',
    ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(concat('lazy-home.min.js'))
      .pipe(ngAnnotate({
        add: true
      }))
      .pipe(uglify() )//: util.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

gulp.task('lazy-contact', function() {
  return gulp.src([
      // 'plugins/angular-recaptcha.min.js',
      'bower_components/ng-alertify/dist/ng-alertify.js',
    ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(concat('lazy-contact.min.js'))
      .pipe(ngAnnotate({
        add: true
      }))
      .pipe(uglify() )//: util.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

gulp.task('lazy-layout', function() {
  return gulp.src([
      'plugins/pdf/pdf.js',
      'plugins/pdf/pdf.worker.js',
      'plugins/pdf/pdf.compatibility.js',
      'node_modules/angular-pdf/dist/angular-pdf.min.js'
    ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(concat('lazy-layout.min.js'))
      .pipe(ngAnnotate({
        add: true
      }))
      .pipe(uglify() )//: util.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

gulp.task('lazy-dataset-list', function() {
  return gulp.src([
      // 'plugins/angular-recaptcha.min.js',
      'plugins/paging/paging.js',
      'bower_components/angular-read-more/dist/readmore.js',
    ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(concat('lazy-dataset-list.min.js'))
      .pipe(ngAnnotate({
        add: true
      }))
      .pipe(uglify() )//: util.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

gulp.task('lazy-dataset', function() {
  return gulp.src([
      // 'plugins/angular-recaptcha.min.js',
      'plugins/paging/paging.js',
      'plugins/leaflet/leaflet-src.js',
      'plugins/leaflet/angular-leaflet-directive.min.js',
      'bower_components/angular-read-more/dist/readmore.js',
      'plugins/angular-socialshare.min.js'
    ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(concat('lazy-dataset.min.js'))
      .pipe(ngAnnotate({
        add: true
      }))
      .pipe(uglify() )//: util.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});
