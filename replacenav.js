const fs = require('fs');
const path = require('path');

function walk(dir, done) {
  let results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      let file = list[i++];
      if (!file) return done(null, results);
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
}

walk('.', (err, files) => {
    let count = 0;
    const htmlFiles = files.filter(f => f.endsWith('.html'));
    
    // Pattern to grab the list item for volunteer
    // Need to account for potential active classes etc
    const regex = /<li>\s*<a([^>]*)href=["'](\/[Hh][Tt][Mm][Ll]\/)?volunteer\.html["']([^>]*)>\s*التطــوّع-الوظائف-العضوية\s*<\/a>\s*<\/li>/g;
    
    htmlFiles.forEach(file => {
        let content = fs.readFileSync(file, 'utf8');
        if (regex.test(content)) {
            // Because they could be active or normal links, we just duplicate the base
            // and remove active state from the new links to be safe
            let newContent = content.replace(regex, (match, p1, p2, p3) => {
                p1 = p1 || '';
                p2 = p2 || '';
                p3 = p3 || '';
                let stripped1 = p1.replace(/active/g, '');
                let stripped3 = p3.replace(/active/g, '');
                return `<li><a${p1}href="/HTML/volunteer.html"${p3}>التطوع</a></li>\n                            <li><a${stripped1}href="/HTML/jobs.html"${stripped3}>الوظائف</a></li>\n                            <li><a${stripped1}href="/HTML/membership.html"${stripped3}>العضوية</a></li>`;
            });
            fs.writeFileSync(file, newContent, 'utf8');
            count++;
        }
    });

    console.log('Replaced in ' + count + ' files');
});
