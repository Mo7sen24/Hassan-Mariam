document.addEventListener('DOMContentLoaded', () => {
  // العناصر الرئيسية
  const bgLayer = document.getElementById('bgLayer');
  const coupleImg = document.getElementById('coupleImg');
  const bgMusic = document.getElementById('bgMusic');
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  
  // مدخلات اللوحة
  const coupleImgInput = document.getElementById('coupleImgInput');
  const bgImgInput = document.getElementById('bgImgInput');
  const audioInput = document.getElementById('audioInput');
  const groomInput = document.getElementById('groomInput');
  const brideInput = document.getElementById('brideInput');
  const dateInput = document.getElementById('dateInput');
  const dayInput = document.getElementById('dayInput');
  const locationInput = document.getElementById('locationInput');
  const quranInput = document.getElementById('quranInput');

  // شاشات العرض
  const displayGroom = document.getElementById('displayGroom');
  const displayBride = document.getElementById('displayBride');
  const displayDate = document.getElementById('displayDate');
  const displayDay = document.getElementById('displayDay');
  const displayLocation = document.getElementById('displayLocation');
  const displayQuran = document.getElementById('displayQuran');

  // اللوحة
  const controlPanel = document.getElementById('controlPanel');
  const togglePanelBtn = document.getElementById('togglePanelBtn');
  const fullscreenBtn = document.getElementById('fullscreenBtn');

  // Modal RSVP
  const rsvpModalBtn = document.getElementById('rsvpModalBtn');
  const rsvpModal = document.getElementById('rsvpModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const rsvpForm = document.getElementById('rsvpForm');

  // 1. التحديث المباشر للنصوص
  groomInput.addEventListener('input', (e) => displayGroom.textContent = e.target.value || 'أحمد');
  brideInput.addEventListener('input', (e) => displayBride.textContent = e.target.value || 'ندى');
  dateInput.addEventListener('input', (e) => displayDate.textContent = e.target.value || '12 أكتوبر 2026');
  dayInput.addEventListener('input', (e) => displayDay.textContent = e.target.value || 'الجمعة');
  locationInput.addEventListener('input', (e) => displayLocation.textContent = e.target.value || 'دار المدفعية');
  quranInput.addEventListener('input', (e) => displayQuran.textContent = `"${e.target.value}"`);

  // 2. رفع صورة العروسين المفرغة (Cutout Image)
  coupleImgInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        coupleImg.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // 3. رفع صورة الخلفية
  bgImgInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        bgLayer.style.backgroundImage = `url('${event.target.result}')`;
      };
      reader.readAsDataURL(file);
    }
  });

  // 4. رفع وتغيير ملف الصوت
  audioInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const audioUrl = URL.createObjectURL(file);
      bgMusic.src = audioUrl;
      bgMusic.play();
      musicToggleBtn.classList.add('playing');
    }
  });

  // 5. التحكم بالصوت
  let isPlaying = false;
  musicToggleBtn.addEventListener('click', () => {
    if (isPlaying) {
      bgMusic.pause();
      musicToggleBtn.classList.remove('playing');
    } else {
      bgMusic.play().then(() => {
        musicToggleBtn.classList.add('playing');
      }).catch(err => {
        console.log("تطلب المتصفح تفاعلاً قبل تشغيل الصوت تلقائيًا.");
      });
    }
    isPlaying = !isPlaying;
  });

  // 6. تصغير وإظهار لوحة التحكم
  togglePanelBtn.addEventListener('click', () => {
    controlPanel.classList.toggle('collapsed');
    const icon = togglePanelBtn.querySelector('i');
    icon.className = controlPanel.classList.contains('collapsed') 
      ? 'fa-solid fa-chevron-up' 
      : 'fa-solid fa-chevron-down';
  });

  // 7. وضع ملء الشاشة
  fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });

  // 8. فتح وإغلاق RSVP
  rsvpModalBtn.addEventListener('click', () => rsvpModal.classList.add('active'));
  closeModalBtn.addEventListener('click', () => rsvpModal.classList.remove('active'));
  rsvpModal.addEventListener('click', (e) => {
    if (e.target === rsvpModal) rsvpModal.classList.remove('active');
  });

  // 9. إرسال RSVP والاحتفال بالـ Confetti
  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const guestName = document.getElementById('guestName').value;
    rsvpModal.classList.remove('active');
    
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }

    alert(`شكراً لك يا ${guestName}! تم إرسال ردك بنجاح.`);
    rsvpForm.reset();
  });
});
