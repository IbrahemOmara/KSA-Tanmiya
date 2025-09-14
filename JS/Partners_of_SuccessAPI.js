document.addEventListener("DOMContentLoaded", () => {
    const allPartners = document.getElementById("Partners-of-Success");

    fetch("https://tanmia.nasatechnology.net/api/Partners_of_Success")
        .then(res => {
            if (!res.ok) throw new Error("خطا في جلب البيانات " + res.status);
            return res.json();
        })
        .then(data => {
            allPartners.innerHTML = "";

            // فلترة الاكتف بس
            const activePartners = data.filter(p => p.isActive === 1);

            // أول مجموعة لوجوهات
            const partners = document.createElement("div");
            partners.className = "logo-group";

            activePartners.forEach(logo => {
                const image = document.createElement("img");
                image.src = "/logo/شعار الجمعية شفاف.png"; // أو logo.imageUrl من API لو موجود
                image.alt = logo.partnerName;
                partners.appendChild(image);
            });

            // تاني مجموعة لوجوهات
            const partners2 = document.createElement("div");
            partners2.className = "logo-group";

            activePartners.forEach(logo => {
                const image = document.createElement("img");
                image.src = "/logo/شعار جمعية أم الساهك أسود.jpg";
                image.alt = logo.partnerName;
                partners2.appendChild(image);
            });

            // إضافتهم للـ DOM
            allPartners.appendChild(partners);
            allPartners.appendChild(partners2);
        })
        .catch(err => console.error(err));
});
