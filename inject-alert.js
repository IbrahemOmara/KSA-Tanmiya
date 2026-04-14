const fs = require('fs');
const path = require('path');

const dirs = ['.', './HTML'];
let totalInjected = 0;

for (const p of dirs) {
    if(!fs.existsSync(p)) continue;
    const files = fs.readdirSync(p);
    for (const f of files) {
        if (!f.endsWith('.html')) continue;
        
        const fullPath = path.join(p, f);
        let content = fs.readFileSync(fullPath, 'utf8');
        
        if (!content.includes('custom-alert.js')) {
            content = content.replace(/<\/body>/i, '<script src="/JS/custom-alert.js"></script>\n</body>');
            fs.writeFileSync(fullPath, content, 'utf8');
            console.log(`Injected into ${fullPath}`);
            totalInjected++;
        }
    }
}
console.log(`Successfully injected custom-alert.js into ${totalInjected} files.`);
