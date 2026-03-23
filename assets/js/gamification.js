// Gamification System
class GamificationSystem {
    constructor() {
        this.points = 0;
        this.level = 1;
        this.achievements = [];
        this.xpToNextLevel = 100;
        this.init();
    }

    init() {
        this.loadProgress();
        this.initEventListeners();
        this.updateUI();
    }

    loadProgress() {
        const saved = localStorage.getItem('portfolio_gamification');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.points = data.points || 0;
                this.level = data.level || 1;
                this.achievements = data.achievements || [];
                this.updateLevel();
            } catch (e) {
                console.error('Error loading gamification data:', e);
            }
        }
    }

    saveProgress() {
        localStorage.setItem('portfolio_gamification', JSON.stringify({
            points: this.points,
            level: this.level,
            achievements: this.achievements
        }));
    }

    addPoints(points) {
        this.points += points;
        this.updateLevel();
        this.saveProgress();
        this.updateUI();
        
        // Check for level up
        if (this.points >= this.xpToNextLevel * this.level) {
            this.levelUp();
        }
    }

    updateLevel() {
        // Simple level calculation: level = floor(points / 100) + 1
        const newLevel = Math.floor(this.points / 100) + 1;
        if (newLevel > this.level) {
            this.level = newLevel;
            this.levelUp();
        }
    }

    levelUp() {
        this.showAchievement(`Level Up! You've reached Level ${this.level} 🎉`);
        this.updateUI();
    }

    addAchievement(achievement) {
        if (!this.achievements.includes(achievement)) {
            this.achievements.push(achievement);
            this.saveProgress();
            this.showAchievement(`Achievement Unlocked: ${achievement} 🏆`);
        }
    }

    showAchievement(message) {
        const popup = document.getElementById('achievementPopup');
        if (!popup) return;
        
        const messageElement = popup.querySelector('.achievement-message');
        if (messageElement) {
            messageElement.textContent = message;
        }
        
        popup.classList.add('show');
        
        setTimeout(() => {
            popup.classList.remove('show');
        }, 3000);
    }

    updateUI() {
        const xpFill = document.querySelector('.xp-fill');
        const xpValue = document.querySelector('.xp-value');
        
        if (xpFill) {
            const currentLevelXp = this.points % 100;
            const percentage = (currentLevelXp / 100) * 100;
            xpFill.style.width = `${percentage}%`;
        }
        
        if (xpValue) {
            xpValue.textContent = `Level ${this.level}`;
        }
    }

    initEventListeners() {
        // Track time spent on site
        let startTime = Date.now();
        window.addEventListener('beforeunload', () => {
            const timeSpent = Math.floor((Date.now() - startTime) / 1000 / 60);
            if (timeSpent >= 5) {
                this.addPoints(Math.min(timeSpent, 50));
            }
        });
        
        // Track scroll depth
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercent > maxScroll + 25) {
                maxScroll = scrollPercent;
                if (scrollPercent >= 25 && scrollPercent < 50) {
                    this.addAchievement('Curious Explorer');
                } else if (scrollPercent >= 50 && scrollPercent < 75) {
                    this.addAchievement('Deep Diver');
                } else if (scrollPercent >= 75) {
                    this.addAchievement('Completionist');
                }
            }
        });
    }
}

// Initialize gamification system
let gamificationSystem;
document.addEventListener('DOMContentLoaded', () => {
    gamificationSystem = new GamificationSystem();
    window.gamificationSystem = gamificationSystem;
});