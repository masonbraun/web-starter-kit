var settings = {};

settings.vhost = "webstarterkit.dev";
settings.sass  = "app/scss/";

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
var browserify  = require('gulp-browserify');
var uglify = require('gulp-uglify');



// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        proxy: settings.vhost
    });

    gulp.watch(settings.sass + "*.scss", ['sass']);
    gulp.watch("app/js/*.js", ['js']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(settings.sass + "*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('../css'))
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});


gulp.task('js', function(){
  gulp.src('app/js/main.js')
  .pipe(sourcemaps.init())
  .pipe(browserify())

  .pipe(uglify())
  .pipe(sourcemaps.write('../js/build'))
  .pipe(gulp.dest('app/js/build'))
  // .pipe(browserSync.stream());
});


gulp.task('default', ['serve']);

gulp.task('scripts', ['js']);