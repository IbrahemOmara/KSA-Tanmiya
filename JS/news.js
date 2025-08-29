const overlay = document.getElementById("overlay");
const overlayImage = document.getElementById("overlayImage");
const overlayTitle = document.getElementById("overlayTitle");
const overlayText = document.getElementById("overlayText");
const closeOverlay = document.getElementById("closeOverlay");
const prevBtn = document.getElementById("overlayPrev");
const nextBtn = document.getElementById("overlayNext");

let currentIndex = 0;
const cards = document.querySelectorAll(".read-more");

function showNews(index) {
const card = cards[index];
overlayImage.src = card.dataset.img;
overlayTitle.textContent = card.dataset.title;
overlayText.textContent = card.dataset.content;
overlay.style.display = "flex";
currentIndex = index;
}

// فتح عند الضغط
cards.forEach((card, i) => {
card.addEventListener("click", (e) => {
    e.preventDefault();
    showNews(i);
});
});

// غلق الأوفرلاي
closeOverlay.addEventListener("click", () => overlay.style.display = "none");
overlay.addEventListener("click", (e) => {
if (e.target === overlay) overlay.style.display = "none";
});

// قلب بين الأخبار
prevBtn.addEventListener("click", () => {
currentIndex = (currentIndex - 1 + cards.length) % cards.length;
showNews(currentIndex);
});
nextBtn.addEventListener("click", () => {
currentIndex = (currentIndex + 1) % cards.length;
showNews(currentIndex);
});





//------------form-------------

        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault(); // امنع الإرسال العادي
            const form = this;
            fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
            }).then(response => {
            if (response.ok) {
                form.style.display = 'none'; // اخفي الفورم
                const msg = document.createElement('div');
                msg.innerHTML = "<h3 style='color: #4CAF50;'>تم إرسال رسالتك بنجاح! سنرد عليك قريبًا.</h3>";
                form.parentNode.appendChild(msg);
            } else {
                alert("حدث خطأ أثناء الإرسال. حاول مرة أخرى.");
            }
            }).catch(error => {
            alert("حدث خطأ أثناء الإرسال. حاول مرة أخرى.");
            });
        });