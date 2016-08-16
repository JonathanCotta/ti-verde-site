gulp = require('gulp');
sass = require('gulp-sass');
uglify = require('gulp-uglify');
minify = require('gulp-csso');
concat = require('gulp-concat');
rename = require('gulp-rename');
brw = require('browser-sync').create();

gulp.task("default", function(){
  brw.init({
    server: {baseDir:'./'},
    ui: {port: 7070}
  });

  gulp.watch( "./assets/sass/**/*.scss",['sass']);
  gulp.watch( "./app/*.js",['angular']);
  gulp.watch("./index.html", ['sync']);
  gulp.watch("./app/components/**/*.html", ['sync']);
});

gulp.task("sass", function(){
  return gulp.src("./assets/sass/main.scss")
  .pipe(sass())
  .pipe(minify())
  .pipe(rename("style.min.css"))
  .pipe(gulp.dest("./assets/css/"))
  .pipe(brw.reload());
});

gulp.task("angular", function(){
  return gulp.src(["./app/*.js","!./app/app.min.js"])
  .pipe(concat("app.min.js"))
  .pipe(uglify())
  .pipe(gulp.dest("./app/"))
  .pipe(brw.reload());
});

gulp.task("sync",function(){
  return brw.reload();
});
