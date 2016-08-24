var gulp = require('gulp'),
    lazypipe = require('lazypipe'),
    useref = require('gulp-useref'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename');

gulp.task('vendors', ['base-url'], function() {
  return gulp.src('dist/index.html')
    .pipe(useref({ searchPath: '.' },
      lazypipe().pipe(sourcemaps.init, { loadMaps: true }))
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});
