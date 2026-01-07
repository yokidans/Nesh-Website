// NESH Group Main JavaScript
// Professional implementation with perfect layout handling

class NESHWebsite {
    constructor() {
        this.cartCount = 0;
        this.isMobileMenuOpen = false;
        this.init();
    }
    
    init() {
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    setup() {
        // Core setup
        this.setupLoadingScreen();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupCart();
        this.setupDashboard();
        this.setupScrollAnimations();
        this.setupHeaderEffects();
        this.setupContactForm();
        this.setupBusinessCards();
        this.setupHeroAnimations();
        
        // Listen for language changes
        document.addEventListener('languageChanged', (e) => {
            this.onLanguageChange(e.detail.language);
        });
        
        // Window resize handler for layout adjustments
        window.addEventListener('resize', this.handleResize.bind(this));
        
        console.log('NESH Website initialized');
    }
    
    setupLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (!loadingScreen) return;
        
        // Simulate loading progress
        const progressFill = loadingScreen.querySelector('.progress-fill');
        if (progressFill) {
            let progress = 0;
            const interval = setInterval(() => {
                progress += 5;
                progressFill.style.width = `${progress}%`;
                
                if (progress >= 100) {
                    clearInterval(interval);
                    
                    // Hide loading screen
                    setTimeout(() => {
                        loadingScreen.classList.add('hidden');
                        document.body.style.overflow = 'auto';
                        
                        // Show scroll reveal animations
                        this.initScrollReveal();
                    }, 500);
                }
            }, 50);
        } else {
            // Fallback if no progress bar
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                document.body.style.overflow = 'auto';
                this.initScrollReveal();
            }, 1500);
        }
    }
    
    setupMobileMenu() {
        const toggle = document.getElementById('mobileMenuToggle');
        const menu = document.getElementById('navMenu');
        
        if (!toggle || !menu) return;
        
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMobileMenu();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMobileMenuOpen && !menu.contains(e.target) && !toggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
        
        // Close menu when clicking links
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });
        
        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMobileMenuOpen) {
                this.closeMobileMenu();
            }
        });
    }
    
    toggleMobileMenu() {
        const toggle = document.getElementById('mobileMenuToggle');
        const menu = document.getElementById('navMenu');
        
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
        
        if (toggle) {
            toggle.classList.toggle('active');
            toggle.setAttribute('aria-expanded', this.isMobileMenuOpen);
        }
        
        if (menu) {
            menu.classList.toggle('active');
        }
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
    }
    
    closeMobileMenu() {
        const toggle = document.getElementById('mobileMenuToggle');
        const menu = document.getElementById('navMenu');
        
        this.isMobileMenuOpen = false;
        
        if (toggle) {
            toggle.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
        }
        
        if (menu) {
            menu.classList.remove('active');
        }
        
        document.body.style.overflow = '';
    }
    
    setupSmoothScrolling() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if it's just "#"
                if (href === '#' || href === '#!') return;
                
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    this.closeMobileMenu();
                    
                    // Calculate header height
                    const headerHeight = document.querySelector('.main-header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without scrolling
                    history.pushState(null, null, href);
                }
            }.bind(this));
        });
    }
    
    setupCart() {
        const cartButtons = document.querySelectorAll('.btn[data-action="add-to-cart"]');
        const cartCountElement = document.getElementById('cartCount');
        
        if (!cartCountElement) return;
        
        // Load cart from localStorage
        this.loadCartFromStorage();
        cartCountElement.textContent = this.cartCount;
        
        // Add event listeners to cart buttons
        cartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                this.addToCart();
                cartCountElement.textContent = this.cartCount;
                
                // Show notification
                this.showCartNotification();
            });
        });
    }
    
    loadCartFromStorage() {
        const savedCount = localStorage.getItem('nesh_cart_count');
        this.cartCount = savedCount ? parseInt(savedCount) : 0;
    }
    
    saveCartToStorage() {
        localStorage.setItem('nesh_cart_count', this.cartCount.toString());
    }
    
    addToCart() {
        this.cartCount++;
        this.saveCartToStorage();
    }
    
    showCartNotification() {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        
        const lang = getCurrentLanguage ? getCurrentLanguage() : 'en';
        const title = lang === 'am' ? 'ምርት ተጨምሯል!' : 'Product Added!';
        const message = lang === 'am' 
            ? `ጋሪዎ አሁን ${this.cartCount} እቃዎች አሉት`
            : `Your cart now has ${this.cartCount} items`;
        
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <div>
                    <div class="notification-title">${title}</div>
                    <div class="notification-message">${message}</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    setupDashboard() {
        const dashboardSection = document.querySelector('.dashboard-section');
        if (!dashboardSection) return;
        
        // Create intersection observer for dashboard
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateDashboard();
                    observer.unobserve(dashboardSection);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(dashboardSection);
        
        // Auto-update dashboard every 30 seconds
        setInterval(() => {
            if (this.isElementInViewport(dashboardSection)) {
                this.updateDashboardLive();
            }
        }, 30000);
    }
    
    animateDashboard() {
        // Counter values
        const targets = {
            bakery: 12450,
            dairy: 8620,
            teff: 25890,
            export: 127
        };
        
        // Progress percentages
        const progressTargets = {
            bakery: 83,
            dairy: 86,
            teff: 78,
            export: 64
        };
        
        // Animate counters
        Object.keys(targets).forEach(key => {
            const element = document.getElementById(`dashboard${key.charAt(0).toUpperCase() + key.slice(1)}`);
            if (element) {
                this.animateCounter(element, targets[key]);
            }
        });
        
        // Animate progress bars
        Object.keys(progressTargets).forEach(key => {
            const progressBar = document.getElementById(`${key}Progress`);
            const percentElement = document.getElementById(`${key}Percent`);
            
            if (progressBar && percentElement) {
                this.animateProgressBar(progressBar, percentElement, progressTargets[key]);
            }
        });
    }
    
    animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const duration = 1500; // 1.5 seconds
        
        const step = () => {
            current += increment;
            
            if (current >= target) {
                element.textContent = target.toLocaleString();
                return;
            }
            
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(step);
        };
        
        // Start animation
        setTimeout(() => requestAnimationFrame(step), 300);
    }
    
    animateProgressBar(progressBar, percentElement, targetPercent) {
        let current = 0;
        const increment = targetPercent / 60; // 60 frames over 1 second
        
        const animate = () => {
            current += increment;
            
            if (current >= targetPercent) {
                progressBar.style.width = `${targetPercent}%`;
                percentElement.textContent = `${Math.round(targetPercent)}%`;
                return;
            }
            
            progressBar.style.width = `${current}%`;
            percentElement.textContent = `${Math.round(current)}%`;
            requestAnimationFrame(animate);
        };
        
        // Start animation
        setTimeout(() => requestAnimationFrame(animate), 300);
    }
    
    updateDashboardLive() {
        // Generate random variations
        const variations = {
            bakery: Math.floor(Math.random() * 200) - 100,
            dairy: Math.floor(Math.random() * 150) - 75,
            teff: Math.floor(Math.random() * 300) - 150,
            export: Math.floor(Math.random() * 10) - 5
        };
        
        // Update counter values
        const elements = {
            bakery: document.getElementById('dashboardBakery'),
            dairy: document.getElementById('dashboardDairy'),
            teff: document.getElementById('dashboardTeff'),
            export: document.getElementById('dashboardExport')
        };
        
        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                const current = parseInt(elements[key].textContent.replace(/,/g, ''));
                const newValue = Math.max(0, current + variations[key]);
                elements[key].textContent = newValue.toLocaleString();
            }
        });
        
        // Update progress bars
        this.updateProgressBars();
    }
    
    updateProgressBars() {
        const progressData = {
            bakery: { element: 'dashboardBakery', max: 15000 },
            dairy: { element: 'dashboardDairy', max: 10000 },
            teff: { element: 'dashboardTeff', max: 33334 },
            export: { element: 'dashboardExport', max: 200 }
        };
        
        Object.keys(progressData).forEach(key => {
            const counter = document.getElementById(progressData[key].element);
            const progressBar = document.getElementById(`${key}Progress`);
            const percentElement = document.getElementById(`${key}Percent`);
            
            if (counter && progressBar && percentElement) {
                const value = parseInt(counter.textContent.replace(/,/g, ''));
                const max = progressData[key].max;
                const percent = Math.min(100, Math.round((value / max) * 100));
                
                progressBar.style.width = `${percent}%`;
                percentElement.textContent = `${percent}%`;
            }
        });
    }
    
    setupScrollAnimations() {
        // Initialize scroll reveal elements
        this.initScrollReveal();
        
        // Add scroll listener for header effects
        this.setupHeaderEffects();
    }
    
    initScrollReveal() {
        const revealElements = document.querySelectorAll('.scroll-reveal');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(el => revealObserver.observe(el));
    }
    
    setupHeaderEffects() {
        const header = document.querySelector('.main-header');
        if (!header) return;
        
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Add/remove scrolled class
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide/show header on scroll
            if (currentScroll > lastScroll && currentScroll > 100) {
                // Scrolling down
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                header.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
    }
    
    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.message) {
                this.showFormError('Please fill in all required fields');
                return;
            }
            
            if (!this.isValidEmail(data.email)) {
                this.showFormError('Please enter a valid email address');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                // Simulate API call
                await this.simulateApiCall();
                
                // Show success message
                this.showFormSuccess();
                
                // Reset form
                contactForm.reset();
                
            } catch (error) {
                this.showFormError('Failed to send message. Please try again.');
            } finally {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    simulateApiCall() {
        return new Promise((resolve) => {
            setTimeout(() => resolve(), 1500);
        });
    }
    
    showFormSuccess() {
        const lang = getCurrentLanguage ? getCurrentLanguage() : 'en';
        const message = lang === 'am' 
            ? 'መልእክትዎ በተሳካ ሁኔታ ተልኳል! በቅርቡ እንገናኝዎታለን።'
            : 'Your message has been sent successfully! We will contact you soon.';
        
        this.showNotification('success', message);
    }
    
    showFormError(message) {
        this.showNotification('error', message);
    }
    
    showNotification(type, message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `nesh-notification notification-${type}`;
        
        const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
        
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${icon}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
    
    setupBusinessCards() {
        const businessCards = document.querySelectorAll('.business-card');
        
        businessCards.forEach(card => {
            // Add hover effect
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
            
            // Add click effect
            card.addEventListener('click', (e) => {
                if (e.target.tagName === 'A' || e.target.closest('a')) return;
                
                const link = card.querySelector('a.btn');
                if (link) {
                    link.click();
                }
            });
        });
    }
    
    setupHeroAnimations() {
        const heroTitle = document.getElementById('heroTitle');
        if (!heroTitle) return;
        
        // Add animation class on load
        setTimeout(() => {
            heroTitle.classList.add('animated');
        }, 500);
        
        // Parallax effect for hero background
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.5;
                heroBackground.style.transform = `translateY(${rate}px)`;
            });
        }
    }
    
    onLanguageChange(language) {
        // Update any language-specific content
        this.updateCartNotification();
        
        // Re-initialize animations if needed
        if (language === 'am') {
            // Adjust for Amharic typography if needed
            document.querySelectorAll('.section-title').forEach(title => {
                title.style.letterSpacing = 'normal';
            });
        } else {
            document.querySelectorAll('.section-title').forEach(title => {
                title.style.letterSpacing = '';
            });
        }
    }
    
    updateCartNotification() {
        // Update cart badge text if needed
        const cartBadge = document.getElementById('cartCount');
        if (cartBadge) {
            // Just update count, text is handled by translation system
            cartBadge.textContent = this.cartCount;
        }
    }
    
    handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth >= 992 && this.isMobileMenuOpen) {
            this.closeMobileMenu();
        }
        
        // Update any layout-specific calculations
        this.updateLayoutCalculations();
    }
    
    updateLayoutCalculations() {
        // Update any dynamic layout calculations here
        // For example, recalculating hero height
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const headerHeight = document.querySelector('.main-header').offsetHeight;
            heroSection.style.minHeight = `calc(100vh - ${headerHeight}px)`;
        }
    }
    
    isElementInViewport(el) {
        if (!el) return false;
        
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
}

