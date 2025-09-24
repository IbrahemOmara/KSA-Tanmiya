document.addEventListener("DOMContentLoaded", () => {
    const filesList = document.getElementById("file-list");

    fetch("https://tanmia.nasatechnology.net/api/Association_Minute")
    .then(res => {
        if (!res.ok) throw new Error("خطا في جلب البيانات"+res.status);
        return res.json();
    })

    .then(data => {
        filesList.innerHTML = "";

        // هنا بنفلتر الداتا ونخلي بس اللي isActive = 1
        const activeFiles = data.filter(file => file.isActive === 1);

        activeFiles.forEach(file => {

            // هنا بناخد الجزء الأخير من اللينك (اسم الملف)
            const fileName = file.minutesURL.split('/').pop();

            const card = document.createElement("div")
            card.className = "card shadow-lg"
            card.innerHTML = `
                <div class="card-body">
                    <img src="/images/pdf-file-format.png" alt="pdf-logo">
                    <div class="info">
                        <p class="card-text">${fileName}</p>
                        <!-- الزر يفتح ملف PDF -->
                        <a href="${file.minutesURL}" target="_blank" class="btn btn-primary">
                        فتح الملف
                        </a>
                    </div>
                </div>
                `;
            filesList.appendChild(card);
        });
    })

    .catch(err => {
        filesList.innerHTML = `<p>حدث خطأ: ${err.message}</p>`;
        console.error(err);
    });
});
