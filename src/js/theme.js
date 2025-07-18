export const initializeTheme = () => {
    const btnTheme = document.querySelector(".btn_theme");
    const icon = document.querySelector('.icon');
    const body = document.body;

    function toggleTheme(isDark) {
        body.classList.toggle('dark', isDark);
        icon.classList.toggle('fa-sun', isDark);
        icon.classList.toggle('fa-moon', !isDark);
        localStorage.setItem('theme', isDark ? 'enabled' : 'disabled');
    }

    function checkTheme() {
        const theme = localStorage.getItem('theme');
        const isDark = theme === 'enabled';
        toggleTheme(isDark);
    }

    btnTheme.addEventListener("click", () => {
        const isDark = body.classList.contains('dark');
        toggleTheme(!isDark);
    });

    checkTheme();
};

document.addEventListener("DOMContentLoaded", initializeTheme);





