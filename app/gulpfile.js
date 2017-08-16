var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');

var paths = {
	sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);
gulp.task('ionic:watch:before', ['prepare']);
gulp.task('ionic:build:before', ['prepare']);

gulp.task('sass', function (done) {
	gulp.src('./scss/ionic.app.scss')
		.pipe(sass())
		.on('error', sass.logError)
		.pipe(gulp.dest('./www/css/'))
		.pipe(cleanCss({
			keepSpecialComments: 0
		}))
		.pipe(rename({ extname: '.min.css' }))
		.pipe(gulp.dest('./www/css/'))
		.on('end', done);
});

gulp.task('watch', ['sass'], function () {
	gulp.watch(paths.sass, ['sass']);
});

gulp.task('prepare', function () {
	return gulp.src([
		'lib/ionic/css/ionic.css',

		'lib/ionic/fonts/*',
		
		'lib/ionic/js/ionic.bundle.js',
		'lib/aixmobil/aix.core.js',
		'lib/aixmobil/aix.payment.js',
		'lib/angular-ui-mask/dist/mask.min.js',
		'lib/angular-messages/angular-messages.min.js',
		'lib/jquery/jquery.js'
	], { base: 'lib/' })
		.pipe(gulp.dest('www/lib/'));
});