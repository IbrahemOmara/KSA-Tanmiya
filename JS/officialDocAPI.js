document.addEventListener("DOMContentLoaded", () => {
    const policies = document.getElementById("policies");

    fetch("https://tanmia.nasatechnology.net/api/Policies_and_regulations")
        .then(res => {
            if (!res.ok) throw new Error("خطأ في جلب البيانات " + res.status);
            return res.json();
        })
        .then(data => {
            policies.innerHTML = "";
            const list = Array.isArray(data) ? data : (data && data.data ? data.data : []);
            const visible = list.filter(item => !(item && (item.isDelete == 1 || item.isDelete === '1' || item.isDelete === true)));
            visible.forEach(police => {
                const policeCard = document.createElement("a");

                policeCard.href = police.policyURL; // لو عايز الرابط يشتغل
                policeCard.target = "_blank"; 
                policeCard.innerHTML = `
                    <span>${police.policyName}</span>
                    <img src="/images/document34.png" alt="">
                `;
                policies.appendChild(policeCard); // ✅ الإضافة للـ DOM
            });
        })
        .catch(err => {
            policies.innerHTML = `<p>حدث خطأ أثناء تحميل السياسات: ${err.message}</p>`;
            console.error(err);
        });
});


document.addEventListener("DOMContentLoaded", () => {
    const policies = document.getElementById("Disclosures");

    fetch("https://tanmia.nasatechnology.net/api/Disclosure")
        .then(res => {
            if (!res.ok) throw new Error("خطأ في جلب البيانات " + res.status);
            return res.json();
        })
        .then(data => {
            Disclosures.innerHTML = "";
            const list = Array.isArray(data) ? data : (data && data.data ? data.data : []);
            const visible = list.filter(item => !(item && (item.isDelete == 1 || item.isDelete === '1' || item.isDelete === true)));
            visible.forEach(Disclosure => {
                const DisclosureCard = document.createElement("a");

                DisclosureCard.href = Disclosure.url; // لو عايز الرابط يشتغل
                DisclosureCard.target = "_blank"
                DisclosureCard.innerHTML = `
                    <span>${Disclosure.name}</span>
                    <img src="/images/document34.png" alt="">
                `;
                Disclosures.appendChild(DisclosureCard); // ✅ الإضافة للـ DOM
            });
        })
        .catch(err => {
            policies.innerHTML = `<p>حدث خطأ أثناء تحميل السياسات: ${err.message}</p>`;
            console.error(err);
        });
});
