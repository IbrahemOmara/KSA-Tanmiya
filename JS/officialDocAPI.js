document.addEventListener("DOMContentLoaded", () => {
    const policies = document.getElementById("policies");

    fetch("https://tanmia.nasatechnology.net/api/Policies_and_regulations")
        .then(res => {
            if (!res.ok) throw new Error("خطأ في جلب البيانات " + res.status);
            return res.json();
        })
        .then(data => {
            policies.innerHTML = "";
            data.forEach(police => {
                const policeCard = document.createElement("a");
                
                policeCard.href = "#"; // لو عايز الرابط يشتغل
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
            data.forEach(Disclosure => {
                const DisclosureCard = document.createElement("a");
                
                DisclosureCard.href = "#"; // لو عايز الرابط يشتغل
                DisclosureCard.innerHTML = `
                    <span>${Disclosure.name}</span>
                    <img src="/images/document34.png" alt="">
                `;
                Disclosures.appendChild(DisclosureCard); // ✅ الإضافة للـ DOM
            });
        })
        .catch(err => {
            Disclosures.innerHTML = `<p>حدث خطأ أثناء تحميل السياسات: ${err.message}</p>`;
            console.error(err);
        });
});
