const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else if (file.endsWith('.vue')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('resources/js/Pages');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let newContent = content;
    
    // Replace class instances
    newContent = newContent.replace(/class="mt-1 w-full rounded-md border px-3 py-2"/g, 'class="mt-1 w-full theme-input"');
    newContent = newContent.replace(/class="block text-sm font-medium"/g, 'class="block text-sm font-medium text-secondary"');
    newContent = newContent.replace(/class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white"/g, 'class="btn-primary"');
    newContent = newContent.replace(/class="text-2xl font-semibold mb-6"/g, 'class="text-2xl font-semibold mb-6 theme-section-title"');
    newContent = newContent.replace(/class="w-full sm:w-auto rounded-md border px-3 py-2 text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600"/g, 'class="w-full sm:w-auto theme-input text-sm"');
    
    if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log('Updated: ' + file);
    }
});
