var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var less = require('gulp-less-sourcemap');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var babelify = require('babelify');
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var jsEntry = './src/js/main.js';

var dependencies = [
  'jquery',
  'react',
  'react-dom',
  'algoliasearch',
  'algoliasearch-helper'
]

// Static Server
gulp.task('serve', function() {
    browserSync.init({
        server: {
          baseDir: './'
        }
    });
});

// Watching scss/less/html files
gulp.task('watch', ['sass', 'js', 'serve'], function() {
    gulp.watch('./src/js/**/*.js', ['js']);
    gulp.watch("./src/scss/**/*.scss", ['sass']);
    // gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('js', function () {
    return browserify(jsEntry, {debug: true, extensions: ['es6']})
        .external(dependencies) // Specify all vendors as external source
        .transform(babelify, {presets: ["es2015", "react"]})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
          .pipe(uglify({mangle: false}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./build/'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('js-vendor', function () {

    var b = browserify({
        debug: true
    });

    dependencies.forEach(function(lib) {
        b.require(lib);
    });

    return b.bundle()
      .pipe(source('vendor.js'))
      .pipe(buffer())
      .pipe(uglify({mangle: false}))
      .pipe(gulp.dest('./build/'))
      .pipe(browserSync.stream({once: true}));

});

gulp.task('images', function(){
  return gulp.src('./src/images/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(gulp.dest('build/images'))
});

// gulp.task('html', function(){
//   return gulp.src('./src/index.html')
//     .pipe(gulp.dest('build'))
// })

// Compile SASS into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("./src/scss/**/*.scss")
    .pipe(sass({
      sourceComments: 'map',
      sourceMap: 'scss'
    }))
    .pipe(gulp.dest("./build/css"))
    // .pipe(browserSync.stream());
});


gulp.task('default', ['images','watch']);
gulp.task('server', ['serve']);
gulp.task('dev', ['watch']);
