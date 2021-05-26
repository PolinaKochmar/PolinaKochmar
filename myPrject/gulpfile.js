const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const less = require("gulp-less");
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

gulp.task("less", async () => {
    reload();
    return await gulp
        .src("app/less/*.less")
        .pipe(less())
        .pipe(concat("styles.css"))
        .pipe(
            autoprefixer({
                browsers: ["last 2 versions"],
                cascade: false,
            })
        )
        .pipe(cssnano())
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest("app/css"));
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
    await gulp.watch("./app/less/*.less", gulp.series("less"));
    await gulp.watch("./app/images/*.+(jpg|jpeg|png|gif)", gulp.series("imgs"));
});