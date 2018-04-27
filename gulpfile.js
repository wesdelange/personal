var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    uglify = require('gulp-uglify'),
    cssnano = require("gulp-cssnano"),
    autoprefixer = require("gulp-autoprefixer"),
    prettyError = require('gulp-prettyerror'),
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


    gulp.task('default', gulp.parallel('browser-sync', 'watch'));