document.addEventListener("DOMContentLoaded", () => {
    const membersList = document.getElementById("members-list");

    fetch("https://tanmia.nasatechnology.net/api/Board_of_Director")
    .then(res => {
        if (!res.ok) throw new Error("خطا في جلب البيانات"+res.status);
        return res.json();
    })

    .then(data => {
        membersList.innerHTML = "";
        const list = Array.isArray(data) ? data : (data && data.data ? data.data : []);
        // استبعد العناصر المعلّمة كمحذوفة حيث isDelete == 0
        const visible = list.filter(item => !(item && (item.isDelete == 1 || item.isDelete === '1' || item.isDelete === true)));

        // هنا بنفلتر الداتا ونخلي بس اللي isActive = 1
        const activeMembers = visible.filter(member => member.isActive === 1 || member.isActive === '1');

        activeMembers.forEach(item => {
            let rawName = item.name || '';
            let order = 999;
            let cleanName = rawName;
            const match = cleanName.match(/^\[ORDER:(\d+)\]\s*(.*)$/);
            if(match){
                order = parseInt(match[1], 10);
                cleanName = match[2];
            }
            item._parsedOrder = order;
            item._cleanName = cleanName;
        });

        activeMembers.sort((a,b) => a._parsedOrder - b._parsedOrder);

        activeMembers.forEach(member => {
            const card = document.createElement("div")
            card.className = "member-card"
            card.innerHTML = `
            <h3>${member._cleanName}</h3>
            <span>${member.position || ''}</span>
            `;
            membersList.appendChild(card);
        });
    })

    .catch(err => {
        membersList.innerHTML = `<p>حدث خطأ: ${err.message}</p>`;
        console.error(err);
    });
});
