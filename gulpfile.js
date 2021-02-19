const gulp = require('gulp');
const sass = require('gulp-sass');
const htmlPartial = require('gulp-html-partial');
const browserSync = require('browser-sync').create();

function html() {
    return gulp.src('src/*.html')
        .pipe(htmlPartial({
            basePath: 'src/partials/'
        }))
        .pipe(gulp.dest('build'));
}
gulp.task(html);

function style() {
    return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('build/asset/css'))
    .pipe(browserSync.reload({
        stream: true
    }))
}
gulp.task(style);

function watch() {
    browserSync.init({
        server: {
            baseDir: "build",
        }
    });
    gulp.watch('src/scss/*.scss', style);
    gulp.watch('src/partials/*.html').on('change',gulp.series(html, browserSync.reload));
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}
gulp.task(watch);

gulp.task('start', gulp.series(html, style, watch));
