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
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    seajsCombo = require( 'gulp-seajs-combo'),
    cache = require('gulp-cache'),
    path = require('path');

// 环境信息
var dev = 0,
    source = 'source/template',
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
    console.log('	gulp -p				生产环境（默认生产环境）');
    console.log('	gulp -d				开发环境');
    console.log('	gulp -m <module>		部分模块打包（默认全部打包）');
});

//server

gulp.task('s', function() {
    connect.server({
        livereload: true,
        root: dev == 0 ? source : production,
        port: 8008,
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
        //.pipe(rev())
        .pipe(gulp.dest(production+'/publish/css'))
        //.pipe(rev.manifest())
        //.pipe(gulp.dest(production+'/publish/css'));

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
    return gulp.src([source+src.js])
        .pipe(gulp.dest(develop+'/js'))
        .pipe(concat('main.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(production+'/publish/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest(production+'/publish/js'));
});
gulp.task('jslib', function() {
    return gulp.src(source+'/js/sea.js')
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(production+'/publish/js'));
});

// seajs
gulp.task( 'seajscombo', function(){
    return gulp.src( source+'/js/all.js' )
        .pipe( seajsCombo() )
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe( gulp.dest(production+'/publish/js') );
});

//rev

gulp.task('rev', function () {
    return gulp.src([production+'/publish/**/*.json', production+'/publish/*.html'])
        .pipe( revCollector({
            replaceReved: true,
            dirReplacements: {
                'css': '/publish/css',
                '/js/': '/publish/js/',
                'cdn/': function(manifest_value) {
                    return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
                }
            }
        }) )
        .pipe( gulp.dest(production));
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
    gulp.start('html','minify-css','images','jslib','seajscombo');
});

// watch
gulp.task('watch', function() {
    gulp.watch(source+src.css, ['minify-css']);
    gulp.watch(source+src.js, ['scripts']);
    gulp.watch(source+src.img, ['images']);

});
