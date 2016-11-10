var gulp = require('gulp'),
    templateCache = require('gulp-angular-templatecache');

//TODO: disabled until we update project structure
gulp.task('templates', function() {
  return gulp.src(['views/**/*.html', 'directives/**/*.html'], { base: '.' })
    .pipe(templateCache({ module: 'odin' }))
    .pipe(gulp.dest('js'));
});
