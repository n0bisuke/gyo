//gulpの読み込み
var gulp = require('gulp');
//var config = require('./config.json');

//プラグインの読み込み
var $ = require('gulp-load-plugins')();
var browser = require('browser-sync');
// var browser = require('browser-sync');
// var runSequence = require('run-sequence');

// //pathsを記載
// var BASE_PATH = 'app';
// var BASE_PATH_SP ='app/sp';
// var CSS_BASE_PATH = BASE_PATH + '/css';
// var IMG_BASE_PATH = BASE_PATH + '/images';
// var JS_BASE_PATH = BASE_PATH + '/js';
// var DEST_PATH = 'dest';
//var SERV_PATH = config.ftp.remotePath;

//タスクの中身を記載
var BASE_PATH = './';
var ect_path = ['./template/*.ect'];
var js_path = ['./js/*.js'];
var css_path = ['./sass/*.scss'];

//pc用
//htmlに関するタスク
gulp.task('html', function(){
    return gulp.src(ect_path)
        // .pipe($.plumber())
        .pipe($.ect())
        // .pipe($.changed(BASE_PATH))
        // .pipe($.htmlhint())
        // .pipe($.htmlhint.reporter())
        .pipe($.prettify())
        .pipe(gulp.dest(BASE_PATH))
       .pipe(browser.reload({stream: true}));
});

gulp.task('style', function () {
    return gulp.src(css_path)
        .pipe($.autoprefixer(['last 3 version', 'ie >= 9', 'Android 4.0']))
        .pipe(gulp.dest(BASE_PATH + 'css'))
        .pipe(browser.reload({stream: true}));
});

// gulp.task('js', function(){
//     return gulp.src(js_path)
//         // .pipe($.plumber())
//         .pipe($.ect())
//         // .pipe($.changed(BASE_PATH))
//         // .pipe($.htmlhint())
//         // .pipe($.htmlhint.reporter())
//         .pipe($.prettify())
//         .pipe(gulp.dest(BASE_PATH))
//        .pipe(browser.reload({stream: true}));
// });

//サーバー起動
gulp.task('serv', function () {
    browser.init(null, {
        server: {
            baseDir: './'
        }
    });
});

//サーバーリロード
gulp.task('reload', function () {
    browser.reload();
});

gulp.task('default',['serv'],function(){
    gulp.watch(ect_path,['html']);
    gulp.watch(css_path,['style']);
    //gulp.watch(js_path,['js']);
    // gulp.watch(path.pc.img.src,['image']);
    // gulp.watch(path.sp.html.src_ect_watch,['html_sp']);
    // gulp.watch(path.sp.sass.src,['style_sp']);
    // gulp.watch(path.sp.js.src,['js_sp']);
    // gulp.watch(path.sp.img.src,['image_sp']);
});