const fs = require('fs');

let source = fs.readFileSync('HTML/membership.html', 'utf8');

// Replace the placeholder container with a real layout
const realLayout = `
        <div class="container-v" style="display:flex; flex-direction:column; gap:20px; text-align:right;">
            <div id="conditions-render" style="width: 100%; white-space: pre-wrap; font-size: 1.1rem; line-height: 1.8; background:#f9f9f9; padding:20px; border-radius:8px; border:1px solid #e0e0e0;">
                جاري تحميل الشروط...
            </div>
            
            <div id="membership-links" class="mt-4 d-flex flex-wrap gap-3">
                <!-- PDF Links will load here automatically -->
            </div>
        </div>
`;

source = source.replace(/<div class="container-v" style="min-height: 40vh; display:flex; justify-content:center; align-items:center;">[\s\S]*?<\/div>/, realLayout);

// Add the JS fetching script right before </body>
const jsScript = `
    <script>
        document.addEventListener("DOMContentLoaded", async () => {
            const conditionsContainer = document.getElementById("conditions-render");
            const linksContainer = document.getElementById("membership-links");
            
            try {
                const res = await fetch("https://tanmia.nasatechnology.net/api/Membership");
                if(!res.ok) throw new Error("Failed to fetch");
                const data = await res.json();
                const list = Array.isArray(data) ? data : (data && data.data ? data.data : []);
                
                // Process [CONDITIONS] text
                const condItem = list.find(item => {
                    const name = item.MembershipName || item.membershipName || '';
                    return name === '[CONDITIONS]' && !(item.isDelete == 1 || item.isDelete === '1' || item.isDelete === true);
                });

                if(condItem) {
                    const url = condItem.MembershipUrl || condItem.membershipUrl || '';
                    if(url) {
                        const textRes = await fetch(url);
                        if(textRes.ok) {
                            conditionsContainer.innerHTML = await textRes.text();
                        } else {
                            conditionsContainer.innerHTML = "تعذر تحميل الشروط.";
                        }
                    } else {
                        conditionsContainer.innerHTML = "لم يتم تحديد شروط بعد.";
                    }
                } else {
                    conditionsContainer.innerHTML = "لم يتم تحديد شروط بعد.";
                }

                // Process standard PDF/Images memberships
                linksContainer.innerHTML = "";
                const standardItems = list.filter(item => {
                    const name = item.MembershipName || item.membershipName || '';
                    return name !== '[CONDITIONS]' && !(item.isDelete == 1 || item.isDelete === '1' || item.isDelete === true);
                });

                standardItems.forEach(item => {
                    const name = item.MembershipName || item.membershipName || 'عضوية';
                    const url = item.MembershipUrl || item.membershipUrl || '#';
                    const link = document.createElement("a");
                    link.href = url;
                    link.target = "_blank";
                    link.className = "btn";
                    link.style = "background-color: #007c8b; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold;";
                    link.innerHTML = \`<i class="fa-solid fa-file-pdf"></i> \${name}\`;
                    linksContainer.appendChild(link);
                });

            } catch(e) {
                console.error(e);
                conditionsContainer.innerHTML = "خطأ في تحميل البيانات.";
            }
        });
    </script>
`;

source = source.replace(/<script src="\/JS\/volunteerAPI\.js"><\/script>/, jsScript);

fs.writeFileSync('HTML/membership.html', source, 'utf8');
console.log('Membership updated!');