// Initialize the website
let neshWebsite;

document.addEventListener('DOMContentLoaded', function() {
    neshWebsite = new NESHWebsite();
    
    // Expose to window for debugging
    window.neshWebsite = neshWebsite;
    
    // Initialize dashboard after a delay
    setTimeout(() => {
        if (typeof initDashboard === 'function') {
            initDashboard();
        }
    }, 1000);
});

// Dashboard initialization function
function initDashboard() {
    // This function can be called from inline script
    if (neshWebsite) {
        neshWebsite.setupDashboard();
    }
}

// Add CSS for notifications
const notificationStyles = `
    .cart-notification,
    .nesh-notification {
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--gradient-primary);
        color: white;
        padding: 20px;
        border-radius: 12px;
        box-shadow: var(--shadow-xl);
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 350px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .cart-notification.show,
    .nesh-notification.show {
        transform: translateX(0);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 15px;
    }
    
    .notification-content i {
        font-size: 24px;
        color: var(--accent-gold);
    }
    
    .notification-title {
        font-weight: 700;
        font-size: 16px;
        margin-bottom: 4px;
    }
    
    .notification-message {
        font-size: 14px;
        opacity: 0.9;
    }
    
    .notification-success {
        background: linear-gradient(135deg, #2E7D32, #1A472A);
    }
    
    .notification-error {
        background: linear-gradient(135deg, #c62828, #b71c1c);
    }
    
    @media (max-width: 768px) {
        .cart-notification,
        .nesh-notification {
            top: auto;
            bottom: 20px;
            left: 20px;
            right: 20px;
            max-width: none;
            transform: translateY(100%);
        }
        
        .cart-notification.show,
        .nesh-notification.show {
            transform: translateY(0);
        }
    }
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);