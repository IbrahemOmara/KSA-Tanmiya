const overlay = document.getElementById("overlay");
const overlayImage = document.getElementById("overlayImage");
const overlayTitle = document.getElementById("overlayTitle");
const overlayText = document.getElementById("overlayText");
const closeOverlay = document.getElementById("closeOverlay");
const prevBtn = document.getElementById("overlayPrev");
const nextBtn = document.getElementById("overlayNext");

let currentIndex = 0;
let cards = []; // هنخليها فاضية ونعبيها بعدين

function showNews(index) {
const card = cards[index];
overlayImage.src = card.dataset.img;
overlayTitle.textContent = card.dataset.title;
overlayText.textContent = card.dataset.content;
overlay.style.display = "flex";
currentIndex = index;
}

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

document.addEventListener("DOMContentLoaded", () => {
const newsCards = document.getElementById("news-cards");

fetch("https://tanmia.nasatechnology.net/api/Our_news")
    .then(res => {
    if (!res.ok) throw new Error("خطأ في جلب البيانات " + res.status);
    return res.json();
    })
    .then(data => {
    newsCards.innerHTML = "";
     // هنا بنفلتر الداتا ونخلي بس اللي isActive = 1
    const activeNews = data.filter(news => news.isActive == 1);
    
    activeNews.forEach(news => {
        const newsCard = document.createElement("div");
        newsCard.className = "col";
        newsCard.innerHTML = `
        <div class="card h-100">
            <img src="/images/news1.png" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${news.newsTitle}</h5>
            <a href="#overlay" class="read-more"
                data-title="${news.newsTitle}"
                data-content="${news.newsDescription}"
                data-img="/images/news1.png">قراءة المزيد..</a>
            </div>
        </div>
        `;
        newsCards.appendChild(newsCard);
    });

    // ✅ بعد ما نبني الكروت، نحدث قائمة الكروت ونربط الأحداث
    cards = document.querySelectorAll(".read-more");
    cards.forEach((card, i) => {
        card.addEventListener("click", (e) => {
        e.preventDefault();
        showNews(i);
        });
    });
    })
    .catch(err => {
    newsCards.innerHTML = `<p>حدث خطأ أثناء تحميل الأخبار: ${err.message}</p>`;
    console.error(err);
    });
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