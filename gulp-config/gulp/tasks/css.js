/**
 * Created by Clearives on 2015/8/4.
 * cssËõĞ¡»¯
 */
var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');

gulp.task('minify-css', function() {
    return gulp.src('src/css/*.css')
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'));
});