var gulp = require('gulp'),
    fs = require('fs'),
    template = require('gulp-template');

gulp.task('base-url', function() {
  var env = process.env.NODE_ENV || 'local',
      configFile = fs.existsSync('config.local.json')
        ? '../config.local.json'
        : '../config.json',
      config = require(configFile);

  return gulp.src('index.html')
    .pipe(template({ baseUrl: config[env].BaseHTML5.url }))
    .pipe(gulp.dest('dist'));
});
