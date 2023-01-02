const browserSync = require('browser-sync');

const sass = require('gulp-sass')(require('sass')),

    gulp = require('gulp'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin');

//  let gulp = require('gulp'),
//     sass = require('gulp-sass');

gulp.task('sass', function () {
    return gulp.src('app/scss/style.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(rename({ suffix: '.min' }))   //переименование style.css в style.min.css 
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 8 versions']    // Поддержка 8-ми последних версий браузера
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))   //авто-обновление файлов в браузере(avto-refresh)
});

gulp.task('style', function(){
    return gulp.src([
        'node_modules/normalize.css/normalize.css',
        'node_modules/slick-carousel/slick/slick.css',
        'node_modules/magnific-popup/dist/magnific-popup.css'
    ])
        .pipe(concat('libs.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('app/css'))
});

gulp.task('script', function(){
    return gulp.src([
        
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/magnific-popup/dist/jquery.magnific-popup.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
});

// пишем функцию для авто-обновления html и js файлов

gulp.task('html', function(){
    return gulp.src('app/*.html')
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function(){
    return gulp.src('app/js/*.js')
    .pipe(browserSync.reload({stream: true}))
});



gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    })
});

// пишем команду для слежения за файлом css и изменением в структуре сайта
// автоматически, без необходимости ввода команды в терминале: gulp sass

gulp.task('watch', function () {
    gulp.watch('app/scss/style.scss', gulp.parallel('sass'));
    gulp.watch('app/*.html', gulp.parallel('html'));
    gulp.watch('app/js/*.js', gulp.parallel('js'));
});
gulp.task('default', gulp.parallel( 'style', 'script', 'sass', 'watch', 'browser-sync'))