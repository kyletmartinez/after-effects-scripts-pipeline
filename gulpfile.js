"use strict"; // eslint-disable-line

const gulp = require("gulp");
const jsdoc2md = require("jsdoc-to-markdown");
const fs = require("fs");

gulp.task("docs", (done) => {
    jsdoc2md.render({
        template: fs.readFileSync("./template.hbs", "utf8"),
        helper: "./replace.js",
        files: "../after-effects-scripts/scripts/*.jsx"})
    .then(output => fs.writeFileSync("../after-effects-scripts/README.md", output));
    return done();
})

gulp.task("default", gulp.series("docs"));