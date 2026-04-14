const fs = require('fs');

let source = fs.readFileSync('HTML/contactUs.html', 'utf8');

// Replace standard tags
source = source.replace(/<title>.*?<\/title>/, '<title>الوظائف - جمعيه التنميه الاهليه بأم الساهك</title>');

// Switch active nav class from contactUs to jobs
source = source.replace(/class="nav-link active" href="\/HTML\/contactUs\.html"/, 'class="nav-link" href="/HTML/contactUs.html"');
source = source.replace(/class="dropdown-item " href="\/HTML\/jobs\.html"/, 'class="dropdown-item active" href="/HTML/jobs.html"');

// Update Titles & text
source = source.replace(/<h1>للاقتراحات و الشكاوي\s*<\/h1>/, '<h1>الوظائف</h1>');
source = source.replace(/<h2>اتصل بنا\.\.\.<\/h2>/, '<h2>تقديم طلب توظيف...</h2>');
source = source.replace(/نحن هنا للإجابة على استفساراتكم واستقبال مقترحاتكم\. يمكنكم التواصل معنا من خلال النموذج أدناه أو عبر وسائل الاتصال المتاحة\./, 'نسعد بانضمامك لفريقنا! في حال توفر شواغر تناسبك سيتم التواصل معك. يرجى تعبئة النموذج أدناه وتضمين رابط سيرتك الذاتية.');

source = source.replace(/رسالة جديدة من موقع الشركة/g, 'طلب توظيف جديد من الموقع');
source = source.replace(/الرساله/, 'نبذة عنك / رابط السيرة الذاتية (Google Drive أو غيره)');
source = source.replace(/ادخل رسالتك او شكوتك /, 'اكتب نبذة عن مؤهلاتك أو ضع رابط السيرة الذاتية هنا...');

source = source.replace(/تم إرسال رسالتك بنجاح! سنرد عليك قريبًا\./g, 'تم إرسال طلب التوظيف بنجاح! سنتواصل معك في حال وجود شواغر تناسب مؤهلاتك.');

// Write back to jobs.html
fs.writeFileSync('HTML/jobs.html', source, 'utf8');
console.log('done!');
