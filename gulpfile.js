var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
// var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
// var sh = require('shelljs');
var del = require('del');
var jshint = require('gulp-jshint');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var install = require('gulp-install');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var glob = require('glob-array');


var paths = {
  sass: ['./scss/**/*.scss'],
  clientjs: ['./client/src/**/*.jsx',
      './client/src/**/**/*.jsx',
      './client/src/**/**/**/*.jsx'],
  clientapp: ['./client/src/app/router.jsx'],
  serverjs: ['./server/*.js',
      './server/**/*.js',
      './server/**/**/*.js'
    ],
  client_file_name: 'bundle-client.min.js',
  dist: './client/dist',
  distcss: '/css',
  distfont: '/font',
  distlib: '/lib'
};

var libFilesToMove = ['./node_modules/socket.io/node_modules/socket.io-client/socket.io.js',
      './node_modules/jquery/dist/jquery.min.js',
      './node_modules/jquery/dist/jquery.min.map',
      // './node_modules/bootstrap/dist/js/bootstrap.min.js',
      './node_modules/bootstrap/dist/css/bootstrap.min.css',
      './node_modules/bootstrap/dist/css/bootstrap.min.map',
      // './node_modules/react-bootstrap/dist/react-bootstrap.min.js',
      './node_modules/font-awesome/css/font-awesome.min.css',
      './node_modules/font-awesome/css/font-awesome.min.map',
      './client/src/room/centerContainer/video/playerController.js'];

var fontAwesome =  ['./node_modules/font-awesome/fonts/*.*'];
var fontBootstrap = ['./node_modules/bootstrap/dist/fonts/*.*'];


// gulp.task('sass', function(done) {
//   gulp.src('./scss/ionic.app.scss')
//     .pipe(sass({
//       errLogToConsole: true
//     }))
//     .pipe(gulp.dest('./www/css/'))
//     .pipe(minifyCss({
//       keepSpecialComments: 0
//     }))
//     .pipe(rename({ extname: '.min.css' }))
//     .pipe(gulp.dest('./www/css/'))
//     .on('end', done);
// });
//
gulp.task('browserify-client', function (cb) {

  var files = glob.sync(paths.clientapp);
  var b = browserify();
  console.log(files.length);
  files.forEach(function (file) {
    b.add(file);
  });

  return b.transform(babelify).bundle()
    .pipe(source(paths.client_file_name))
    .pipe(buffer())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('uglify-client', function () {
  var files = glob.sync(paths.clientapp);
  var b = browserify();
  console.log(files.length);
  files.forEach(function (file) {
    b.add(file);
  });

  return b.transform(babelify).bundle()
    .pipe(source(paths.client_file_name))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('clean', function(){
  return del(['./node_modules', paths.dist]);
});

gulp.task('move_lib', ['install_lib', 'move_fontawesome', 'move_fontbootstrap'], function(){
  return gulp.src(libFilesToMove)
  .pipe(gulp.dest(paths.dist + paths.distlib));
});

gulp.task('move_fontawesome', function(){
  return gulp.src(fontAwesome, { base: './node_modules/font-awesome' })
  .pipe(gulp.dest(paths.dist));
});

gulp.task('move_fontbootstrap', function(){
  return gulp.src(fontBootstrap, { base: './node_modules/bootstrap/dist' })
  .pipe(gulp.dest(paths.dist));
});

gulp.task('lint', function() {
  return gulp.src(paths.clientjs, paths.serverjs)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
  return gulp.watch(paths.clientjs, ['uglify-client']);
});

gulp.task('install_lib', function() {
  return gulp.src(['./package.json'])
         .pipe(install());
});

gulp.task('prod', ['move_lib', 'uglify-client']);
gulp.task('default', ['move_lib', 'browserify-client']);
