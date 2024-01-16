'use strict';

var gulp = require('gulp'),
    gp = require('gulp-load-plugins')(),
    browserSync = require('browser-sync').create();

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});

gulp.task('pug', function() {
    return gulp.src(['app/pug/*.pug', '!app/pug/_*.pug'])
        .pipe(gp.pug({
            pretty:true
        }))
        .pipe(gulp.dest('dist'))
        .on('end', browserSync.reload);
});

gulp.task('stylus', function() {
    return gulp.src('app/styl/*.styl')
        .pipe(gp.sourcemaps.init())
        .pipe(gp.stylus({linenos: true}))
        //.pipe(gp.autoprefixer({browsers: ['last 2 versions']}))
        .on('error', gp.notify.onError({title: 'style'}))
        .pipe(gp.csso())
        .pipe(gp.sourcemaps.write())
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.reload({
            stream:true
        }));
});

gulp.task('watch', function () {
    gulp.watch('app/pug/*.pug', gulp.series('pug'))
    gulp.watch('app/styl/*.styl', gulp.series('stylus'))
});

gulp.task('default', gulp.series(
    gulp.parallel('pug', 'stylus'),
    gulp.parallel('watch', 'serve')
));