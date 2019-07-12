var gulp = require('gulp');
var path = require('path');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var open = require('gulp-open');
var browserSync = require('browser-sync').create();

var Paths = {
  HERE: './',
  DIST: 'dist/',
  CSS: './assets/css/',
  SCSS_TOOLKIT_SOURCES: './assets/scss/now-ui-kit.scss',
  SCSS: './assets/scss/**/**'
};

gulp.task('compile-scss', function () {
  return gulp.src(Paths.SCSS_TOOLKIT_SOURCES)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write(Paths.HERE))
    .pipe(gulp.dest(Paths.CSS));
});

gulp.task('watch', function () {
  gulp.watch(Paths.SCSS, ['compile-scss']);
});

gulp.task('open', function () {
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

gulp.task('dev', ['open', 'watch', 'browserSync']);