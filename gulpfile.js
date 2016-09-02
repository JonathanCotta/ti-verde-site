var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var minify = require('gulp-csso');
var woff2 = require('gulp-ttf2woff2');
var eot = require('gulp-ttf2eot');
var brw = require('browser-sync').create();
var gif = require('gulp-if');
var ref = require('gulp-useref');
var templateCache = require('gulp-angular-templatecache');

gulp.task("default",['serve','watcher']);

// building tasks
gulp.task("build",['build:bundle' , 'build:fonts']);

gulp.task("build:bundle",['build:templateCaching'] , function(){
  return gulp.src("index.html")
  .pipe(ref())
  .pipe(gif("*.js", uglify()))
  .pipe(gif("*.css", minify()))
  .pipe(gulp.dest("./dist/"));
});

gulp.task("build:templateCaching", function(){
    return gulp.src("./app/components/**/*.html")
    .pipe(templateCache())
    .pipe(gulp.dest("./app/"));
});

gulp.task("build:fonts",['fonts'] ,function(){
  return gulp.src("./assets/css/fonts/**/*.*").pipe(gulp.dest("./dist/fonts/"));
});

//serving tasks
gulp.task("serve", function(){
  return brw.init({
    server: {baseDir:'./'},
    ui: {port: 7070}
  });
});

gulp.task("serve:dist", function(){
  return brw.init({ server: {baseDir:'./dist/'}});
});

gulp.task("sync",function(){
  return brw.reload();
});

//watching task
gulp.task("watcher",function(){
  gulp.watch( "./assets/sass/**/*.scss",['sass' , 'sync']);
  gulp.watch( "./app/*.js",['angular' , 'sync']);
  gulp.watch("./index.html", ['sync']);
  gulp.watch("./app/components/**/*.html", ['sync']);
});

// styling tasks
gulp.task("sass", function(){
  return gulp.src("./assets/sass/main.scss")
  .pipe(sass())
  .pipe(gulp.dest("./assets/css/"));
});

gulp.task("fonts", function(){fontConvert(['roboto','Caviar-Dreams'])});

// font convertion function
function fontConvert(folders) {
  folders.forEach(function(f, index){
    gulp.src("./assets/css/fonts/"+ f +"/*.ttf")
    .pipe(woff2())
    .pipe(gulp.dest("./assets/css/fonts/"+ f +"/"));

    gulp.src("./assets/css/fonts/"+ f +"/*.ttf")
    .pipe(eot())
    .pipe(gulp.dest("./assets/css/fonts/"+ f +"/"));
  });
}
