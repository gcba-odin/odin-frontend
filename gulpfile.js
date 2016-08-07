var gulp = require('gulp');
var ngConfig = require('gulp-ng-config');

gulp.task('ngConfig', function () {
  gulp.src('config.json')
  .pipe(ngConfig('odin.config', {
    environment: 'staging'
  }))
  .pipe(gulp.dest('js'));
});
