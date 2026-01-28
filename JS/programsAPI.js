document.addEventListener("DOMContentLoaded",() => {

    const programsCards = document.getElementById("programs-cards");

    fetch("https://tanmia.nasatechnology.net/api/Program")
    .then(res => {
        if (!res.ok) throw new Error("خطأ في جلب البيانات " + res.status);
        return res.json()
    })
    .then (data => {
        programsCards.innerHTML = "";
        const list = Array.isArray(data) ? data : (data && data.data ? data.data : []);
        const visible = list.filter(item => !(item && (item.isDelete == 1 || item.isDelete === '1' || item.isDelete === true)));
        const activeProg = visible.filter(program => program.isActive === 1 || program.isActive === '1');
        activeProg.forEach(program => {
            const progCard = document.createElement("div")
            progCard.className = "col"
            progCard.innerHTML = `
            <div class="card h-100">
                <img src="${program.programUrl}" class="card-img-top" alt="..." style = "height:200px">
                <div class="card-body">
                    <h5 class="card-title">${program.programName}</h5>
                    <p></p>
                </div>
            </div>
            `;
            programsCards.appendChild(progCard)
        });
    })

    .catch(err => {
    programsCards.innerHTML = `<p>حدث خطأ أثناء تحميل الخدمات: ${err.message}</p>`;
    console.error(err);
    });

});