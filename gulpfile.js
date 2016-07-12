// native dependencies
const proc = require('child_process')

// third-party dependencies
const gulp = require('gulp');
const electron = require('electron-prebuilt');

// browserify
const browserify = require('browserify');
const source     = require('vinyl-source-stream');
const buffer     = require('vinyl-buffer');

gulp.task('demo', () => {
  // spawn electron 
  var child = proc.spawn(electron, ['demo/main.js']);
});

gulp.task('javascript', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: 'lib/index.js',
    debug: true,

    // standalone global object for main module
    standalone: 'HabUIInspector',
  });

  return b.bundle()
    .pipe(source('hab-ui-inspector.js'))
    .pipe(buffer())
    .pipe(gulp.dest('dist'));
});

gulp.task('develop', ['javascript'], function () {

  gulp.watch('lib/**/*.js', ['javascript']);

});
