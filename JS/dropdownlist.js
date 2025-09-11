document.addEventListener("DOMContentLoaded", function () {
        document.querySelectorAll('.dropdown-submenu > a').forEach(function (element) {
            element.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();

            // غلق أي قوائم فرعية مفتوحة
            document.querySelectorAll('.dropdown-submenu .dropdown-menu').forEach(function (submenu) {
                if (submenu !== element.nextElementSibling) {
                submenu.classList.remove('show');
                }
            });

            // فتح أو قفل القائمة اللي ضغطت عليها
            element.nextElementSibling.classList.toggle("show");
            });
        });

        // غلق القايمه الفرعيه لما تقفل الـ dropdown الرئيسي
        document.querySelectorAll('.dropdown').forEach(function (dropdown) {
            dropdown.addEventListener("hidden.bs.dropdown", function () {
            this.querySelectorAll('.dropdown-menu.show').forEach(function (submenu) {
                submenu.classList.remove('show');
            });
            });
        });
        });