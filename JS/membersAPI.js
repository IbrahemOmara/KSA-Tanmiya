document.addEventListener("DOMContentLoaded",() => {
    const membersList = document.getElementById("members-list");

    fetch("https://tanmia.nasatechnology.net/api/Association_Member")
    .then(res => {
        if (!res.ok) throw new Error('خطا في جلب البيانات'+res.status);
            return res.json()
    })
    .then(data => {
        membersList.innerHTML = ""
        const list = Array.isArray(data) ? data : (data && data.data ? data.data : []);
        const visible = list.filter(item => !(item && (item.isDelete == 1 || item.isDelete === '1' || item.isDelete === true)));
        visible.forEach(member => {
            const memberCard = document.createElement("div")
            memberCard.className = "member-card"
            memberCard.innerHTML = `
            <h3>${member.name}</h3>
            <span>عضو</span>
            `;

            membersList.appendChild(memberCard)
        });
    })

    .catch(err => {
    servicesCards.innerHTML = `<p>حدث خطأ أثناء تحميل الخدمات: ${err.message}</p>`;
    console.error(err);
    });
});