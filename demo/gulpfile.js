'use strict'

var gulp = require('gulp')
var sass = require('gulp-sass')

gulp.task('scss', function() {
	return gulp
		.src('./scss/style.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./css'))
})

gulp.task('scss:watch', function() {
	gulp.watch('./scss/*.scss', ['scss'])
})

gulp.task('default', ['scss:watch'])
