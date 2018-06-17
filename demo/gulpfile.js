'use strict'

const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')

gulp.task('scss', function() {
	return gulp
		.src('./scss/style.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(
			autoprefixer({
				browsers: ['last 2 versions'],
				cascade: false
			})
		)
		.pipe(gulp.dest('./css'))
})

gulp.task('scss:watch', function() {
	gulp.watch('./scss/*.scss', ['scss'])
})

gulp.task('default', ['scss:watch'])
