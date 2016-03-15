var gulp = require('gulp');

var config = {
    statics: ['package.json'],
    templates: ['*.hbs', 'partials/*.hbs'],
    assets: ['assets/**/*', '!assets/css'],
    styles: ['assets/css/main.scss'],
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
    var sass = require('gulp-sass')
    return gulp.src(config.styles)
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: require('node-neat').includePaths
        }))
        .pipe(gulp.dest(config.destination + '/assets/css'))
})

gulp.task('watch', ['default'], () => {
    gulp.watch(config.templates, ['templates']);
    gulp.watch(config.statics, ['statics']);
    gulp.watch(config.assets, ['assets']);
    gulp.watch(['assets/css/**/*', 'assets/css/*'], ['styles']);
});

gulp.task('default', ['templates', 'statics', 'assets', 'styles']);
