/**
 * Created by Clearives on 2015/8/5.
 */
var gulp = require('gulp'),
    connect = require('gulp-connect'),
    htmlmin = require('gulp-htmlmin'),
    minifyCss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    argv = require('yargs').argv,
    _ = require('lodash'),
    path = require('path');

// 环境信息
var source = 'source/lmyk',
    develop = 'build/develop',
    production = 'build/production';

var src = {
    tpl: '/tpl/**',
    css: '/css/*.css',
    js: '/js/*.js',
    html: '/**.html',
    img: '/images/**'
}

gulp.task('help',function () {
    console.log('	gulp build			文件打包');
    console.log('	gulp watch			文件监控打包');
    console.log('	gulp help			gulp参数说明');
    console.log('	gulp s  			测试server');
});

//server

gulp.task('s', function() {
    connect.server({
        livereload: true,
        port: 8088,
        host: 'clearives.dev'
    });
});

//html

gulp.task('html', function() {
    return gulp.src(source+src.html)
        //.pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(develop))
        .pipe(gulp.dest(production));
});

// css压缩

gulp.task('minify-css', function() {
    return gulp.src(source+src.css)
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest(develop+'/css'))
        .pipe(concat('main.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(production+'/publish/css'))
});
// 图片压缩
gulp.task('images', function() {
    return gulp.src(source+src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(develop+'/images'))
        .pipe(gulp.dest(production+'/publish/images'))
});

// js处理

gulp.task('jshint', function() {
    gulp.src(source+src.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', ['jshint'], function() {
    return gulp.src([source+'/js/lib/zepto.min.js',source+'/js/lib/zepto.fullpage.js',source+src.js])
        .pipe(gulp.dest(develop+'/js'))
        .pipe(concat('main.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(production+'/publish/js'));
});

// clean
gulp.task('clean', function() {
    return gulp.src([production+'/publish/*'], {read: false})
        .pipe(clean());
});

// 默认提示
gulp.task('default',function () {
    gulp.start('help');
});
// build
gulp.task('build',['clean'], function() {
    gulp.start('html','minify-css','scripts', 'images');
});

// watch
gulp.task('watch', function() {
    gulp.watch(source+src.css, ['minify-css']);
    gulp.watch(source+src.js, ['scripts']);
    gulp.watch(source+src.img, ['images']);

});
