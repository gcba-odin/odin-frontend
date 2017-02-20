var gulp = require('gulp'),
    lazypipe = require('lazypipe'),
    useref = require('gulp-useref'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    util = require('gulp-util'),
    rename = require('gulp-rename');

gulp.task('vendors', ['base-url'], function() {
    return gulp.src('dist/index.html')
    .pipe(useref({ searchPath: '.' },
      lazypipe().pipe(sourcemaps.init, { loadMaps: true }))
    )
    .pipe(gulpif('*.js', process.env.NODE_ENV ? uglify() : util.noop()))
    .pipe(gulpif('*.css', cleanCSS()))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});
