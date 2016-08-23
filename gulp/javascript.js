var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('javascript', ['ng-config'], function() {
  return gulp.src('./js/**/*.js')
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(concat('bundle.min.js'))
      .pipe(ngAnnotate({
        add: true
      }))
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'));
});
