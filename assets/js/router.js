export class Router {
    constructor(routes) {
        console.log('Router constructor called');
        this.routes = routes;
        this.currentPage = 'home';
        this.init();
    }
    
    init() {
        console.log('Router init - current path:', window.location.pathname);
        
        // Handle browser back/forward
        window.addEventListener('popstate', (event) => {
            console.log('Popstate:', window.location.pathname);
            this.handleRoute(window.location.pathname);
        });
        
        // Handle initial route
        this.handleRoute(window.location.pathname);
    }
    
    handleRoute(path) {
        console.log('Handling route:', path);
        
        // Remove leading slash and query params
        let page = path.replace(/^\//, '').split('?')[0];
        
        // If empty or 'index.html', use home
        if (page === '' || page === 'index.html') {
            page = 'home';
        }
        
        console.log('Page to render:', page);
        
        // Check if route exists
        if (this.routes[page]) {
            console.log('Rendering:', page);
            this.currentPage = page;
            this.routes[page]();
        } else {
            console.log('Route not found, redirecting to home');
            // Redirect to home without adding to history
            this.navigateTo('home', false);
        }
    }
    
    navigateTo(page, addToHistory = true) {
        console.log('Navigating to:', page);
        
        const newPath = page === 'home' ? '/' : `/${page}`;
        
        if (addToHistory) {
            window.history.pushState({ page }, '', newPath);
        } else {
            window.history.replaceState({ page }, '', newPath);
        }
        
        if (this.routes[page]) {
            this.currentPage = page;
            this.routes[page]();
        }
    }
    
    getCurrentPage() {
        return this.currentPage;
    }
}