"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var minify = require("gulp-minifier");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");

gulp.task("SassCompile", function () {
    const plugins = [
        autoprefixer({ browsers: ["last 2 version"] }),
        cssnano()
    ];
    return gulp.src([
        "./Content/Theme/App.scss"
    ]).pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(postcss(plugins))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./Content"));
});

gulp.task("Default", function () {
    gulp.watch([
        "./Content/**/*.scss",
        "./Content/**/*.js"
    ],
        ["SassCompile"]
    );
});