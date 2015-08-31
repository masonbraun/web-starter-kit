var settings = {};

settings.vhost = "webstarterkit.dev";
settings.root  = "app/";
settings.sass  = "app/css/src/";
settings.js    = "app/js/src/";
settings.img   = "app/img/src/";

var src = {
    sass: 'app/css/src/*.scss',
    css:  'app/css/',
    html: [
        '.app/*.html',
        '.app/*.php'
    ]
};

var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var reload       = browserSync.reload;
var del          = require('del');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var browserify   = require('gulp-browserify');
var uglify       = require('gulp-uglify');
var jshint       = require('gulp-jshint');
var imagemin     = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('serve', function() {

    browserSync.init({
        proxy: settings.vhost,
        open: false
    });

    gulp.watch(src.sass, ["sass"]);
    gulp.watch(src.html).on('change', reload);

    // gulp.watch(src.sass, ["sass"]);
    // gulp.watch(settings.js + "*.js", ["js"]);
    // gulp.watch(['app/img/**/*'], ['images']);
    // gulp.watch(["app/*.html, app/*.php"]).on('change', reload);
     // gulp.watch("app/*.html").on('change', browserSync.reload);

});

gulp.task('watch', function() {



    gulp.watch(src.sass, ["sass"]);
    // gulp.watch(settings.js + "*.js", ["js"]);
    // gulp.watch(['app/img/**/*'], ['images']);
    // gulp.watch(["app/*.html, app/*.php"]).on('change', reload);
     // gulp.watch("app/*.html").on('change', browserSync.reload);

});

gulp.task('sass', function() {
    return gulp.src(src.sass)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: true
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(src.css))
        .pipe(browserSync.stream());
});

gulp.task("js", function(){
    return gulp.src(settings.js + "main.js")
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(sourcemaps.init())
        .pipe(browserify())
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.stream());
});

//minify html
gulp.task('files', function() {
    return gulp.src('app/*.html')
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







gulp.task('default', ['serve']);
gulp.task('scripts', ['js']);
gulp.task('styles', ['sass']);
gulp.task('html', ['files']);
gulp.task('compress', ['images']);