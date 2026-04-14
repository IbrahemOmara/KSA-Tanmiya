const progOverlay = document.getElementById("prog-overlay");
const progOverlayImage = document.getElementById("progOverlayImage");
const progOverlayTitle = document.getElementById("progOverlayTitle");
const progOverlayText = document.getElementById("progOverlayText");
const closeProgOverlay = document.getElementById("closeProgOverlay");
const progPrevBtn = document.getElementById("progOverlayPrev");
const progNextBtn = document.getElementById("progOverlayNext");

let currentProgIndex = 0;
let progCards = []; 

function showProgram(index) {
    if(!progCards[index] || !progOverlay) return;
    const card = progCards[index];
    if(progOverlayImage) progOverlayImage.src = card.dataset.img;
    if(progOverlayTitle) progOverlayTitle.textContent = card.dataset.title;
    if(progOverlayText) progOverlayText.textContent = card.dataset.content;
    progOverlay.style.display = "flex";
    currentProgIndex = index;
}

if(closeProgOverlay){
    closeProgOverlay.addEventListener("click", () => progOverlay.style.display = "none");
}
if(progOverlay){
    progOverlay.addEventListener("click", (e) => {
        if (e.target === progOverlay) progOverlay.style.display = "none";
    });
}
if(progPrevBtn && progNextBtn){
    progPrevBtn.addEventListener("click", () => {
        if(progCards.length === 0) return;
        currentProgIndex = (currentProgIndex - 1 + progCards.length) % progCards.length;
        showProgram(currentProgIndex);
    });
    progNextBtn.addEventListener("click", () => {
        if(progCards.length === 0) return;
        currentProgIndex = (currentProgIndex + 1) % progCards.length;
        showProgram(currentProgIndex);
    });
}

document.addEventListener("DOMContentLoaded",() => {

    const programsCards = document.getElementById("programs-cards");
    if(!programsCards) return;

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
            const desc = program.programDescription || program.description || 'لا يوجد وصف متاح لهذا البرنامج.';
            progCard.innerHTML = `
            <div class="card h-100">
                <img src="${program.programUrl || ''}" class="card-img-top" alt="..." style="height:200px; object-fit:cover;">
                <div class="card-body">
                    <h5 class="card-title">${program.programName || ''}</h5>
                    <a href="#prog-overlay" class="prog-read-more"
                        data-title="${program.programName || ''}"
                        data-content="${desc.replace(/"/g, '&quot;')}"
                        data-img="${program.programUrl || ''}" style="color:var(--primary, #007c8b); font-weight:600; cursor:pointer;">قراءة المزيد..</a>
                </div>
            </div>
            `;
            programsCards.appendChild(progCard)
        });

        progCards = document.querySelectorAll(".prog-read-more");
        progCards.forEach((card, i) => {
            card.addEventListener("click", (e) => {
                e.preventDefault();
                showProgram(i);
            });
        });
    })

    .catch(err => {
    programsCards.innerHTML = `<p>حدث خطأ أثناء تحميل الخدمات: ${err.message}</p>`;
    console.error(err);
    });

});