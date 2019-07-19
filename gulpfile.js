'use strict';
var gulp = require('gulp');
var path = require('path');
var sass = require('gulp-sass');
var open = require('gulp-open');
var browserSync = require('browser-sync').create();
var image = require('gulp-image');

var Paths = {
  HERE: './',
  CSS: './production/assets/css/',
  SCSS_TOOLKIT_SOURCES: './assets/scss/now-ui-kit.scss',
  SCSS: './production/assets/scss/**/**'
};

// Copy third party libraries from /node_modules into / production
// gulp.task('production', function () {
//   gulp.src([
//     './node_modules/bootstrap/dist/**/*',
//     '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
//     '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
//   ]).pipe(gulp.dest('./production/bootstrap'))
// });

gulp.task('compile-scss', () => {
  return gulp.src('./assets/scss/**/*.scss')
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest(Paths.CSS))
});

gulp.task('image', () => {
  gulp.src('./assets/img/*')
    .pipe(image())
    .pipe(gulp.dest('./production/assets/img'));
});

gulp.task('open', () => {
  gulp.src('index.html')
    .pipe(open());
});

// Configure the browserSync task
gulp.task('browserSync', function () {
  var pathArray = Object.keys(Paths).map(function (path) {
    return Paths[path];
  });

  browserSync.init(pathArray, {
    server: {
      baseDir: './'
    }
  });
});



gulp.task('dev', gulp.parallel(['browserSync', 'compile-scss', 'open']), () => {
  gulp.watch('./assets/scss/**/*.sccs', ['compile-scss']);
  gulp.watch('./assets/js/*.js', ['js']);
  gulp.watch('./*.html', browserSync.reload);
});

// Copies assets needed for production into production folder
gulp.task('copy', () => {
  gulp.src('./index.html').pipe(gulp.dest('./production/'));
  gulp.src('./assets/fonts/*').pipe(gulp.dest('./production/assets/fonts/'));
  gulp.src('./nucleo-icons.html').pipe(gulp.dest('./production/'));
  gulp.src('./coming-soon.html').pipe(gulp.dest('./production/'));
});

gulp.task('production', gulp.series(['compile-scss', 'image', 'copy']));