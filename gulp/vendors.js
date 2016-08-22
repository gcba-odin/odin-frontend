var gulp = require('gulp'),
    useref = require('gulp-useref'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename');

gulp.task('vendors', function() {
  return gulp.src('index.html')
    .pipe(useref({}, lazypipe().pipe(sourcemaps.init, { loadMaps: true })))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'));
});
