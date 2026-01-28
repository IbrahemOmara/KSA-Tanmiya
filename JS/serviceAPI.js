document.addEventListener("DOMContentLoaded", () => {
const servicesCards = document.getElementById("services-cards");

fetch("https://tanmia.nasatechnology.net/api/service") // 🔗 حط لينك الـ API هنا
    .then(res => {
    if (!res.ok) throw new Error("خطأ في جلب البيانات: " + res.status);
    return res.json();
    })
    .then(data => {
    servicesCards.innerHTML = ""; // مسح المحتوى القديم
    const list = Array.isArray(data) ? data : (data && data.data ? data.data : []);
    const visible = list.filter(item => !(item && (item.isDelete == 1 || item.isDelete === '1' || item.isDelete === true)));

    const activeServices = visible.filter(service => service.isActive === 1 || service.isActive === '1');

    activeServices.forEach(service => {
        const card = document.createElement("div");
        card.className = "card mb-3";
        card.innerHTML = `
        <img src="${service.serviceUrl}" class="card-img-top" alt="${service.title}">
        <div class="card-body">
            <h5 class="card-title">${service.serviceName}</h5>
            <p class="card-text">${service.serviceDescription}</p>
            
        </div>
        `;
        servicesCards.appendChild(card);
    });
    })
    .catch(err => {
    servicesCards.innerHTML = `<p>حدث خطأ أثناء تحميل الخدمات: ${err.message}</p>`;
    console.error(err);
    });
});