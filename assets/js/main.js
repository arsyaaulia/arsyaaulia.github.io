// Main Application Logic
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.initParticles();
        this.initTypingEffect();
        this.initNavigation();
        this.initSkills();
        this.initScrollAnimations();
        this.initCopyEmail();
        this.initCoffeeCounter();
    }

    initParticles() {
        const canvas = document.getElementById('particleCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 50;
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.color = `hsl(${Math.random() * 60 + 240}, 70%, 60%)`;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }
            
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        function init() {
            resizeCanvas();
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
            animate();
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            requestAnimationFrame(animate);
        }
        
        window.addEventListener('resize', resizeCanvas);
        init();
    }

    initTypingEffect() {
        const words = ['Developer', 'Designer', 'Creator', 'Innovator', 'Technologist'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typedTextElement = document.querySelector('.typed-text');
        
        if (!typedTextElement) return;
        
        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typedTextElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedTextElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                setTimeout(type, 2000);
                return;
            }
            
            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
            
            setTimeout(type, isDeleting ? 100 : 200);
        }
        
        type();
    }

    initNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                    if (navMenu) navMenu.classList.remove('active');
                    if (navToggle) navToggle.classList.remove('active');
                    
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        });
        
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
            
            // Update active nav link based on scroll position
            const sections = document.querySelectorAll('section');
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    initSkills() {
        const skills = [
            { name: 'React', icon: '⚛️', level: 90 },
            { name: 'Vue.js', icon: '💚', level: 85 },
            { name: 'Node.js', icon: '🚀', level: 88 },
            { name: 'Python', icon: '🐍', level: 85 },
            { name: 'Three.js', icon: '🎨', level: 80 },
            { name: 'Tailwind', icon: '💨', level: 95 },
            { name: 'Figma', icon: '🎯', level: 90 },
            { name: 'WebGL', icon: '🌐', level: 75 },
            { name: 'TypeScript', icon: '📘', level: 85 },
            { name: 'GraphQL', icon: '📊', level: 80 }
        ];
        
        const skillsContainer = document.getElementById('skillsContainer');
        if (!skillsContainer) return;
        
        skills.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            skillItem.innerHTML = `
                <span class="skill-icon">${skill.icon}</span>
                <span class="skill-name">${skill.name}</span>
            `;
            
            skillItem.addEventListener('click', () => {
                if (window.gamificationSystem) {
                    window.gamificationSystem.addPoints(5);
                    window.gamificationSystem.showAchievement(`Mastered: ${skill.name} (${skill.level}%)`);
                }
            });
            
            skillsContainer.appendChild(skillItem);
        });
    }

    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'all 0.6s ease';
            observer.observe(section);
        });
    }

    initCopyEmail() {
        const copyBtn = document.getElementById('copyEmail');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                const email = 'arsya@creative.tech';
                navigator.clipboard.writeText(email).then(() => {
                    if (window.gamificationSystem) {
                        window.gamificationSystem.showAchievement('Email copied! 📧');
                        window.gamificationSystem.addPoints(5);
                    }
                    
                    const tooltip = copyBtn.querySelector('.copy-tooltip');
                    if (tooltip) {
                        const originalText = tooltip.textContent;
                        tooltip.textContent = 'Copied!';
                        setTimeout(() => {
                            tooltip.textContent = originalText;
                        }, 2000);
                    }
                });
            });
        }
    }

    initCoffeeCounter() {
        const coffeeCount = document.getElementById('coffeeCount');
        if (coffeeCount) {
            let count = 0;
            const interval = setInterval(() => {
                if (count < 1024) {
                    count += 32;
                    coffeeCount.textContent = count;
                } else {
                    coffeeCount.textContent = '1024+';
                    clearInterval(interval);
                }
            }, 30);
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
    
    // Add smooth scroll for explore button
    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    const resumeBtn = document.getElementById('resumeBtn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', () => {
            // Add your resume download logic here
            if (window.gamificationSystem) {
                window.gamificationSystem.showAchievement('Resume feature coming soon! 📄');
            }
            alert('Resume download feature coming soon!');
        });
    }
});