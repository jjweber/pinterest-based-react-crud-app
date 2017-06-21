'use strict';

// Dependencies
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var minifyCSS = require('gulp-clean-css');
var sourcemaps = require("gulp-sourcemaps");
var babel = require('gulp-babel')
var concat = require("gulp-concat");
var eslint       = require('gulp-eslint');
var filter       = require('gulp-filter');
var newer        = require('gulp-newer');
var notify       = require('gulp-notify');
var plumber      = require('gulp-plumber');
var reload       = browserSync.reload;
var rename = require('gulp-rename');


var onError = function(err) {
  notify.onError({
    title:    "Error",
    message:  "<%= error %>",
  })(err);
  this.emit('end');
};

var plumberOptions = {
  errorHandler: onError,
};

var jsFiles = {
  vendor: [

  ],
  source: [
    'assets/js/src/Utility.js',
    'assets/js/src/components/ComponentForm.jsx',
    'assets/js/src/components/Component.jsx',
  ]
};

// Lint JS/JSX files
gulp.task('eslint', function() {
  return gulp.src(jsFiles.source)
    .pipe(eslint({
      baseConfig: {
        "ecmaFeatures": {
           "jsx": true
         }
      }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// Copy react.js and react-dom.js to assets/js/src/vendor
// only if the copy in node_modules is "newer"
gulp.task('copy-react', function() {
  return gulp.src('node_modules/react/dist/react.js')
    .pipe(newer('src/vendor/react.js'))
    .pipe(gulp.dest('src/vendor'));
});
gulp.task('copy-react-dom', function() {
  return gulp.src('node_modules/react-dom/dist/react-dom.js')
    .pipe(newer('assets/js/src/vendor/react-dom.js'))
    .pipe(gulp.dest('assets/js/src/vendor'));
});

// Copy assets/js/vendor/* to assets/js
gulp.task('copy-js-vendor', function() {
  return gulp
    .src([
      'assets/js/src/vendor/react.js',
      'assets/js/src/vendor/react-dom.js'
    ])
    .pipe(gulp.dest('assets/js'));
});

// Concatenate jsFiles.vendor and jsFiles.source into one JS file.
// Run copy-react and eslint before concatenating
gulp.task('concat', ['copy-react', 'copy-react-dom', 'eslint'], function() {
  return gulp.src(jsFiles.vendor.concat(jsFiles.source))
    .pipe(sourcemaps.init())
    .pipe(babel({
      only: [
        'assets/js/src/components',
      ],
      compact: false
    }))
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('assets/js'));
});

///////////////
// - SCSS/CSS
///////////////

var SCSS_SRC = 'src/Assets/scss/**/*.scss';
var SCSS_DEST = 'src/Assets/css';

// Compile SCSS
gulp.task('compile_scss', function() {
  gulp.src(SCSS_SRC)
   .pipe(sass().on('error', sass.logError))
   .pipe(minifyCSS())
   .pipe(rename({ suffix: '.min' }))
   .pipe(gulp.dest(SCSS_DEST));
});

// Watch JS/JSX and Sass files
gulp.task('watch', function() {
  gulp.watch('src/Assets/js/src/**/*.{js,jsx}', ['concat']);
  gulp.watch('src/Assets/scss/**/*.scss', ['compile_scss']);
  gulp.watch('src/components/**/*.scss', ['compile_components_css']);
});

// BrowserSync
gulp.task('browsersync', function() {
  browserSync({
    server: {
      baseDir: './'
    },
    open: false,
    online: false,
    notify: false,
  });
});

gulp.task('build', ['compile_scss', 'copy-js-vendor', 'concat']);
gulp.task('default', ['build', 'watch']);
