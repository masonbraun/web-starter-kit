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

// delete the dist directory
gulp.task('clean', function() {
    return gulp.src(['./dist'], {read: false})
    .pipe(clean());
});

//copy wordpress into dist directory exluding the wp-content folder
gulp.task('copy-wp', ['clean'], function() {
    return gulp.src(["./src/wp/**", "!./src/wp/{wp-content,wp-content/**}"])
    .pipe(gulp.dest("./dist"));
});

//copy wp-content directory
gulp.task('copy-content', ['copy-wp'], function() {
    return gulp.src(["./src/wp-content/**"])
    .pipe(gulp.dest("./dist/wp-content"));
});

//copy wp-config file
gulp.task('copy-config', ['copy-content'], function() {
    return gulp.src(["./src/wp-config.php"])
    .pipe(gulp.dest("./dist"));
});

//minify images and replace in dist folder
gulp.task('images', function() {
    return gulp.src([config.dirs.src + 'img/**'])
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('./dist/wp-content/themes/masonbraun/img'))
        .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('watch', function() {
    gulp.watch([config.dirs.src + '*.scss', config.dirs.src + '**/*.scss'], ['styles']);
});