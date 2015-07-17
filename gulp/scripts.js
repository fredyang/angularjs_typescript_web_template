'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var mkdirp = require('mkdirp');

var $ = require('gulp-load-plugins')();

module.exports = function (options) {
  //the script tasks is to generate javascript from typescript
  //you need to install tsd first
  gulp.task('scripts', ['tsd:install'], function () {

    mkdirp.sync(options.tmp);

    var nonSpecFiles = $.filter(['**/*', '!**/*.spec.js']);

    //just install ts file in the app folder
    //we should have more control in the order of the files
    return gulp.src([
      options.src + '/app/**/*.module.ts',
      options.src + '/app/**/*.ts'
    ])
      .pipe($.sourcemaps.init())
      .pipe($.tslint())
      .pipe($.tslint.report('prose', {emitError: false}))
      .pipe($.typescript({sortOutput: true})).on('error', options.errorHandler('TypeScript'))
      .pipe($.sourcemaps.write())
      .pipe(nonSpecFiles)
      //.pipe($.filelog())
      .pipe(
      //pipe to file name into json files and use relative names
      $.toJson({
        filename: options.tmp + '/sortOutput.json',
        relative: true
      })
    )
      .pipe(nonSpecFiles.restore())
      .pipe(gulp.dest(options.tmp + '/serve/app'))
      .pipe(browserSync.reload({stream: true}))
      .pipe($.size());
  });
};
