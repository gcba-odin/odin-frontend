var gulp = require('gulp');
var ngConfig = require('gulp-ng-config');

gulp.task('ngConfig', function () {
  gulp.src('config.json')
  .pipe(ngConfig('odin.config', {
    environment: process.env.NODE_ENV || 'local'
  }))
  .pipe(gulp.dest('js'));
});
