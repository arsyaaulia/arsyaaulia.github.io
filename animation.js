// Scroll animations for sections
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(
          'animate-fade-up', 
          'animate-duration-500',
          'animate-ease-out'
        );
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => observer.observe(section));
});