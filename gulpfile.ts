import { dest, series } from 'gulp'
import ts from 'gulp-typescript';
import del from 'del';
const { exec } = require('child_process');
// function copyUI() {
//     return src(["src/ui/*", "!src/ui/**/*.ts"])
//         .pipe(dest("dist/ui/"));
// }

function compileTS() {
    let proj = ts.createProject("tsconfig.json")
    return proj.src()
        .pipe(proj())
        .js.pipe(dest("dist"))
}

function compileUI() {
return exec("parcel build -d ./dist/ui ./src/ui/index.html --no-minify")
}
function clean() {
    return del(["dist/**", "!dist"], { force: true })
}

exports.build = series(clean, compileTS, compileUI)