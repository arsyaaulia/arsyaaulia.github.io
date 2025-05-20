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

  const toggleButton = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  toggleButton.addEventListener('click', () => {
    navMenu.classList.toggle('hidden');
  });
});
