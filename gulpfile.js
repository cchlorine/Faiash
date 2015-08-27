var gulp = require('gulp'),
    del  = require('del'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    watch  = require('gulp-watch'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('clean', function() {
    del('dist/*');
});

gulp.task('lint', function() {
    gulp.src('./src/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('build', function() {
    gulp.src([
            './src/faiash.js',
            './src/**/*.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('faiash.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('faiash.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch('./src/**.js', ['clean', 'lint', 'build']);
});

gulp.task('default', ['clean'], function() {
    gulp.start('lint', 'build');
});
