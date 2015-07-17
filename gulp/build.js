'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

module.exports = function(options) {

  gulp.task('index.html', ['inject', 'compilePartials'], function () {

    var partialsInjectFile = gulp.src(
      options.tmp + '/partials/templateCacheHtml.js', {
        read: false
      });


    var partialsInjectOptions = {
      starttag: '<!-- inject:partials -->',
      ignorePath: options.tmp + '/partials',
      addRootSlash: false
    };

    var htmlFilter = $.filter('*.html');
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');
    var assets;

    //only process the root html files, index.html is one of them
    return gulp.src(options.tmp + '/serve/*.html')
      //inject partials
      .pipe($.inject(partialsInjectFile, partialsInjectOptions))

      //assets
      /*Parse build blocks in HTML files to replace references to
      non-optimized scripts or stylesheets with useref*/

      //extract the files inside the build blocks, these files are called assets
      .pipe(assets = $.useref.assets())
      .pipe($.rev()) //rename the files but not changing the contents

      //js processing only, using ng annotate
      .pipe(jsFilter)
      .pipe($.ngAnnotate())
      .pipe($.uglify({ preserveComments: $.uglifySaveLicense }))
      .on('error', options.errorHandler('Uglify'))
      .pipe(jsFilter.restore())

      //css processing only
      .pipe(cssFilter)
      .pipe($.replace('../../bower_components/bootstrap-sass-official/assets/fonts/bootstrap/', '../fonts/'))
      .pipe($.csso())
      .pipe(cssFilter.restore())


      //Brings back the previously filtered out HTML files.
      // also include js file and css files
      .pipe(assets.restore())

      //now the assets reference inside index.html will refer to the unrev file names
      .pipe($.useref())
      .pipe($.revReplace())

      //minify root html files
      .pipe(htmlFilter)
      .pipe($.minifyHtml({
        empty: true,
        spare: true,
        quotes: true,
        conditionals: true
      }))
      .pipe(htmlFilter.restore())


      //copy all files to destination folder
      .pipe(gulp.dest(options.dist + '/'))
      .pipe($.size({ title: options.dist + '/', showFiles: true }));
  });

  // Only applies for fonts from bower dependencies
  // Custom fonts are handled by the "other" task
  gulp.task('copyFonts', function () {
    return gulp.src($.mainBowerFiles())
      .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
      .pipe($.flatten())
      .pipe(gulp.dest(options.dist + '/fonts/'));
  });

  gulp.task('copyOthers', function () {
    return gulp.src([
      options.src + '/**/*',
      '!' + options.src + '/**/*.{html,css,js,scss,ts}'
    ])
      .pipe(gulp.dest(options.dist + '/'));
  });

  gulp.task('clean', ['tsd:purge'], function (done) {
    $.del([options.dist + '/', options.tmp + '/'], done);
  });

  gulp.task('build', ['index.html', 'copyFonts', 'copyOthers']);
};
