// Project Data Management
class ProjectManager {
    constructor() {
        this.projects = {
            tech: [],
            creative: [],
            article: []
        };
        this.itemsPerPage = 3;
        this.init();
    }

    async init() {
        await this.loadData();
        this.renderHomeProjects();
        this.initLoadMoreButtons();
        this.updateCategoryCounts();
    }

    async loadData() {
        try {
            // Gunakan absolute path dari root
            const response = await fetch('/assets/data/projects.json');
            if (!response.ok) throw new Error('Failed to load projects data');
            const data = await response.json();
            this.projects = data;
        } catch (error) {
            console.error('Error loading projects data:', error);
            this.setFallbackData();
        }
    }

    setFallbackData() {
        // Fallback data in case JSON fails to load
        this.projects = {
            tech: [
                {
                    id: 1,
                    title: "Sample Tech Project",
                    description: "This is a sample tech project description",
                    tags: ["React", "Node.js"],
                    image: "https://i.pinimg.com/736x/c7/76/59/c77659f60e02cd32b2b1488946f8d534.jpg",
                    link: "#",
                    date: "2024-01-01",
                    featured: true
                }
            ],
            creative: [
                {
                    id: 1,
                    title: "Sample Creative Project",
                    description: "This is a sample creative project description",
                    tags: ["p5.js", "Canvas"],
                    image: "https://i.pinimg.com/736x/c7/76/59/c77659f60e02cd32b2b1488946f8d534.jpg",
                    link: "#",
                    date: "2024-01-01",
                    featured: true
                }
            ],
            article: [
                {
                    id: 1,
                    title: "Sample Article",
                    description: "This is a sample article description",
                    tags: ["Tech", "Writing"],
                    image: "https://i.pinimg.com/736x/c7/76/59/c77659f60e02cd32b2b1488946f8d534.jpg",
                    link: "#",
                    date: "2024-01-01",
                    readTime: "5 min read",
                    featured: true
                }
            ]
        };
    }

    renderHomeProjects() {
        // Render Tech Projects (first 3)
        this.renderProjectGrid('techProjectsGrid', this.sortProjectsByDateDesc(this.projects.tech).slice(0, 3), 'tech');
        
        // Render Creative Projects (first 3)
        this.renderProjectGrid('creativeProjectsGrid', this.sortProjectsByDateDesc(this.projects.creative).slice(0, 3), 'creative');
        
        // Render Articles (first 3)
        this.renderProjectGrid('articleProjectsGrid', this.sortProjectsByDateDesc(this.projects.article).slice(0, 3), 'article');
    }

    renderProjectGrid(gridId, projects, category) {
        const grid = document.getElementById(gridId);
        if (!grid) return;
        
        grid.innerHTML = '';
        
        projects.forEach(project => {
            const card = this.createProjectCard(project, category);
            grid.appendChild(card);
        });
    }

