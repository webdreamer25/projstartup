'use strict';

// Load plugins
const autoprefixer = require('autoprefixer');
const browsersync = require('browser-sync').create();
// const uglify = require('gulp-uglify');
// const cp = require('child_process');
const cssnano = require('cssnano');
const del = require('del');
// const eslint = require('gulp-eslint');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const util = require('gulp-util');
// const mode = require('gulp-mode');
const webpack = require('webpack');
const webpackconfig = require('./webpack.config.js');
const webpackstream = require('webpack-stream');

// BrowserSync
function creesAppSync(done) {
  browsersync.init({
    server: {
      baseDir: './public/',
      index: 'index.html'
    },
    port: 3000
  });

  done();
};

function adminAppSync(done) {
  browsersync.init({
    server: {
      baseDir: './public/',
      index: 'admin.html'
    }, 
    port: 3003
  });

  done();
};

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
};

// Clean assets
function clean() {
  return del(['./public/']);
};

// Optimize Images
function images() {
  return gulp
    .src('./src/assets/**/*')
    .pipe(newer('./public/assets'))
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            {
              removeViewBox: false,
              collapseGroups: true
            }
          ]
        })
      ])
    )
    .pipe(gulp.dest('./public/assets'));
};

// CSS task
function css() {
  return gulp
    .src('./src/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(gulp.dest('./public/css/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest('./public/css/'))
    .pipe(browsersync.stream());
};

// Lint scripts
// function scriptsLint() {
//   return gulp
//     .src(['./src/app/**/*', './gulpfile.js'])
//     .pipe(plumber())
//     .pipe(eslint())
//     .pipe(eslint.format())
//     .pipe(eslint.failAfterError());
// };

// Transpile, concatenate and minify scripts
function scripts() {
  if (util.env.production) {
    webpackconfig.mode = 'production';
  } else {
    webpackconfig.mode = 'development';
  }
  
  return gulp
      .src(['./src/app/**/**/*.js'])
      .pipe(plumber())
      .pipe(webpackstream(webpackconfig, webpack))
      // folder only, filename is specified in webpack config
      .pipe(gulp.dest('./public'))
      .pipe(browsersync.stream());
};

// Watch files
function watchFiles() {
  gulp.watch('./src/scss/**/**/*.scss', css);
  gulp.watch('./src/app/**/**/*.css', gulp.series(scripts));
  gulp.watch('./src/app/**/*.js', gulp.series(scripts));
  gulp.watch('./src/*.html', gulp.series(browserSyncReload));
  gulp.watch('./src/assets/**/*', images);
};

// Tasks
// gulp.task("images", images);
gulp.task('css', css);
gulp.task('js', gulp.series(scripts));
gulp.task('clean', clean);

// build
gulp.task('build', gulp.series(clean, css, images, gulp.parallel('js')));

// watch
gulp.task('watch:crees', gulp.parallel(watchFiles, creesAppSync));
gulp.task('watch:admin', gulp.parallel(watchFiles, adminAppSync));
gulp.task('watch', gulp.parallel(watchFiles, creesAppSync, adminAppSync));