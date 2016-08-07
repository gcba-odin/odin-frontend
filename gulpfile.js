var gulp = require('gulp'),
    ngConfig = require('gulp-ng-config'),
    browserSync = require('browser-sync').create();

gulp.task('ngConfig', function () {
  gulp.src('config.json')
  .pipe(ngConfig('odin.config', {
    environment: process.env.NODE_ENV || 'local'
  }))
  .pipe(gulp.dest('js'));
});

gulp.task('serve', ['ngConfig'], function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('watch', ['serve'], function () {
  gulp.watch([
    'index.html',
    'directives/**/*.html',
    'views/**/*.html',
    'js/**/*.js',
    'css/**/*.css'
  ], browserSync.reload);
});

gulp.task('default', ['watch']);
