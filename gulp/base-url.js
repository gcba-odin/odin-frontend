var gulp = require('gulp'),
    config = require('../config.json'),
    configLocal = require('../config.local.json'),
    template = require('gulp-template');

gulp.task('base-url', function() {
  var env = process.env.NODE_ENV || 'local';
  config = (configLocal ? configLocal : config);
  return gulp.src('index.html')
    .pipe(template({ baseUrl: config[env].BaseHTML5.url }))
    .pipe(gulp.dest('dist'));
});
