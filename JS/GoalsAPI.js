document.addEventListener("DOMContentLoaded", () => {
    const goalsLinks = document.getElementById("goals-links");

    fetch("https://tanmia.nasatechnology.net/api/Strategic_and_operational_objectivesControllerr")
        .then(res => {
            if (!res.ok) throw new Error("خطأ في جلب البيانات " + res.status);
            return res.json();
        })
        .then(data => {
            goalsLinks.innerHTML = "";
            const list = Array.isArray(data) ? data : (data && data.data ? data.data : []);
            const visible = list.filter(item => !(item && (item.isDelete == 1 || item.isDelete === '1' || item.isDelete === true)));

            // 👇 نفلتر الداتا
            const activegoals = visible.filter(m => m.isActive === 1 || m.isActive === '1');

            activegoals.forEach(goal => {
                const link = document.createElement("a");
                link.href = goal.objectiveURL; // لو في لينك بالـ API ضيفه هنا
                link.target = "_blank";
                link.textContent = goal.objectiveName;
                goalsLinks.appendChild(link);
            });


        })
        .catch(err => {
            goalsLinks.innerHTML = `<p>حدث خطأ أثناء تحميل العضويات: ${err.message}</p>`;
            console.error(err);
        });
});
