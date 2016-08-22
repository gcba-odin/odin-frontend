var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('javascript', ['ng-config'], function() {
  return gulp.src('./js/**/*.js')
    .pipe(sourcemaps.init())
      .pipe(concat('bundle.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'));
});
