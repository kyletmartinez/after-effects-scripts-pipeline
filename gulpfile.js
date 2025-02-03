"use strict"; // eslint-disable-line

const eslint = require("gulp-eslint");
const fs = require("fs");
const git = require("gulp-git");
const gulp = require("gulp");
const jsdoc2md = require("jsdoc-to-markdown");
const path = require("path");
const through2 = require("through2");

const baseDir = "../after-effects-scripts";

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
    getFolders(baseDir, []).forEach(folder => {
        jsdoc2md.render({
            template: fs.readFileSync("./template.hbs", "utf8"),
            helper: "./replace.js",
            files: `${folder}/scripts/*.jsx`})
        .then(output => fs.writeFileSync(`${folder}/README.md`, output));
    });
    return done();
});

gulp.task("version", () => {
    return git.exec({args: "diff --name-only", log: true, cwd: baseDir}, (err, stdout) => {
        const files = stdout.trim().split("\n").map(file => `${baseDir}/**/${file}`);
        if (files && files.length === 0) return;
        return gulp.src(files)
            .pipe(through2.obj((file, enc, cb) => {
                if (file.contents !== null) {
                    let content = file.contents.toString(enc);
                    const versionString = content.match(/@version\s\d\.\d/g)[0];
                    const oldVersion = parseFloat(versionString.split(" ")[1]);
                    const newVersion = String(oldVersion + 0.1);
                    content = content.replace(/@version\s\d\.\d/g, `@version ${newVersion}`);
                    file.contents = Buffer.from(content);
                }
                cb(null, file);
            }))
            .pipe(gulp.dest(baseDir));
    });
});

gulp.task("lint", () => {
    return gulp.src([`${baseDir}/**/*/*.jsx`])
        .pipe(eslint({configFile: ".eslintrc.json"}))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task("default", gulp.series("lint", "version", "build"));