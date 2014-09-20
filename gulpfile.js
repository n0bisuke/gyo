//gulpの読み込み
var gulp = require('gulp');

//プラグインの読み込み
var $ = require('gulp-load-plugins')();
var browser = require('browser-sync');
// var runSequence = require('run-sequence');

//タスクの中身を記載
var BASE_PATH = './';
var ect_path = ['./template/*.ect'];
var js_path = ['./js/*.js'];
var sass_path = ['./scss/**/*.scss'];

//pc用
//htmlに関するタスク
gulp.task('html', function(){
    return gulp.src(ect_path)
        .pipe($.plumber())
        .pipe($.ect())
        .pipe($.prettify())
        .pipe(gulp.dest(BASE_PATH))
       .pipe(browser.reload({stream: true}));
});

gulp.task('sass', function () {
    gulp.src(sass_path)
        .pipe($.plumber())
        .pipe($.sass())
        .pipe($.autoprefixer(['last 3 version', 'ie >= 9', 'Android 4.0']))
        .pipe(gulp.dest('./css'))
        .pipe(browser.reload({stream: true}));
});

gulp.task('js', function(){
    return gulp.src(js_path)
        .pipe($.plumber())
        //.pipe($.jshint())
        //.pipe($.prettify())
        .pipe(gulp.dest(BASE_PATH+'js'))
       .pipe(browser.reload({stream: true}));
});

//サーバー起動
gulp.task('serv', function () {
    browser.init(null, {
        server: {
            baseDir: './',
        },
        port: 3003
    });
});

//サーバーリロード
gulp.task('reload', function () {
    browser.reload();
});

gulp.task('default',['serv'],function(){
    gulp.watch(ect_path,['html']);
    gulp.watch(sass_path,['sass']);
    gulp.watch(js_path,['js']);
});