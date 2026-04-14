const fs = require('fs');

// 1. Process volunteer.html
let vHtml = fs.readFileSync('HTML/volunteer.html', 'utf8');

// The original file navigation still has the old "التطــوّع-الوظائف-العضوية". Let's use our replacenav regex again for this specific file.
const navRegex = /<li>\s*<a([^>]*)href=["'](\/[Hh][Tt][Mm][Ll]\/)?volunteer\.html["']([^>]*)>\s*التطــوّع-الوظائف-العضوية\s*<\/a>\s*<\/li>/g;
vHtml = vHtml.replace(navRegex, (match, p1, p2, p3) => {
    p1 = p1 || '';
    p2 = p2 || '';
    p3 = p3 || '';
    let stripped1 = p1.replace(/active/g, '');
    let stripped3 = p3.replace(/active/g, '');
    return `<li><a${p1}href="/HTML/volunteer.html"${p3}>التطوع</a></li>\n                            <li><a${stripped1}href="/HTML/jobs.html"${stripped3}>الوظائف</a></li>\n                            <li><a${stripped1}href="/HTML/membership.html"${stripped3}>العضوية</a></li>`;
});

// Update the `<title>`
vHtml = vHtml.replace(/<title>[\s\S]*?<\/title>/, '<title>      التطوع - جمعيه التنميه الاهليه بأم الساهك</title>');

// Remove the `container-v2` holding jobs and membership.
// We'll cautiously replace until `</section>`
vHtml = vHtml.replace(/<div class="container-v2" id="membership">[\s\S]*?<\/section>/, '</section>');

fs.writeFileSync('HTML/volunteer.html', vHtml, 'utf8');

// 2. Create jobs.html
let jHtml = vHtml.replace(/<title>[\s\S]*?<\/title>/, '<title>      الوظائف - جمعيه التنميه الاهليه بأم الساهك</title>');
// Replace the h1 title
jHtml = jHtml.replace(/<h1>.*?<\/h1>/, '<h1>الوظائف</h1>');
// Remove the specific content of container-v but keep the container itself so we can have an empty box.
// Or just clear the inside of container-v
jHtml = jHtml.replace(/<div class="container-v">[\s\S]*?<\/div>\s*<\/div>/, '<div class="container-v" style="min-height: 40vh; display:flex; justify-content:center; align-items:center;">\n            <span class="text-muted fs-4">لا توجد وظائف شاغرة في الوقت الحالي</span>\n        </div>');

// Write jobs.html
fs.writeFileSync('HTML/jobs.html', jHtml, 'utf8');


// 3. Create membership.html
let mHtml = vHtml.replace(/<title>[\s\S]*?<\/title>/, '<title>      العضوية - جمعيه التنميه الاهليه بأم الساهك</title>');
mHtml = mHtml.replace(/<h1>.*?<\/h1>/, '<h1>العضوية</h1>');
mHtml = mHtml.replace(/<div class="container-v">[\s\S]*?<\/div>\s*<\/div>/, '<div class="container-v" style="min-height: 40vh; display:flex; justify-content:center; align-items:center;">\n            <span class="text-muted fs-4">قريباً..</span>\n        </div>');

// Write membership.html
fs.writeFileSync('HTML/membership.html', mHtml, 'utf8');

console.log('Successfully created separate pages!');
