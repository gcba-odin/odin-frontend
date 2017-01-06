var gulp = require('gulp');
gulp.task('leaflet', function() {
  return gulp.src('plugins/leaflet/images/**')
    .pipe(gulp.dest('dist/images/leaflet'));
});
