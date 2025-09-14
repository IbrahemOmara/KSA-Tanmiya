document.addEventListener("DOMContentLoaded",() => {

    const programsCards = document.getElementById("programs-cards");

    fetch("https://tanmia.nasatechnology.net/api/Program")
    .then(res => {
        if (!res.ok) throw new Error("خطأ في جلب البيانات " + res.status);
        return res.json()
    })
    .then (data => {
        programsCards.innerHTML = "";
        data.forEach(program => {
            const progCard = document.createElement("div")
            progCard.className = "col"
            progCard.innerHTML = `
            <div class="card h-100">
                <img src="/images/مَعرض-التخصصات.png" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${program.programName}</h5>
                    <p>${program.programDescription}</p>
                </div>
            </div>
            `;
            programsCards.appendChild(progCard)
        });
    })

    .catch(err => {
    servicesCards.innerHTML = `<p>حدث خطأ أثناء تحميل الخدمات: ${err.message}</p>`;
    console.error(err);
    });

});