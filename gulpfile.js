'use strict';

let gulp = require('gulp');

let config = {
    statics: ['package.json'],
    templates: ['*.hbs', 'partials/*.hbs'],
    assets: ['assets/**/*', '!assets/css/*'],
    styles: ['assets/css/main.css'],
    destination: './tmp/themes/robinthrift'
};

gulp.task('statics', () => {
    return gulp.src(config.statics, {baseDir: '.'})
        .pipe(gulp.dest(config.destination))
})

gulp.task('templates', () => {
    return gulp.src(config.templates, {baseDir: '.'})
        .pipe(gulp.dest(config.destination))
});

gulp.task('assets', () => {
    return gulp.src(config.assets, {baseDir: '.'})
        .pipe(gulp.dest(config.destination + '/assets'))
})

gulp.task('styles', () => {
    let postcss = require('gulp-postcss');
    let cssnext = require('postcss-cssnext');
    let cssnano = require('cssnano');
    let cssImport = require('postcss-import');
    let fontPath = require('postcss-fontpath');

    return gulp.src(config.styles)
        .pipe(postcss(
            [
                cssImport({
                    path: ['assets/css']
                }),
                cssnext(),
                fontPath(),
                // cssnano()
            ]
        ))
        .pipe(gulp.dest(config.destination + '/assets/css'))
})

gulp.task('watch', ['default'], () => {
    gulp.watch(config.templates, ['templates']);
    gulp.watch(config.statics, ['statics']);
    gulp.watch(config.assets, ['assets']);
    gulp.watch(['assets/css/**/*', 'assets/css/*'], ['styles']);
});

gulp.task('default', ['templates', 'statics', 'assets', 'styles']);
