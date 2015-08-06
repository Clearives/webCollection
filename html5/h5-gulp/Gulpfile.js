/**
 * Created by Clearives on 2015/8/5.
 */
var gulp = require('gulp'),
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
var source = 'source',
    develop = 'build/develop',
    production = 'build/production';

var src = {
    tpl: '/tpl/**',
    css: '/css/*.css',
    js: '/js/**/*.js',
    html: '/**.html',
    img: '/images/**'
}

gulp.task('help',function () {
    console.log('	gulp build			文件打包');
    console.log('	gulp watch			文件监控打包');
    console.log('	gulp help			gulp参数说明');
    console.log('	gulp server			测试server');
    console.log('	gulp -p				生产环境（默认生产环境）');
    console.log('	gulp -d				开发环境');
    console.log('	gulp -m <module>		部分模块打包（默认全部打包）');
});



// css压缩
gulp.task('minify-css', function() {
    return gulp.src(source+src.css)
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest(develop+'/css'))
        .pipe(concat('main.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(develop+'/css'))
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
});

// js处理
gulp.task('scripts', function() {
    return gulp.src(source+src.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        //.pipe(gulp.dest(develop+'/js'))
        //.pipe(concat('main.js'))
        //.pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(develop+'/js'));
});

// clean
gulp.task('clean', function() {
    return gulp.src([develop+'/*'], {read: false})
        .pipe(clean());
});

// 默认提示
gulp.task('default',function () {
    gulp.start('help');
});
// build
gulp.task('build',['clean'], function() {
    gulp.src(source+src.html)
        .pipe(gulp.dest(develop));
    gulp.start('minify-css','scripts', 'images');
});

// watch
gulp.task('watch', function() {
    gulp.watch(source+src.css, ['minify-css']);
    gulp.watch(source+src.js, ['scripts']);
    gulp.watch(source+src.img, ['images']);

});
