const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')
const prefix = require('gulp-autoprefixer')
const plumber = require('gulp-plumber')
const reload = browserSync.reload

gulp.task('browser-sync', function () {
  browserSync.init({
    notify: false,
    server: {
      baseDir: './'
    },
    port: 3010
  })
  gulp.watch('./*.html', ['html'])
  gulp.watch('./scss/**/*.scss', ['css'])
  gulp.watch('./js/**/*.js', reload)
})

gulp.task('css', () => {
  return gulp.src('./scss/main.scss')
  .pipe(plumber([{ errorHandler: false }]))
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(prefix())
  .pipe(gulp.dest('./assets/css'))
  .pipe(browserSync.stream())
})

gulp.task('html', (done) => {
  browserSync.reload()
  done()
})

gulp.task('default', ['browser-sync', 'html', 'css'])
