gulp = require('gulp');
sass = require('gulp-sass');
uglify = require('gulp-uglify');
minify = require('gulp-csso');
concat = require('gulp-concat');
rename = require('gulp-rename');
brw = require('browser-sync').create();

gulp.task("default",['browserSync','watcher'] ,function(){});

gulp.task("sass", function(){
  return gulp.src("./assets/sass/main.scss")
  .pipe(sass())
  .pipe(minify())
  .pipe(rename("style.min.css"))
  .pipe(gulp.dest("./assets/css/"));
});

gulp.task("angular", function(){
  return gulp.src(["./app/*.js","!./app/app.min.js"])
  .pipe(concat("app.min.js"))
  .pipe(uglify())
  .pipe(gulp.dest("./app/"));
});

gulp.task("browserSync", function(){
  return brw.init({
    server: {baseDir:'./'},
    ui: {port: 7070}
  });
});

gulp.task("sync",function(){
  return brw.reload();
});

gulp.task("watcher",function(){
  gulp.watch( "./assets/sass/**/*.scss",['sass' , 'sync']);
  gulp.watch( "./app/*.js",['angular' , 'sync']);
  gulp.watch("./index.html", ['sync']);
  gulp.watch("./app/components/**/*.html", ['sync']);
});
