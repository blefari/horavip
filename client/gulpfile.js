'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var del = require('del');
var es = require('event-stream');
var runSequence = require('run-sequence');
var wiredep = require('wiredep');
var $ = require('gulp-load-plugins')();

var app = {
  src: 'app',
  test: 'test',
  libs: 'libs',
  dist: 'dist',
  tmp: '.tmp',
  env: $.util.env.env ? $.util.env.env : "development"
};

/** JS **/
gulp.task('scripts', ['jshint'], function () {
  return gulp
    .src(app.src + '/**/*.js', {base: app.src})
    .pipe($.plumber({errorHandler: onError}))
    .pipe($.sourcemaps.init())
    .pipe($.angularFilesort())
    .pipe($.ngAnnotate({single_quotes: true, gulpWarnings: false}))
    .pipe($.concat('/app/main.js'))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(app.tmp))
    .pipe(browserSync.reload({stream: true}));
});


gulp.task('constants', function () {
  var myConfig = require('./config.json');
  var envConfig = myConfig[app.env];
  return $.ngConstant({
    name: 'config',
    constants: envConfig,
    stream: true
  })
    .pipe(gulp.dest(app.tmp + '/app/'));
});

/** JS Hint **/
gulp.task('jshint', function () {
  return gulp
    .src(app.src + '/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});

/** CSS **/
gulp.task('styles', function () {
  return gulp
    .src(app.src + '/*.less', {base: app.src})
    .pipe($.plumber({errorHandler: onError}))
    .pipe($.less())
    .pipe($.autoprefixer('last 2 version', '> 5%'))
    .pipe(gulp.dest(app.tmp + '/app/'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('inject', function () {
  var injectOptions = {
    ignorePath: [app.src, app.tmp],
    addRootSlash: true
  };

  var injectStyles = gulp
    .src(app.tmp + '/app/**/*.css');

  var injectScripts = gulp
    .src(app.tmp + '/app/**/*.js');

  var wiredepOpts = {
    ignorePath: '..',
    exclude: ['jquery', 'bootstrap.js', 'bootstrap.css', 'waypoints', /angulartics-((?=ga-)|(?!ga))/]
  };

  return gulp
    .src(app.src + '/*.html')
    .pipe($.plumber({errorHandler: onError}))
    .pipe(wiredep.stream(wiredepOpts))
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(gulp.dest(app.tmp))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('templates', function () {
  return gulp
    .src(app.src + '/**/*.html')
    .pipe($.plumber({errorHandler: onError}))
    .pipe($.minifyHtml({empty: true, spare: true, quotes: true}))
    .pipe($.angularTemplatecache('templates.js', {root: '/app/', module: 'beautyApp'}))
    .pipe(gulp.dest(app.tmp + '/app/'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('fonts', function () {
  return gulp
    .src([
      app.libs + '/fontawesome/fonts/*',
      app.libs + '/bootstrap/fonts/*'
    ])
    .pipe(gulp.dest(app.tmp + '/fonts'));
});

gulp.task('build', function (cb) {
  return runSequence(
    'clean',
    ['styles', 'scripts', 'templates', 'fonts', 'constants'],
    'inject',
    cb
  )
});

gulp.task('dist', ['build'], function () {
  var assets = $.useref.assets();

  var images = gulp
    .src(app.src + '/images/**/*', {base: app.src})
    .pipe($.imagemin({progressive: true, interlaced: true}))
    .pipe($.rev());

  var index = gulp
    .src(app.tmp + '/*.html', {base: app.tmp})
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.csso()))
    .pipe($.rev())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml({empty: true, spare: true, quotes: true})));

  return es.merge(
    es.merge(images, index).pipe($.revReplace()),
    gulp.src(app.src + '/fonts/**/*', {base: app.src}),
    gulp.src(app.tmp + '/fonts/**/*', {base: app.tmp})
  )
    .pipe(gulp.dest(app.dist))
    .pipe($.filter('**/*.json'))
    .pipe($.gzip({ append: false }))
    .pipe(gulp.dest(app.dist));

});

/** Clean Output Directory **/
gulp.task('clean', function (cb) {
  del([app.tmp+'/', app.dist+'/'], cb);
});

/** Server **/
gulp.task('serve', ['build'], function () {
  browserSyncInit([app.tmp, app.src]);
  gulp.watch('bower.json', ['inject', browserSync.reload]);
  gulp.watch(app.src + '/**/*.less', ['styles']);
  gulp.watch(app.src + '/**/*.js', ['scripts', 'inject']);
  gulp.watch(app.src + '/**/*.html', ['templates']);
  gulp.watch(app.src + '/*.html', ['inject']);
  gulp.watch(app.src + '/images/**/*', [browserSync.reload]);
  gulp.watch(app.src + '/fonts/**/*', [browserSync.reload]);
});

/** Server **/
function browserSyncInit(baseDir) {
  browserSync({
    host: 'localhost',
    port: 8000,
    server: {
      baseDir: baseDir,
      middleware: require('connect-modrewrite')([
        '^[^\\.]*$ /index.html [L]'
      ]),
      routes: {'/libs': './libs'}
    }
  });
}

/** Error Handler **/
function onError(err) {
  $.util.log($.util.colors.red('ERROR: ') + $.util.colors.cyan(err.plugin) + ' - ' + err.message);
  this.emit('end');
}
