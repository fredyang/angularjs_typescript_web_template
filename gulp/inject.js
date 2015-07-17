'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();
var _ = require('lodash');

var wiredep = require('wiredep').stream;

module.exports = function (options) {

  gulp.task('inject', ['scripts', 'styles'], function () {

    //inject application styles
    var applicationCss = gulp.src(
      [
        options.tmp + '/serve/app/**/*.css',
        '!' + options.tmp + '/serve/app/vendor.css'
      ],
      {
        read: false
      }
    );

    var typeScriptGeneratedJs = require('../' + options.tmp + '/sortOutput.json');

    //inject application script
    var applicationJs = gulp.src(
      [
        '{' + options.src + ',' + options.tmp + '/serve}/app/**/*.js',
        '!' + options.src + '/app/**/*.spec.js',
        '!' + options.tmp + '/serve/app/**/*.spec.js',
        '!' + options.src + '/app/**/*.mock.js',
        '!' + options.tmp + '/serve/app/**/*.mock.js'
      ],
      {
        read: false
      })
      //.pipe($.filelog())
    .pipe($.order(typeScriptGeneratedJs, {
        base: options.tmp + '/serve/app'
      }))
      //.pipe($.filelog());

    var injectOptions = {
      ignorePath: [options.src, options.tmp + '/serve'],
      addRootSlash: false
    };

    return gulp.src(options.src + '/*.html')
      // inject application styles <!-- inject:css -->
      .pipe($.inject(applicationCss, injectOptions))

      // inject application scripts <!-- inject:js -->
      .pipe($.inject(applicationJs, injectOptions))

      //inject dependencies code <!-- bower:js --> in index.html
      //// bower:scss in scss file
      // <!-- bower:css --> in index.html
      //
      /*options.wiredep: {
       directory: 'bower_components',
       exclude: [/bootstrap-sass-official\/.*\.js/, /bootstrap\.css/]
       }*/
      .pipe(wiredep(_.extend({}, options.wiredep)))


      .pipe(gulp.dest(options.tmp + '/serve'));

  });
};
