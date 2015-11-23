/**
 * Created by Clearives on 2015/11/23.
 */
'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var shrink = require('gulp-cssshrink');

// 静态文件打包合并
var webpack = require('gulp-webpack');
// MD5戳
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var runSequence = require('run-sequence');

var config = require('./webpack.config');

gulp.task('js', function () {
    gulp.src('./webapp/src/js')
        .pipe(webpack(config))
        .pipe(gulp.dest('./webapp/dev/assets/js'));
});

gulp.task('css', function () {
    gulp.src(['./webapp/src/css/main.css'])
        .pipe(concat('app.css'))
        .pipe(gulp.dest('./webapp/dev/assets/css'));
});

gulp.task('html', function () {
    return gulp.src(['./webapp/src/index.html'])
        .pipe(gulp.dest('./webapp/dev'));
});

// clean
gulp.task('clean', function() {
    return gulp.src(['./webapp/dist'], {read: false})
        .pipe(clean());
});

gulp.task('publish-js', function () {
    return gulp.src(['./webapp/src/js'])
        .pipe(webpack(config))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('./webapp/dist/assets/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./webapp/dist/rev/js'));
});
gulp.task('publish-css', function () {
    return gulp.src(['./webapp/src/css'])
        .pipe(concat('app.css'))
        .pipe(shrink())
        .pipe(rev())
        .pipe(gulp.dest('./webapp/dist/assets/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./webapp/dist/rev/css'));
});

gulp.task('publish-html', function () {
    return gulp.src(['./webapp/dist/rev/**/*.json', './webapp/src/index.html'])
        .pipe(revCollector({
            dirReplacements: {
                '': ''
            }
        }))
        .pipe(gulp.dest('./webapp/dist'));
});

gulp.task('dev', function() {
    gulp.start('html','css','js');
});
gulp.task('publish',['clean'], function (callback) {
    runSequence(
        ['publish-css','publish-js'],
        'publish-html',
        callback);
});