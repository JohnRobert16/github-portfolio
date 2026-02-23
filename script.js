// --- Project Swiper ---
const swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  grabCursor: true,
  pagination: { el: ".swiper-pagination", clickable: true, dynamicBullets: true },
  breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 2.5 } }
});

// Add this after swiper initialization
document.querySelectorAll('.project-card[href]').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const overlayText = card.querySelector('.card-overlay span');
    overlayText.style.transform = "translateY(-5px) scale(1.05)";
    overlayText.style.opacity = "1";
  });
  card.addEventListener('mouseleave', () => {
    const overlayText = card.querySelector('.card-overlay span');
    overlayText.style.transform = "translateY(0) scale(1)";
    overlayText.style.opacity = "0";
  });
});

// --- Gallery Logic ---
const projectGalleries = [
  { images: [
    "assets/images/dms/201_File_Update_Form_Main_Process.png",
    "assets/images/dms/Attendance Sheet Process Flow.png",
    "assets/images/dms/Borrower_Slip_Main_Process.png",
    "assets/images/dms/Environmental_Aspect_Impact_Assessment_Main_Process.png",
    "assets/images/dms/Exit_Clearance_Form_Main_Process.png",
    "assets/images/dms/Expense_Report_Form_Main_Process.png"
  ]}
];

let gallerySwiper;
function openGallery(index) {
  const wrapper = document.getElementById("galleryWrapper");
  wrapper.innerHTML = "";
  projectGalleries[index].images.forEach(src => {
    const filename = src.split("/").pop();
    const caption = filename.replace(/_/g, " ").replace(".png", "");
    wrapper.innerHTML += `
  <div class="swiper-slide">
    <div class="swiper-zoom-container">
      <img src="${src}" alt="${caption}" loading="lazy" class="gallery-image">
    </div>
    <p class="gallery-caption">${caption}</p>
  </div>`;
  });
  document.getElementById("galleryModal").classList.add("active");
  document.body.style.overflow = "hidden";
  showSwipeHint();
  if (gallerySwiper) gallerySwiper.destroy(true, true);
  setTimeout(() => {
  gallerySwiper = new Swiper(".gallerySwiper", {
    loop: true,
    grabCursor: true,
    keyboard: { enabled: true },
    pagination: { el: ".swiper-pagination", clickable: true },
    effect: "fade",
    fadeEffect: { crossFade: true },
    zoom: {
      maxRatio: 3,  // maximum zoom
      minRatio: 1,  // default zoom
      toggle: true  // double-click to zoom in/out
    },
  });
}, 100);
}
function closeGallery() { 
  document.getElementById("galleryModal").classList.remove("active"); 
  document.body.style.overflow = "auto"; hideSwipeHint(); 
}
document.addEventListener("keydown", e => { if(e.key === "Escape") closeGallery(); });
document.getElementById("galleryModal").addEventListener("click", e => { if(e.target.id === "galleryModal") closeGallery(); });
function showSwipeHint() { const hint = document.getElementById("swipeHint"); if(!hint) return; hint.style.opacity="1"; setTimeout(()=>{hint.style.opacity="0"},4000);}
function hideSwipeHint() { const hint=document.getElementById("swipeHint"); if(hint) hint.style.opacity="0";}

// --- Mobile Navigation ---
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');
mobileToggle.addEventListener('click', () => { navLinks.classList.toggle('active'); mobileToggle.classList.toggle('active'); });
document.querySelectorAll('.nav-links a').forEach(link => { link.addEventListener('click', () => { navLinks.classList.remove('active'); mobileToggle.classList.remove('active'); }); });

// --- Navbar Scroll Effect ---
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if(window.scrollY > 50) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
});

// --- Light/Dark Theme Toggle ---
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  document.body.classList.toggle('light-theme');
});

// Zoom on gallery image click
document.addEventListener('click', e => {
  if (e.target.classList.contains('gallery-image')) {
    e.target.classList.toggle('zoomed');
  }
});