var gulp = require("gulp");
var plugins = require('gulp-load-plugins')();
var basePath = "./app";
var source = basePath + "/src";
var destination = basePath + "/dist";

//tasks
gulp.task('css', function () {
    return gulp.src(source + "/sass/*.scss")
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.csscomb())
        .pipe(plugins.cssbeautify({indent: "    "}))
        .pipe(plugins.autoprefixer({cascade: false}))
        .pipe(plugins.csso())
        .pipe(gulp.dest(destination + "/css"));
});
gulp.task('build', ['css']);