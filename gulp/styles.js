var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('styles', function () {
 return gulp.src('./css/index.scss')
  .pipe(plumber())
  .pipe(sourcemaps.init())
    .pipe(sass())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./dist'));
});
