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
      'js/controllers/homeController.js',
      'js/directives/home/categoriesGridDirective.js',
      'js/controllers/categoryController.js',
      'js/directives/home/latestDatasetsDirective.js',
      'js/controllers/datasetLatestController.js',
      'js/directives/home/starredDatasetsDirective.js',
      'js/controllers/datasetStarredController.js',
      'js/directives/home/popularDatasetsDirective.js',
      'js/controllers/datasetPopularController.js',
      'js/directives/home/socialNetworksDirective.js',
      // 'js/controllers/datasetLatestController.js',
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
      'js/controllers/datasetController.js',
      'js/controllers/datasetFilters/orderingsController.js',
      'js/controllers/categoryController.js',
      'js/directives/home/categoriesRowDirective.js',
      'js/directives/main/categoriesSidebarDirective.js',
      'js/directives/main/filtersMenu.js',
      'js/directives/main/datasetDirectives.js',
      'js/directives/dataset/resultResoucesDirective.js',
      'js/directives/datasets/datasetCategoriesDirective.js',
      'js/directives/datasets/orderResultDirective.js',
      'js/directives/datasets/datasetSvgFiletypesDirective.js',
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
      'js/controllers/datasetListController.js',
      'js/controllers/datasetFilters/orderingsController.js',
      'js/controllers/datasetFilters/tagsController.js',
      'js/controllers/datasetFilters/filetypesController.js',
      'js/controllers/datasetFilters/organizationsController.js',
      'js/controllers/categoryController.js',
      'js/directives/home/categoriesRowDirective.js',
      'js/directives/main/categoriesSidebarDirective.js',
      'js/directives/main/filtersMenu.js',
      'js/directives/datasets/orderResultDirective.js',
      'js/directives/datasets/tagsResultDirective.js',
      'js/directives/datasets/formatResultDirective.js',
      'js/directives/datasets/organizationResultDirective.js',
      'js/directives/datasets/resultDatasetsDirective.js',
      'js/directives/datasets/datasetCategoriesDirective.js',
      'js/directives/datasets/datasetFiletypesDirective.js',

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
