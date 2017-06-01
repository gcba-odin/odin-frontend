var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    util = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    nano = require('gulp-cssnano');

gulp.task('styles', function () {
 return gulp.src('css/**/*.scss')
  .pipe(plumber())
  .pipe(sourcemaps.init())
    .pipe(sass())
    //TODO: add autoprefixer
    //.pipe(cleanCSS())
    // .pipe(purify([
    //   'js/**/*.js',
    //   'views/*.html',
    //   'directives/*.html',
    //   'index.html'
    // ]))
    // .pipe(cleanCSS())
  .pipe(sourcemaps.write())
  .pipe(rename('bundle.min.css'))
  // .pipe(uncss({
  //     html: [
  //       'index.html',
  //       'view/*.html',
  //       'directives/**/*.html',
  //       'js/**/*.js'
  //     ]
  // }))
  .pipe(nano())
  .pipe(gulp.dest('dist'))
  .pipe(gulp.browserSync.stream());
});
