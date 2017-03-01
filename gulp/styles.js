var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    util = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('styles', function () {
 return gulp.src('css/index.scss')
  .pipe(plumber())
  .pipe(sourcemaps.init())
    .pipe(sass.sync())
    //TODO: add autoprefixer
    .pipe(cleanCSS())
  .pipe(sourcemaps.write())
  .pipe(rename('bundle.min.css'))
  .pipe(gulp.dest('dist'))
  .pipe(gulp.browserSync.stream());
});
