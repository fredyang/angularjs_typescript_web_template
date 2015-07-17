'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

function isOnlyChange(event) {
  return event.type === 'changed';
}

module.exports = function (options) {
  gulp.task('watch', ['inject'], function () {

    //watch root html and bower.json files
    gulp.watch([options.src + '/*.html', 'bower.json'], ['inject']);

    //watch css/scss files
    gulp.watch([
        options.src + '/app/**/*.css',
        options.src + '/app/**/*.scss'
      ],
      function (event) {
        if (isOnlyChange(event)) {
          gulp.start('styles');
        } else {
          gulp.start('inject');
        }
      });

    //watch script files
    gulp.watch([
        options.src + '/app/**/*.js',
        options.src + '/app/**/*.ts'
      ],
      function (event) {
        if (isOnlyChange(event)) {
          //compile script only
          gulp.start('scripts');
        } else {
          //change root html file and compile
          gulp.start('inject');
        }

        gulp.start('test');
      });

    //watch template files
    gulp.watch(options.src + '/app/**/*.html', function (event) {
      browserSync.reload(event.path);
    });
  });
};
