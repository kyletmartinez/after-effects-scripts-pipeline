"use strict"; // eslint-disable-line

const gulp = require("gulp");
const fs = require("fs");
const path = require("path");
const eslint = require("gulp-eslint");
const jsdoc2md = require("jsdoc-to-markdown");

function getFolders(folder, folders) {
    fs.readdirSync(folder).forEach(item => {
        const fullPath = path.join(folder, item);
        if (path.basename(fullPath) === "scripts") {
            folders.push(folder);
        }
        if (fs.statSync(fullPath).isDirectory() === true) {
            getFolders(fullPath, folders);
        }
    });
    return folders;
}

gulp.task("build", done => {
    getFolders("../after-effects-scripts", []).forEach(folder => {
        jsdoc2md.render({
            template: fs.readFileSync("./template.hbs", "utf8"),
            helper: "./replace.js",
            files: `${folder}/scripts/*.jsx`})
        .then(output => fs.writeFileSync(`${folder}/README.md`, output));
    });
    return done();
});

gulp.task("lint", () => {
    return gulp.src(["../after-effects-scripts/*/*.jsx"])
        .pipe(eslint({configFile: ".eslintrc"}))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
});

gulp.task("default", gulp.series("lint", "build"));