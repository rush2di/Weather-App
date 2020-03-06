var gulp = require("gulp"),
  concat = require("gulp-concat"),
  prefixer = require("gulp-autoprefixer"),
  imagemin = require("gulp-imagemin");
sass = require("gulp-sass");


gulp.task("html", () => {
  return gulp.src("dev/*.html").pipe(gulp.dest("dist"));
});

gulp.task("css", () => {
  return gulp
    .src("dev/css/styles.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(prefixer("last 2 versions"))
    .pipe(gulp.dest("dist"));
});

gulp.task("js", () => {
  return gulp.src("dev/script.js").pipe(gulp.dest("dist"));
});

gulp.task("assets", () => {
  return gulp
    .src("dev/assets/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/assets"));
});

gulp.task("watch", () => {
  require("./server");
  gulp.watch("dev/*.html", gulp.series("html"));
  gulp.watch("dev/css/**/*.scss", gulp.series("css"));
  gulp.watch("dev/script.js", gulp.series("js"));
  gulp.watch("dev/assets/*", gulp.series("assets"));
});
