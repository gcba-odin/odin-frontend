var gulp = require('gulp'),
    ngConfig = require('gulp-ng-config');

gulp.task('ng-config', function() {
  return gulp.src('config.json')
    .pipe(ngConfig('odin.config', {
      environment: process.env.NODE_ENV || 'local'
    }))
    .pipe(gulp.dest('js'));
});
