var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    uglify = require('gulp-uglify'),
    cssnano = require("gulp-cssnano"),
    autoprefixer = require("gulp-autoprefixer"),
    prettyError = require('gulp-prettyerror'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    del = require('del'),
    useref = require('gulp-useref'),
    runSequence = require('run-sequence'),
    gulpIf = require('gulp-if'),
    rename = require('gulp-rename');
    
gulp.task("sass", function() {
    return gulp
      .src("./sass/index.scss")
      .pipe(prettyError())
      .pipe(sass())
      .pipe(
        autoprefixer({
          browsers: ["last 2 versions"]
        })
      )
      .pipe(gulp.dest("./build/css"))
      .pipe(cssnano())
      .pipe(rename("style.min.css"))
      .pipe(gulp.dest("./build/css"));
  });
  
  gulp.task('useref', function(){
    return gulp.src('index.html')
      .pipe(useref())
      .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
      .pipe(gulp.dest('build'))
  });

  gulp.task('images', function(){
    return gulp.src('./photos/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin({
        interlaced: true
      })))
    .pipe(gulp.dest('./build/images'))
  });

  gulp.task('fonts', function() {
    return gulp.src('/*')
    .pipe(gulp.dest('./build/fonts'))
  });
  
  gulp.task('clean:build', function() {
    return del.sync('build');
  });
   
  gulp.task('scripts', function(){
        return gulp
        .src('./js/*.js')
          .pipe(uglify())
          .pipe(rename({ extname: '.min.js' })) 
          .pipe(gulp.dest('./build/js'));sc 
      });
      gulp.task('watch', function() {
        gulp.watch('js/*.js', gulp.series('scripts'));
        gulp.watch('sass/*.scss', gulp.series('sass'));
     });
     gulp.task('browser-sync', function() {
        browserSync.init({
            server: {
                baseDir: "./"
            }
        });
    gulp
    .watch(['build/css/*.css', 'build/js/*.js'])
    .on('change', browserSync.reload);
});

gulp.task("default", gulp.parallel("browser-sync", "watch"));