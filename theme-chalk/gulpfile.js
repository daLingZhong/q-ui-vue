'use strict';

var gulp = require("gulp"),
  sass = require("gulp-sass"),
  del = require('del')
var cssmin = require('gulp-cssmin');

gulp.task("compile", function(){
  gulp.src(['./src/*.scss'])
    .pipe(sass())
    // .pipe(autoprefixer("last 3 version","safari 5", "ie 8", "ie 9"))
    // .pipe(concat('q-ui-common.css'))
    // .pipe(gulp.dest("./lib"))
    // .pipe(rename('q-ui.min.css'))
    // .pipe(minifycss())
    .pipe(gulp.dest('./lib'));
});

gulp.task('copyfont', function() {
  return gulp.src('./src/fonts/**')
    .pipe(cssmin())
    .pipe(gulp.dest('./lib/fonts'));
});

gulp.task("watch", function(){
  gulp.watch(sassFiles, ["sass"]);
});

gulp.task('clean', function() {
  del(['lib']);
});

gulp.task('build', ['clean', 'compile', 'copyfont']);
