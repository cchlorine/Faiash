var gulp = require('gulp'),
    concat = require('gulp-concat');
    jshint = require('gulp-jshint');
    uglify = require('gulp-uglify');
    rename = require('gulp-rename');
    amdOptimize = require("amd-optimize");
    watch = require('gulp-watch');

gulp.task('lint', function () {
    gulp.src('./src/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('rjs', function () {
    gulp.src([
            './src/intro.js',
            './src/core.js',
            './src/**/*.js',
            './src/outro.js'
        ])
        .pipe(concat('faiash.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('faiash.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    gulp.watch('./src/**.js', ['lint', 'rjs']);
});

gulp.task('default', function() {
    gulp.start('lint', 'rjs');
});
