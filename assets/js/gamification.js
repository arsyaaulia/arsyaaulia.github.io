// Gamification System
class GamificationSystem {
    constructor() {
        this.points = 0;
        this.level = 1;
        this.init();
    }

    init() {
        this.loadProgress();
        this.updateUI();
    }

    loadProgress() {
        const saved = localStorage.getItem('portfolio_gamification');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.points = data.points || 0;
                this.level = data.level || 1;
            } catch (e) {
                console.error('Error loading gamification data:', e);
            }
        }
    }

    saveProgress() {
        localStorage.setItem('portfolio_gamification', JSON.stringify({
            points: this.points,
            level: this.level
        }));
    }

    addPoints(points) {
        this.points += points;
        const newLevel = Math.floor(this.points / 100) + 1;
        if (newLevel > this.level) {
            this.level = newLevel;
            this.showNotification(`🎉 Level Up! Level ${this.level}`);
        }
        this.saveProgress();
        this.updateUI();
    }

    showNotification(message) {
        const popup = document.getElementById('achievementPopup');
        if (!popup) return;
        
        const messageElement = popup.querySelector('.achievement-message');
        if (messageElement) {
            messageElement.textContent = message;
        }
        
        popup.classList.add('show');
        
        setTimeout(() => {
            popup.classList.remove('show');
        }, 2000);
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
}

// Initialize
let gamificationSystem;
document.addEventListener('DOMContentLoaded', () => {
    gamificationSystem = new GamificationSystem();
    window.gamificationSystem = gamificationSystem;
});