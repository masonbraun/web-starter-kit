var settings = {};

settings.vhost = "webstarterkit.dev";
settings.sass  = "app/scss/";

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
var browserify  = require('gulp-browserify');
var uglify      = require('gulp-uglify');
var jshint      = require('gulp-jshint');
var imagemin = require('gulp-imagemin');
var del = require('del');





// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        proxy: settings.vhost
    });

    gulp.watch(settings.sass + "*.scss", ['sass']);
    gulp.watch("app/js/*.js", ['js']);
    // gulp.watch("app/*.html").on('change', browserSync.reload);
    gulp.watch('app/*.html', ['files']);
    gulp.watch(['app/img/**/*'], ['images']);
});

//minify html
gulp.task('files', function() {
    gulp.src('app/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('images', function () {
    //need to clean this folder before doing this
    del([
        // here we use a globbing pattern to match everything inside the `mobile` folder
        'dist/img/**/*'
        // we don't want to clean this file though so we negate the pattern
    ])

    return gulp.src('app/img/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSync.stream());
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(settings.sass + "*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});


gulp.task('js', function(){
  gulp.src('app/js/main.js')
  .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
  .pipe(sourcemaps.init())
  .pipe(browserify())
  .pipe(uglify())
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('dist/js'))
  .pipe(browserSync.stream());
});


gulp.task('default', ['serve']);

gulp.task('scripts', ['js']);

gulp.task('styles', ['sass']);

gulp.task('html', ['files']);

gulp.task('compress', ['images']);