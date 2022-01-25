'use strict'
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cleanCss = require('gulp-clean-css'),
    flatmap = require('gulp-flatmap'),
    html = require('gulp-htmlmin');


gulp.task('sass', function(done) {
    gulp.src('./scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
    done();
});

gulp.task('sass:watch', function() {
    gulp.watch('./scss/*.scss', gulp.series('sass'));
});

gulp.task('browser-sync', function() {
    var files = ['./*.html', './scss/*.scss', './images/**/*.{png,gif,jpg,jpeg}', './js/*.js'];
    browserSync.init(files, {
        server: {
            baseDir: './'
        }
    });
});

gulp.task('clean', function() {
    return del(['dist']);
});


gulp.task('copyfonts', function() {
    gulp.src('./node_modules/open-iconic/font/fonts/*.{ttf,woff,eof,svg,eot,otf}*')
        .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('imagemin', function() {
    return gulp.src('./images/**/*.{png,gif,jpg,jpeg}')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('usemin', function() {
    return gulp.src('./*html')
        .pipe(flatmap(function(stream, file) {
            return stream
                .pipe(usemin({
                    css: [rev()],
                    html: [function() { return htmlmin({ collapseWhitespace: true }) }],
                    js: [uglify(), rev()],
                    inlinejs: [uglify()],
                    inlinecss: [cleanCss(), 'concat']
                }));
        }))
        .pipe(gulp.dest('dist/'))
});

gulp.task('default', gulp.parallel('browser-sync', 'sass:watch'));
gulp.task('build', gulp.parallel('clean', 'copyfonts', 'imagemin', 'usemin'));