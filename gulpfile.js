"use strict";

const sass = require("gulp-sass")(require("sass"));
const gulp = require("gulp");
const gutil = require("gulp-util");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const bs = require("browser-sync").create();
const rimraf = require("rimraf");
const comments = require("gulp-header-comment");
const jshint = require("gulp-jshint");
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");

var path = {
    src: {
        js: "source/js/*.js",
        scss: "source/scss/**/*.scss",
    },
    build: {
        dirDev: "theme/",
    },
};

// SCSS
gulp.task("scss:build", function() {
    return gulp
        .src(path.src.scss)
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                outputStyle: "expanded",
            }).on("error", sass.logError)
        )
        .pipe(autoprefixer())
        .pipe(sourcemaps.write("/"))
        .pipe(
            comments(`
    `)
        )
        .pipe(gulp.dest(path.build.dirDev + "css/"))
        .pipe(
            bs.reload({
                stream: true,
            })
        );
});

// Javascript
gulp.task("js:build", function() {
    return gulp
        .src(path.src.js)
        .pipe(jshint("./.jshintrc"))
        .pipe(
            notify(function(file) {
                if (!file.jshint.success) {
                    return (
                        file.relative + " (" + file.jshint.results.length + " errors)\n"
                    );
                }
            })
        )
        .pipe(jshint.reporter("jshint-stylish"))
        .on("error", gutil.log)
        .pipe(
            comments(`
    `)
        )
        .pipe(gulp.dest(path.build.dirDev + "js/"))
        .pipe(
            bs.reload({
                stream: true,
            })
        );
});

// Clean Build Folder
gulp.task("clean", function(cb) {
    rimraf("./theme", cb);
});

// Error Message Show
function customPlumber(errTitle) {
    return plumber({
        errorHandler: notify.onError({
            // Customizing error title
            title: errTitle || "Error running Gulp",
            message: "Error: <%= error.message %>",
            sound: "Glass",
        }),
    });
}

// Watch Task
gulp.task("watch:build", function() {
    gulp.watch(path.src.scss, gulp.series("scss:build"));
    gulp.watch(path.src.js, gulp.series("js:build"));
});

// Dev Task
gulp.task(
    "default",
    gulp.series(
        "clean",
        "scss:build",
        "js:build",
        gulp.parallel("watch:build", function() {
            bs.init({
                server: {
                    baseDir: path.build.dirDev,
                },
            });
        })
    )
);

// Build Task
gulp.task("build", gulp.series("scss:build", "js:build"));