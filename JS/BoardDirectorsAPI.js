document.addEventListener("DOMContentLoaded", () => {
    const membersList = document.getElementById("members-list");

    fetch("https://tanmia.nasatechnology.net/api/Board_of_Director")
    .then(res => {
        if (!res.ok) throw new Error("خطا في جلب البيانات"+res.status);
        return res.json();
    })

    .then(data => {
        membersList.innerHTML = "";

        // هنا بنفلتر الداتا ونخلي بس اللي isActive = 1
        const activeMembers = data.filter(member => member.isActive === 1);

        activeMembers.forEach(member => {
            const card = document.createElement("div")
            card.className = "member-card"
            card.innerHTML = `
            <h3>${member.name}</h3>
            <span>${member.position}</span>
            `;
            membersList.appendChild(card);
        });
    })

    .catch(err => {
        membersList.innerHTML = `<p>حدث خطأ: ${err.message}</p>`;
        console.error(err);
    });
});
