import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, 'modules');
const sharedDir = path.join(__dirname, 'shared');
const rootFiles = [path.join(__dirname, 'App.tsx'), path.join(__dirname, 'src/config.ts')];

const replacements = [
    // Fixing trailing double quotes from the previous regex interpolation
    { regex: /(@\/modules\/[a-zA-Z0-9_\-\/]+)"/g, to: "$1'" },
    { regex: /import ([a-zA-Z0-9_-]+) from ['"](@\/modules\/[a-zA-Z0-9_\-\/]+)('|"|;)/g, to: "import $1 from '$2';" }
];

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

        replacements.forEach(rep => {
            content = content.replace(rep.regex, rep.to);
        });

        if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            changeCount++;
            console.log(`Updated: ${file}`);
        }
    });
    console.log(`Processed ${files.length} files. Changed ${changeCount} files.`);
}

walk(srcDir, (err, moduleFiles) => {
    if (err) throw err;
    walk(sharedDir, (err, shrdFiles) => {
        if (err) throw err;
        const allFiles = [...moduleFiles, ...shrdFiles, ...rootFiles].filter(f => fs.existsSync(f));
        processFiles(allFiles);
    });
});
