const {series, src, dest, watch} = require("gulp");

const concat = require("gulp-concat");
const clean = require("gulp-clean");
const browsersync = require('browser-sync').create();
// const uglify = require("gulp-uglify");

function copyHtml() {
    return src("./src/index.html")
        .pipe(dest("./dist"));
}

function copyJs() {
    return src("./src/**/*.js")
        .pipe(concat("app.js"))
        // .pipe(uglify())
        .pipe(dest("./dist"));
}

function copyImg() {
    return src("./src/**/*.svg")
        .pipe(dest("./dist"));
}

function copyCss() {
    return src("./src/**/*.css")
        .pipe(concat("styles.css"))
        .pipe(dest("./dist"));
}

function copyVendorCss() {
    return src([
        "./src/css/vendor/*.css",
        "./node_modules/simplelightbox/dist/simple-lightbox.css"
    ])
        .pipe(concat("vendors.css"))
        .pipe(dest("./dist"));
}

function copyVendorJs() {
    return src([
        "./node_modules/jquery/dist/jquery.min.js",
        "./node_modules/simplelightbox/dist/simple-lightbox.jquery.min.js"
    ])
        .pipe(concat("vendors.js"))
        .pipe(dest("./dist"));
}

function watchFiles() {
    watch("./src/**/*.js", function rebuild() {
        return copyJs();
    });
    watch("./src/*.css", function rebuild() {
        return copyCss();
    });
    watch("./src/*.html", function rebuild() {
        return copyHtml();
    });
}

function server(cb) {
    browsersync.init({
        server: {
            baseDir: './dist',
        },
    });

    watch('./src/**/*.js', series(copyJs, reloadBrowser));
    watch('./src/**/*.css', series(copyCss, reloadBrowser));
    cb();
}

function reloadBrowser(cb) {
    browsersync.reload();
    cb();
}

function cleanDist() {
    return src("./dist", { read:false })
        .pipe(clean());
}

module.exports = {
    build: series(
        cleanDist,
        copyHtml,
        copyJs,
        copyCss,
        copyVendorJs,
        copyVendorCss,
        copyImg
    ),
    serve: series(
        cleanDist,
        copyHtml,
        copyJs,
        copyCss,
        copyVendorJs,
        copyVendorCss,
        copyImg,
        // watchFiles,
        server
    ),
}