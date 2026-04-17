const fs = require('fs');

let source = fs.readFileSync('HTML/admin-membership.html', 'utf8');

// Insert the HTML block for text editing
const htmlBlock = `
    <div class="card mb-4" style="border: 1px solid #007c8b;">
      <div class="card-header text-white" style="background-color: #007c8b;">
        شروط العضوية (تظهر في صفحة العضوية)
      </div>
      <div class="card-body">
        <textarea id="conditions-text" class="form-control" rows="5" placeholder="اكتب شروط العضوية هنا..."></textarea>
        <div class="mt-2 d-flex justify-content-end">
          <button id="save-conditions" class="btn btn-success">حفظ الشروط</button>
        </div>
        <div id="conditions-msg" class="mt-2"></div>
      </div>
    </div>
`;

source = source.replace(/<div id="items" class="mb-3"><\/div>/, htmlBlock + '\n    <hr>\n    <h5>ملفات العضوية (الصور و PDF)</h5>\n    <div id="items" class="mb-3"></div>');

// Now inject JS for saving/loading the text
const jsBlock = `
  let conditionsItemId = null;

  async function loadConditions() {
    try {
      const res = await fetch(API);
      if(!res.ok) return;
      const data = await res.json();
      const list = Array.isArray(data) ? data : (data && data.data ? data.data : []);
      const condItem = list.find(item => {
          const name = item.MembershipName || item.membershipName || '';
          return name === '[CONDITIONS]' && !(item.isDelete == 1 || item.isDelete === '1' || item.isDelete === true);
      });
      
      if(condItem) {
          conditionsItemId = condItem.id || condItem._id || condItem.Id || condItem.ID;
          const url = condItem.MembershipUrl || condItem.membershipUrl || '';
          if(url) {
              const textRes = await fetch(url);
              if(textRes.ok) {
                  document.getElementById('conditions-text').value = await textRes.text();
              }
          }
      }
    } catch(err) { console.error('Error loading conditions:', err); }
  }

  document.getElementById('save-conditions').addEventListener('click', async () => {
      const text = document.getElementById('conditions-text').value;
      const msg = document.getElementById('conditions-msg');
      msg.innerHTML = '<span class="text-primary">جاري الحفظ...</span>';
      
      const token = localStorage.getItem('authToken');
      if(!token) { msg.innerHTML = '<span class="text-danger">غير مسجل دخول</span>'; return; }

      // Create a text file blob
      const file = new File([text], 'conditions.txt', { type: 'text/plain' });
      const form = new FormData();
      form.append('MembershipName', '[CONDITIONS]');
      form.append('MembershipUrl', file);

      try {
          let res;
          if(conditionsItemId) {
              res = await fetch(API + '/' + encodeURIComponent(conditionsItemId), { method: 'PUT', headers: { 'Authorization': 'Bearer ' + token }, body: form });
          } else {
              res = await fetch(API, { method: 'POST', headers: { 'Authorization': 'Bearer ' + token }, body: form });
          }

          if(res.ok) {
              msg.innerHTML = '<span class="text-success">تم حفظ الشروط بنجاح!</span>';
              if(!conditionsItemId) loadConditions(); // reload to get ID
          } else {
              msg.innerHTML = '<span class="text-danger">فشل الحفظ</span>';
          }
      } catch(err) {
          msg.innerHTML = '<span class="text-danger">خطأ في الاتصال</span>';
      }
  });

  // Load specifically
  loadConditions();
`;

source = source.replace(/\/\/ init\s*loadItems\(\);/, jsBlock + '\n\n  // init\n  loadItems();');

// Hide [CONDITIONS] from standard list
source = source.replace(/const visible = list\.filter\(item => !\(item && \(item\.isDelete == 1 \|\| item\.isDelete === '1' \|\| item\.isDelete === true\)\)\);/, `const visible = list.filter(item => {
        const name = item.MembershipName || item.membershipName || '';
        if(name === '[CONDITIONS]') return false;
        return !(item && (item.isDelete == 1 || item.isDelete === '1' || item.isDelete === true));
      });`);

fs.writeFileSync('HTML/admin-membership.html', source, 'utf8');
console.log('done!');
