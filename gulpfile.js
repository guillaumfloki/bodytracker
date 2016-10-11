var gulp = require("gulp");
var plugins = require('gulp-load-plugins')();
var spritesmith = require('gulp.spritesmith');
var buffer = require('vinyl-buffer');
var merge = require('merge-stream');
var basePath = "./app";
var source = basePath + "/src";
var destination = basePath + "/dist";
var run = require('run-sequence');

//tasks
gulp.task('css', function () {
    return gulp.src(source + "/css/*.scss")
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.csscomb())
        .pipe(plugins.cssbeautify({indent: "    "}))
        .pipe(plugins.autoprefixer({cascade: false}))
        .pipe(plugins.csso())
        .pipe(gulp.dest(destination + "/css"))
		.pipe(plugins.notify({message: "CSS task complete"}));
});
gulp.task('img', function () {
	return gulp.src(source + imagesTypes)
		.pipe(plugins.imagemin({
			progressive: true,
			interlaced: true,
			multipass: true
		}))
		.pipe(gulp.dest(destination + "/images/"))
		.pipe(plugins.notify({message: "Images task complete"}));
});
gulp.task('sprites', function () {
	var spriteData = gulp.src(source + "/images/*.{jpg,jpeg}")
		.pipe(buffer())
		.pipe(plugins.imagemin())
		.pipe(spritesmith({
			imgName: "../images/sprite.jpg",
			cssName: "_sprites.scss",
			algorithm: 'binary-tree',
			cssVarMap: function (t) {
				t.name = "c-" + t.name
			}
		}));
	var imgStream = spriteData.img.pipe(gulp.dest(destination + '/images/'));
	var cssStream = spriteData.css.pipe(gulp.dest(source + "/sass/components/"));
	return merge(imgStream, cssStream);
});
gulp.task('jsmin', function(){
	//return gulp.src(source + )
})
gulp.task('build', ['css', 'img']);
gulp.task('sprite_css', function(cb){
	run('sprite', 'css', cb)
});
gulp.task("watch", ['css'], function(){
	gulp.watch(source + "/css/**/*.scss", ['css'])
});
gulp.task('prod', ['build']);
gulp.task('default', ['build']);