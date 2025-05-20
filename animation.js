document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.fade-in'); //cari semua class dengan nama fade-in

  const observer = new IntersectionObserver((entries) => { //mantau kapan elemen muncul di layar
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // agar animasi hanya sekali
      }
    });
  }, {
    threshold: 0.1
  });

  fadeElements.forEach(el => observer.observe(el));

  const toggleBtn = document.getElementById('toggleSidebar');
  const sidebar = document.getElementById('mobileSidebar');
  const closeBtn = document.getElementById('closeSidebar');

  toggleBtn.addEventListener('click', () => {
    sidebar.classList.remove('-translate-x-full');
    sidebar.classList.add('-translate-x-0');
  });

  closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('-translate-x-0');
    sidebar.classList.add('-translate-x-full');
  });
});