var gulp = require("gulp"),
    plugins = require('gulp-load-plugins')(),
    spritesmith = require('gulp.spritesmith'),
    buffer = require('vinyl-buffer'),
    merge = require('merge-stream'),
    basepath = "./app",
    source = basepath + "/src",
    destination = basepath + "/dist",
    run = require('run-sequence'),
	sass = require("gulp-sass");

//tasks
gulp.task('css', function () {
	return gulp.src(source + "/css/*.scss")
	.pipe(sass())
	.pipe(plugins.csscomb())
	.pipe(plugins.cssbeautify({indent: "    "}))
	.pipe(plugins.autoprefixer({cascade: false}))
	.pipe(plugins.csso())
	.pipe(gulp.dest(destination + "/css"))
	.pipe(plugins.notify({message: "css task complete"}));
});
gulp.task('img', function () {
	return gulp.src(source + imagestypes)
	.pipe(plugins.imagemin({
		progressive: true,
		interlaced: true,
		multipass: true
	}))
	.pipe(gulp.dest(destination + "/images/"))
	.pipe(plugins.notify({message: "images task complete"}));
});
gulp.task('sprites', function () {
	var spritedata = gulp.src(source + "/images/*.{jpg,jpeg}")
	.pipe(buffer())
	.pipe(plugins.imagemin())
	.pipe(spritesmith({
		imgname: "../images/sprite.jpg",
		cssname: "_sprites.scss",
		algorithm: 'binary-tree',
		cssvarmap: function (t) {
			t.name = "c-" + t.name
		}
	}));
	var imgstream = spritedata.img.pipe(gulp.dest(destination + '/images/'));
	var cssstream = spritedata.css.pipe(gulp.dest(source + "/sass/components/"));
	return merge(imgstream, cssstream);
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