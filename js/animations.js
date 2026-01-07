// Advanced Animations for NESH Group Website

class NESHAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupScrollReveal();
        this.setupParallaxEffects();
        this.setupHoverAnimations();
        this.setupPageTransitions();
    }
    
    setupScrollReveal() {
        // Advanced scroll reveal with staggered animations
        const revealElements = document.querySelectorAll('.scroll-reveal');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, index * 150); // Staggered delay
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        revealElements.forEach(el => revealObserver.observe(el));
    }
    
    setupParallaxEffects() {
        // Parallax effect for hero background
        const hero = document.querySelector('.hero');
        if (hero) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                hero.style.transform = `translate3d(0, ${rate}px, 0)`;
            });
        }
        
        // Parallax for business cards
        const businessCards = document.querySelectorAll('.business-card');
        businessCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
                const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
                card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
            });
            
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'none';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transition = 'all 0.5s ease';
                card.style.transform = 'rotateY(0deg) rotateX(0deg)';
            });
        });
    }
    
    setupHoverAnimations() {
        // Advanced hover effects for cards
        const cards = document.querySelectorAll('.feature-card, .product-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const glow = document.createElement('div');
                glow.className = 'card-glow';
                card.appendChild(glow);
                
                setTimeout(() => {
                    glow.style.opacity = '1';
                }, 10);
            });
            
            card.addEventListener('mouseleave', () => {
                const glow = card.querySelector('.card-glow');
                if (glow) {
                    glow.style.opacity = '0';
                    setTimeout(() => glow.remove(), 300);
                }
            });
        });
        
        // Button hover effects
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', (e) => {
                const x = e.pageX - btn.offsetLeft;
                const y = e.pageY - btn.offsetTop;
                
                const ripple = document.createElement('span');
                ripple.className = 'btn-ripple';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                btn.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }
    
    setupPageTransitions() {
        // Smooth page transitions for navigation
        document.querySelectorAll('a:not([href^="#"])').forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.href && !link.target) {
                    e.preventDefault();
                    this.animatePageTransition(link.href);
                }
            });
        });
    }
    
    animatePageTransition(url) {
        // Create transition overlay
        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        document.body.appendChild(overlay);
        
        // Animate overlay in
        setTimeout(() => {
            overlay.classList.add('active');
            
            // Navigate after animation
            setTimeout(() => {
                window.location.href = url;
            }, 500);
        }, 10);
    }
    
    // Particle animation for premium sections
    createParticleEffect(container) {
        if (!container) return;
        
        const particles = 50;
        for (let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random properties
            const size = Math.random() * 10 + 2;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 5;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            
            container.appendChild(particle);
        }
    }
    
    // Animate numbers with counting effect
    animateNumber(element, target, duration = 2000) {
        if (!element) return;
        
        const start = 0;
        const increment = target / (duration / 16); // 60fps
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }
    
    // Create shimmer effect for premium elements
    addShimmerEffect(element) {
        if (!element) return;
        
        const shimmer = document.createElement('div');
        shimmer.className = 'shimmer-effect';
        element.style.position = 'relative';
        element.appendChild(shimmer);
        
        // Animate shimmer
        setTimeout(() => {
            shimmer.style.transform = 'translateX(100%)';
        }, 10);
        
        // Remove after animation
        setTimeout(() => {
            shimmer.remove();
        }, 1000);
    }
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    window.neshAnimations = new NESHAnimations();
    
    // Add particle effects to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.neshAnimations.createParticleEffect(hero);
    }
});