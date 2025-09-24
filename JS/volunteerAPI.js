document.addEventListener("DOMContentLoaded", () => {
    const memberships = document.getElementById("membership");

    fetch("https://tanmia.nasatechnology.net/api/Membership")
        .then(res => {
            if (!res.ok) throw new Error("خطأ في جلب البيانات " + res.status);
            return res.json();
        })
        .then(data => {
            memberships.innerHTML = "";

            // 👇 نفلتر الداتا
            const activeMemberships = data.filter(m => m.isActive === 1);

            // 👇 جزء العضويات
            const membershipContainer = document.createElement("div");
            membershipContainer.className = "part-2";
            membershipContainer.innerHTML = `<h2>العضوية</h2>`;

            activeMemberships.forEach(membership => {
                const link = document.createElement("a");
                link.href = membership.membershipUrl; // لو في لينك بالـ API ضيفه هنا
                link.target = "_blank";
                link.textContent = membership.membershipName;
                membershipContainer.appendChild(link);
            });

            // 👇 جزء الوظائف (مرة واحدة فقط)
            const jobCard = document.createElement("div");
            jobCard.className = "part-3";
            jobCard.innerHTML = `
                <h2>الوظائف الشاغرة</h2>
                <span>لا توجد وظائف شاغرة في الوقت الحالي</span>
                <span>يمكن إرسال السيرة الذاتية عبرَ:</span>
                <span class="email">tanmyah-um.org.sa</span>
                <span>وسيتم التواصل معكم بإذن الله في حال وجود احتياج</span>
            `;

            memberships.appendChild(membershipContainer);
            memberships.appendChild(jobCard);
        })
        .catch(err => {
            memberships.innerHTML = `<p>حدث خطأ أثناء تحميل العضويات: ${err.message}</p>`;
            console.error(err);
        });
});
