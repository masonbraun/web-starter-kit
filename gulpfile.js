var config = {
    dirs: {
        src    : "./app/",
        images : "img",
        css    : "css",
        scss   : "scss",
        js     : "js"
    }
};

var gulp     = require('gulp');
var compass  = require('gulp-compass');
var watch    = require('gulp-watch');
var notify   = require("gulp-notify");
var imagemin = require("gulp-imagemin");
var clean    = require('gulp-clean');
var ignore   = require('gulp-ignore');
var cache    = require('gulp-cache');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('styles', function() {
    return gulp.src([config.dirs.src + 'scss/*.scss'])
        .pipe(compass({
            css   : config.dirs.src + 'css',
            sass  : config.dirs.src + 'scss',
            image : config.dirs.src + 'img'
        }))
        .pipe(gulp.dest(config.dirs.src + 'css'))
        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('watch', function() {
    gulp.watch([config.dirs.src + '*.scss', config.dirs.src + '**/*.scss'], ['styles']);
});