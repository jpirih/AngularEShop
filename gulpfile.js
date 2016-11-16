var gulp = require('gulp');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var flatten = require('gulp-flatten');
var webserver = require('gulp-webserver');

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
	gulp.src('./bower_components/angular/angular.min.js')
		.pipe(gulp.dest('./dist/libs/angular'))
		.pipe(notify('Angular move success!'));

	gulp.src('./bower_components/bootstrap/dist/**')
		.pipe(gulp.dest('./dist/libs/bootstrap'))
		.pipe(notify('Bootstrap move success'));

	gulp.src('./bower_components/angular-ui-router/release/angular-ui-router.min.js')
		.pipe(gulp.dest('./dist/libs/angular'))
		.pipe(notify('Angular ui-router include success'));

	gulp.src('./bower_components/angular-resource/angular-resource.min.js')
		.pipe(gulp.dest('./dist/libs/angular'))
		.pipe(notify('Angular resource included successfully!'));
    
    gulp.src('./bower_components/angular-bootstrap/ui-bootstrap-tpls.js')
        .pipe(gulp.dest('./dist/libs/angular'))
        .pipe(notify('Angular bootstrap included'));
    
    gulp.src('./bower_components/angular-locker/dist/angular-locker.min.js')
        .pipe(gulp.dest('./dist/libs/angular'))
        .pipe(notify('Angular locker included'));

	gulp.src('./bower_components/angular-animate/angular-animate.js')
		.pipe(gulp.dest('./dist/libs/angular'))
		.pipe(notify('Angular animate included'));

	gulp.src('./bower_components/jquery/dist/jquery.js')
		.pipe(gulp.dest('./dist/libs/jquery'))
		.pipe(notify('Jquery include success'));
});

// move my custom css files to dist
gulp.task('loadCss', function () {
	gulp.src('./src/**/*.css')
		.pipe(flatten())
		.pipe(concat('my-theme.css'))
		.pipe(gulp.dest('./dist/css'))
		.pipe(notify('Move css files success'));
});

// watcher
gulp.task('watch', ['serve'], function () {
	gulp.start(['scripts', 'move', 'libs', 'loadCss']);
	gulp.watch(['src/**/*.js'], ['scripts']);
	gulp.watch(['src/**/*.html'], ['move']);
	gulp.watch(['src/**/*.css'], ['loadCss']);
}); 	


