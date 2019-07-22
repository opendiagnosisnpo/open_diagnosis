'use strict'
var gulp = require('gulp')
var sass = require('gulp-sass')
var open = require('gulp-open')
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var browserSync = require('browser-sync').create()
var image = require('gulp-image')
var del = require('del')

// Copy third party libraries from /node_modules into / production
// gulp.task('production', function () {
//   gulp.src([
//     './node_modules/bootstrap/dist/**/*',
//     '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
//     '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
//   ]).pipe(gulp.dest('./production/bootstrap'))
// })

gulp.task('css:compile', (done) => {
  gulp.src('./assets/scss/**/*.scss')
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'))
  done()
})

// Minify CSS
gulp.task('css:minify', (done) => {
  gulp.src([
    './assets/css/*.css',
    '!./assets/css/*.min.css'
  ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./assets/css'))
  done()
})

gulp.task('css', gulp.series(['css:compile', 'css:minify']))

gulp.task('image', (done) => {
  gulp.src('./assets/img/*')
    .pipe(image())
    .pipe(gulp.dest('./production/assets/img'))
  done()
})

gulp.task('open', (done) => {
  gulp.src('index.html')
    .pipe(open())
  done()
})

// Configure the browserSync task
gulp.task('browserSync', (done) => {
  var paths = ['./', './**/**.html', './assets/scss/**/**', './assets/js/*.js']

  browserSync.init(paths, {
    server: {
      baseDir: './'
    }
  })

  done()
})



gulp.task('dev', gulp.parallel(['browserSync', 'css', 'open']), (done) => {
  gulp.watch('./assets/scss/**/*.sccs', ['compile-scss'])
  gulp.watch('./assets/js/*.js', ['js'])
  gulp.watch('./*.html', browserSync.reload)
  done()
})

gulp.task('clean', (done) => {
  del.sync(['production/**'])
  done()
})

// Copies assets needed for production into production folder
gulp.task('copy', (done) => {
  gulp.src('./assets/fonts/*').pipe(gulp.dest('./production/assets/fonts/'))
  gulp.src('./assets/js/**/*.js').pipe(gulp.dest('./production/assets/js/'))
  gulp.src('./assets/css/**/*.css').pipe(gulp.dest('./production/assets/css/'))
  gulp.src('./index.html').pipe(gulp.dest('./production/'))
  gulp.src('./*.html').pipe(gulp.dest('./production/'))
  done()
})

gulp.task('production', gulp.series(['clean', 'css', 'image', 'copy']))