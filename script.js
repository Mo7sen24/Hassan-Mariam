document.addEventListener("DOMContentLoaded", () => {
    const card = document.querySelector(".card-container");
    
    // تشغيل الأنيميشن والحركات فور تحميل الصفحة
    setTimeout(() => {
        card.classList.add("loaded");
    }, 200);
});
