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


var jsEntry = './src/js/main.js';

// Static Server
gulp.task('serve', function() {
    browserSync.init({
        server: {
          baseDir: './'
        }
    });
});

// Watching scss/less/html files
gulp.task('watch', ['serve', 'sass', 'js', 'js-vendor'], function() {
    gulp.watch('./src/**/*.js', ['js']);
    gulp.watch("./src/scss/**/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('js', function () {
    return browserify(jsEntry, {debug: true, extensions: ['es6']})
        .transform(babelify, {presets: ["es2015", "react"]})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('js-vendor', function () {
    return gulp.src("./src/vendor/**/*.js")
      .pipe(concat('vendor.js'))
      .pipe(gulp.dest("./build/"));
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
    .pipe(browserSync.stream());
});

// Compile LESS into CSS & auto-inject into browsers
// gulp.task('less', function() {
//   return gulp.src("assets/less/*.less")
//     .pipe(less({
//       sourceMap: {
//         sourceMapRootpath: './assets/less' // Optional absolute or relative path to your LESS files
//       }
//     }))
//     .pipe(gulp.dest("assets/css"))
//     .pipe(browserSync.stream());
// });


gulp.task('default', ['watch']);
gulp.task('server', ['serve']);
gulp.task('dev', ['watch']);
