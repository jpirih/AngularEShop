var gulp = require('gulp');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var flatten = require('gulp-flatten');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var fs = require('fs');

// compile all javascript files
gulp.task('scripts', function () {
	gulp.src(['scr/app.js', 'src/**/*.js'])
		.pipe(concat('all.js'))
		.pipe(gulp.dest('./dist/js'))
		.pipe(notify('Javascript compiled successfully!'));
});

// move all html files to dist
gulp.task('move', function () {
	gulp.src('./src/index.html')
		.pipe(gulp.dest('./dist/'));

	gulp.src(['!./src/index.html', './src/**/*.html'])
		.pipe(flatten())
		.pipe(gulp.dest('./dist/templates'))
		.pipe(notify('Html  files move success!'));
});

// webserver
gulp.task('serve', function () {
	gulp.src('dist')
		.pipe(webserver({
			port: 48080,
			livereload: true,
			open: '/'
		}))
		.pipe(notify('Running web server!'));
});

// move libraries to dist
gulp.task('libs', function () {
	var dependencies = JSON.parse(fs.readFileSync('./dependencies.json'));
	gulp.src(dependencies.scripts)
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest('./dist/js'))
		.pipe(notify("Vendor JS file compiled successfully"));

	gulp.src(dependencies.styles)
		.pipe(concat('vendor.css'))
		.pipe(gulp.dest('./dist/css'))
		.pipe(notify("Vendor css compiled success fully"));

});

// vendor fonts
gulp.task('vendorFonts', function () {
	gulp.src("./bower_components/bootstrap/dist/fonts/*")
		.pipe(gulp.dest('./dist/fonts'));

});

// move my custom css files to dist
gulp.task('loadCss', function () {
	gulp.src('./src/**/*.scss')
		.pipe(flatten())
		.pipe(sass())
		.pipe(cleanCSS())
		.pipe(gulp.dest('./dist/css'))
		.pipe(notify('Scss compiled  success'));
});

// watcher
gulp.task('watch', ['serve'], function () {
	gulp.start(['scripts', 'move', 'libs', 'loadCss', 'vendorFonts']);
	gulp.watch(['src/**/*.js'], ['scripts']);
	gulp.watch(['src/**/*.html'], ['move']);
	gulp.watch(['src/**/*.scss'], ['loadCss']);
}); 	