    createProjectCard(project, category) {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        let badge = '';
        let buttonText = 'View Project →';
        let buttonAction = '';
        
        if (category === 'article') {
            badge = `<div class="article-badge">📖 ${project.readTime}</div>`;
            buttonText = 'Read Article →';
            buttonAction = `data-link="${project.link}"`;
        } else {
            // Untuk tech dan creative
            if (project.hasLink && project.link) {
                buttonText = 'View Project →';
                buttonAction = `data-link="${project.link}" data-has-link="true"`;
            } else {
                buttonText = 'No Demo Available';
                buttonAction = `data-has-link="false" disabled style="opacity:0.5; cursor:not-allowed;"`;
            }
        }
        
        card.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy" onerror="this.src='assets/img/placeholder.jpg'">
                ${badge}
            </div>
            <div class="project-info">
                <h3 class="project-title">${this.escapeHtml(project.title)}</h3>
                <p class="project-description">${this.escapeHtml(project.description.substring(0, 120))}${project.description.length > 120 ? '...' : ''}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="tag">${this.escapeHtml(tag)}</span>`).join('')}
                </div>
                <div class="project-footer">
                    <span class="project-date">${this.formatDate(project.date)}</span>
                    <button class="btn-view" data-id="${project.id}" data-category="${category}" ${buttonAction}>
                        ${buttonText}
                    </button>
                </div>
            </div>
        `;
        
        // Handler untuk View Project button
        const viewBtn = card.querySelector('.btn-view');
        if (viewBtn && !viewBtn.hasAttribute('disabled')) {
            const hasLink = viewBtn.getAttribute('data-has-link') === 'true';
            if (hasLink) {
                viewBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const link = viewBtn.getAttribute('data-link');
                    if (link) {
                        window.open(link, '_blank');
                        if (window.gamificationSystem) {
                            window.gamificationSystem.addPoints(10);
                            window.gamificationSystem.showAchievement(`Opening: ${project.title.substring(0, 30)}...`);
                        }
                    }
                });
            }
        }
        
        // Handler untuk klik card (navigasi ke halaman artikel)
        card.addEventListener('click', (e) => {
            // Jangan trigger jika yang diklik adalah button
            if (e.target.closest('.btn-view')) return;
            
            // Untuk tech dan creative, navigasi ke halaman artikel internal
            if (category !== 'article') {
                this.navigateToArticlePage(category, project);
            } else {
                // Untuk article, langsung ke link eksternal
                if (project.link) {
                    window.open(project.link, '_blank');
                }
            }
        });
        
        return card;
    }

    navigateToArticlePage(category, project) {
        // Navigasi ke halaman artikel internal
        // Contoh: /pages/tech/ai-assistant/index.html
        let articlePath = project.articlePath || `pages/${category}/${this.slugify(project.title)}/`;
        articlePath = articlePath.replace(/^\/+/, '');
        if (!articlePath.endsWith('/')) {
            articlePath += '/';
        }
        window.location.href = `/${articlePath}index.html`;
        
        // Simpan data project ke localStorage untuk digunakan di halaman artikel
        localStorage.setItem('currentProject', JSON.stringify({
            category: category,
            project: project
        }));
        
        if (window.gamificationSystem) {
            window.gamificationSystem.addPoints(5);
            window.gamificationSystem.showAchievement(`Reading about: ${project.title}`);
        }
    }

    slugify(text) {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }

    sortProjectsByDateDesc(projects) {
        return [...projects].sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    initLoadMoreButtons() {
        const buttons = document.querySelectorAll('.btn-load-more');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const category = button.getAttribute('data-category');
                this.navigateToCategoryPage(category);
                
                // Show achievement
                if (window.gamificationSystem) {
                    window.gamificationSystem.addPoints(10);
                    window.gamificationSystem.showAchievement(`Exploring more ${category} projects! 🎯`);
                }
            });
        });
    }

    navigateToCategoryPage(category) {
        let page = '';
        switch(category) {
            case 'tech':
                page = 'tech';
                break;
            case 'creative':
                page = 'creative';
                break;
            case 'article':
                page = 'articles';
                break;
        }
        window.location.href = `pages/${page}`;
    }

    navigateToDetail(category, id) {
        const project = this.projects[category].find(p => p.id === parseInt(id));
        if (project) {
            // Check if project has a link
            if (project.link && project.link !== '#') {
                // Open link in new tab
                window.open(project.link, '_blank');
                
                // Add achievement points
                if (window.gamificationSystem) {
                    window.gamificationSystem.addPoints(10);
                    window.gamificationSystem.showAchievement(`Opening: ${project.title.substring(0, 30)}${project.title.length > 30 ? '...' : ''}`);
                }
            } else {
                // If no link, show message
                if (window.gamificationSystem) {
                    window.gamificationSystem.showAchievement(`No link available for this project yet 🔗`);
                }
                console.warn('No link available for project:', project.title);
            }
        }
    }

    updateCategoryCounts() {
        const techCount = document.getElementById('techCount');
        const creativeCount = document.getElementById('creativeCount');
        const articleCount = document.getElementById('articleCount');
        
        if (techCount) techCount.textContent = this.projects.tech.length;
        if (creativeCount) creativeCount.textContent = this.projects.creative.length;
        if (articleCount) articleCount.textContent = this.projects.article.length;
        
        // Update total project count
        const totalCount = document.getElementById('projectCount');
        if (totalCount) {
            const total = this.projects.tech.length + this.projects.creative.length + this.projects.article.length;
            totalCount.textContent = total;
        }
    }

    getAllProjects(category) {
        const projects = this.projects[category] || [];
        return this.sortProjectsByDateDesc(projects);
    }

    getProjectById(category, id) {
        return this.projects[category]?.find(p => p.id === parseInt(id));
    }
}

// Initialize Project Manager when DOM is ready
let projectManager;
document.addEventListener('DOMContentLoaded', () => {
    projectManager = new ProjectManager();
});