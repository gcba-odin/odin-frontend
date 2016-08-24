var gulp = require('gulp'),
    config = require('../config.json'),
    template = require('gulp-template');

gulp.task('base-url', function() {
  var env = process.env.NODE_ENV || 'local';
  return gulp.src('index.html')
    .pipe(template({ baseUrl: config[env].BaseHTML5.url }))
    .pipe(gulp.dest('dist'));
});
