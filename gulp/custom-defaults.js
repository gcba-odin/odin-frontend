var gulp = require('gulp'),
    fs = require('fs'),
    rename = require('gulp-rename'),
    ngConfig = require('gulp-ng-config');

gulp.task('custom-defaults', function() {
  var customFile = 'customdefaults.json';
  return gulp.src(customFile)
    .pipe(ngConfig('odin.customdefaults'))
    .pipe(rename('customdefaults.js'))
    .pipe(gulp.dest('js'));
});
