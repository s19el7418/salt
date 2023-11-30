const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-image');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));


const clean = () => {
  return del(['dist'])
}

const resources = () => {
  return src('src/resources/**')
    .pipe(dest('dist'))
}

const fonts = () => {
  return src('src/fonts/**')
    .pipe(dest('dist/fonts'))
}

const styles = () => {
  return src('src/styles/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(concat('main.css'))
    .pipe(sourcemaps.write())
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

const sassCompilation = () => {
  return src('src/styles/**/*.scss')
   .pipe(sourcemaps.init())
   .pipe(sass())
   .pipe(sourcemaps.write())
   .pipe(dest('dist'))
   .pipe(browserSync.stream());
}


const sassMinify = () => {
  return src('src/styles/**/*.scss')
   .pipe(sourcemaps.init())
   .pipe(sass())
   .pipe(autoprefixer({
      cascade: false,
    }))
   .pipe(cleanCSS({
      level: 2,
    }))
   .pipe(sourcemaps.write())
   .pipe(dest('dist'))
   .pipe(browserSync.stream());
}

const cssMinify = () => {
  return src('src/styles/**/*.css')
    .pipe(concat('main.css'))
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(cleanCSS({
      level: 2,
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

const htmlMinify = () => {
  return src('src/**/*.html')
    .pipe(htmlMin({
      collapseWhitespace: true,
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

const html = () => {
  return src('src/**/*.html')
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

const svgSprites = () => {
  return src('src/images/svg/**/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest('dist/images'))
}

const scripts = () => {
  return src([
    'src/js/components/**/*.js',
    'src/js/main.js'
  ])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const scriptsMinify = () => {
  return src([
    'src/js/components/**/*.js',
    'src/js/main.js'
  ])
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(uglify({
      toplevel: true
    }).on('error', notify.onError()))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
}

const images = () => {
  return src([
    'src/images/**/*.jpg',
    'src/images/**/*.png',
    'src/images/*.svg',
    'src/images/**/*.jpeg',
  ])
    .pipe(image())
    .pipe(dest('dist/images'))
}

watch('src/**/*.html', html);
watch('src/**/*.html', htmlMinify);
watch('src/styles/**/*.css', styles);
watch('src/styles/**/*.css', cssMinify);
watch('src/images/svg/**/*.svg', svgSprites);
watch('src/images/**/*.jpg', images);
watch('src/images/**/*.png', images);
watch('src/images/**/*.svg', images);
watch('src/images/**/*.jpeg', images);
watch('src/js/**/*.js', scriptsMinify);
watch('src/js/**/*.js', scripts);
watch('src/resources/**', resources);
watch('src/fonts/**', fonts);
watch('src/styles/**/*.scss', sassMinify);
watch('src/styles/**/*.scss', sassCompilation);

exports.default = series(clean, resources, fonts, htmlMinify, scriptsMinify, sassMinify, cssMinify, images, svgSprites, watchFiles);
exports.dev = series(clean, resources, fonts, html, scripts, styles, sassCompilation, images, svgSprites, watchFiles);
