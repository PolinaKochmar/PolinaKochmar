const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const cssnano = require("gulp-cssnano");
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");
const concat = require("gulp-concat");
const terser = require('gulp-terser');
const rename = require("gulp-rename");
const reload = browserSync.reload;

gulp.task("html", async () => {
    reload();
    return await gulp.src("app/*.html").pipe(gulp.dest("dist"));
});

gulp.task("sass", async () => {
    reload();
    return await gulp
        .src("app/sass/*.sass")
        .pipe(concat("styles.sass"))
        .pipe(sass())
        .pipe(
            autoprefixer({
                browsers: ["last 2 versions"],
                cascade: false,
            })
        )
        .pipe(cssnano())
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest("./css"));
});

gulp.task("scripts", async () => {
    reload();
    return await gulp
        .src("app/js/*.js")
        .pipe(concat("scripts.js"))
        .pipe(terser())
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest("dist/js"));
});

gulp.task("imgs", async () => {
    reload();
    return await gulp
        .src("app/images/*.+(jpg|jpeg|png|gif)")
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
            })
        )
        .pipe(gulp.dest("./dist/images"));
});

gulp.task("watch", async () => {
    browserSync.init({
        server: "./app",
    });
    await gulp.watch("./app/*.html", gulp.series("html"));
    await gulp.watch("./app/js/*.js", gulp.series("scripts"));
    await gulp.watch("./app/sass/*.sass", gulp.series("sass"));
    await gulp.watch("./app/images/*.+(jpg|jpeg|png|gif)", gulp.series("imgs"));
});