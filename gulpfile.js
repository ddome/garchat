var gulp = require("gulp");
var browserify = require("browserify");
var reactify = require("reactify");
var source = require("vinyl-source-stream");

gulp.task("bundle", function () {
    return browserify({
        entries: "./app/js/main.jsx",
        debug: true
    }).transform(reactify)
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("app/dist/js"))
});

gulp.task("copy_index", ["bundle"], function () {
    return gulp.src(["./app/index.html"])
        .pipe(gulp.dest("app/dist"));
});

gulp.task("copy_css", ["bundle"], function () {
    return gulp.src(["./app/css/chatapp.css"])
        .pipe(gulp.dest("app/dist/css"));
});

gulp.task("default",["copy_index", "copy_css"],function(){
   console.log("Gulp completed..."); 
});