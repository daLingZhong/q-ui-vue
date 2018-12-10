'use strict';

var gulp = require("gulp")
var sass = require("gulp-sass")
var del = require('del')
var cssmin = require('gulp-cssmin')
var concat = require('gulp-concat')
var mincss = require('gulp-clean-css')

gulp.task("compile", function(){
  gulp.src(['./src/*.scss'])
    .pipe(sass())
    // .pipe(autoprefixer("last 3 version","safari 5", "ie 8", "ie 9"))
    .pipe(concat('index.css'))
    .pipe(mincss())
    .pipe(gulp.dest('./lib'));
});

gulp.task('copyfont', function() {
  return gulp.src('./src/fonts/**')
    .pipe(cssmin())
    .pipe(gulp.dest('./lib/fonts'));
});

gulp.task('clean', function() {
  del(['lib']);
});

gulp.task('build', ['clean', 'compile', 'copyfont']);

gulp.task("watch", function(){
  gulp.watch(['./src/*.scss', './src/common/*.scss'], ["build"]);
});
