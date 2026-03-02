import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirs = [
    path.join(__dirname, 'modules'),
    path.join(__dirname, 'shared')
];
const rootFiles = [path.join(__dirname, 'App.tsx')];

function walk(dir, done) {
    let results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        let i = 0;
        (function next() {
            let file = list[i++];
            if (!file) return done(null, results);
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function (err, res) {
                        results = results.concat(res);
                        next();
                    });
                } else {
                    if (file.endsWith('.ts') || file.endsWith('.tsx')) {
                        results.push(file);
                    }
                    next();
                }
            });
        })();
    });
}

function processFiles(files) {
    let changeCount = 0;
    files.forEach(file => {
        let content = fs.readFileSync(file, 'utf8');
        let originalContent = content;

        // Fix mismatched quotes: "..."' -> '...' and '..." -> '...'
        content = content.replace(/(from|import)\s*"(.*?)'/g, "$1 '$2'");
        content = content.replace(/(from|import)\s*'(.*?)"/g, "$1 '$2'");

        // Fix double semicolons
        content = content.replace(/;;/g, ";");

        if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            changeCount++;
            console.log(`Updated: ${file}`);
        }
    });
    console.log(`Processed ${files.length} files. Changed ${changeCount} files.`);
}

walk(dirs[0], (err, moduleFiles) => {
    walk(dirs[1], (err, sharedFiles) => {
        const allFiles = [...moduleFiles, ...sharedFiles, ...rootFiles].filter(f => fs.existsSync(f));
        processFiles(allFiles);
    });
});
