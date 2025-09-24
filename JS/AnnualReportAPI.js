document.addEventListener("DOMContentLoaded",() => {
    const filesList = document.getElementById("files-list");

    fetch("https://tanmia.nasatechnology.net/api/Annual_report")
    .then(res => {
        if (!res.ok) throw new Error("خطا في جلب البيانات" + res.status);
        return res.json()
    })
    .then(data => {
        filesList.innerHTML = ""
        data.forEach(file => {
            const fileCard = document.createElement("div")
            fileCard.className = "card shadow-lg"
            fileCard.innerHTML = `
            <div class="card-body">
                    <img src="/images/pdf2.png" alt="pdf-logo">
                    <div class="info">
                        <p class="card-text">${file.reportName}</p>
                        <!-- الزر يفتح ملف PDF -->
                        <a href="${file.reportURL}" target="_blank" class="btn btn-primary">
                        فتح الملف
                        </a>
                    </div>
                </div>
            `;

            filesList.appendChild(fileCard);
        })
    })

    .catch(err => {
    filesList.innerHTML = `<p>حدث خطأ أثناء تحميل الخدمات: ${err.message}</p>`;
    console.error(err);
    });
});