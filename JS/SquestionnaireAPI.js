document.addEventListener("DOMContentLoaded",() => {
    const allCards = document.getElementById("container-s");

    fetch("https://tanmia.nasatechnology.net/api/Satisfaction_measurement")
    .then(res => {
        if (!res.ok) throw new Error("خطا في جلب البيانات " + res.status);
        return res.json()
    })
    .then(data => {
        allCards.innerHTML = ""
        const list = Array.isArray(data) ? data : (data && data.data ? data.data : []);
        const visible = list.filter(item => !(item && (item.isDelete == 1 || item.isDelete === '1' || item.isDelete === true)));

        visible.forEach(file => {
            const fileCard = document.createElement("div")
            fileCard.className = "top"
            fileCard.innerHTML = `
                <a href=""> ${file.measurementName}</a>
            `;
            allCards.appendChild(fileCard)
        })
    })
    .catch(err => {
    allCards.innerHTML = `<p>حدث خطأ أثناء تحميل الخدمات: ${err.message}</p>`;
    console.error(err);
    });
});