// NESH Group Products Page JavaScript
// Professional implementation with product filtering and cart functionality

class NESHProducts {
    constructor() {
        this.cart = [];
        this.currentFilter = 'all';
        this.currentSort = 'featured';
        this.products = [];
        this.init();
    }
    
    init() {
        this.loadProducts();
        this.setupEventListeners();
        this.loadCartFromStorage();
        this.updateCartCount();
    }
    
    loadProducts() {
        // In a real application, this would be an API call
        // For now, we'll parse from the DOM
        const productCards = document.querySelectorAll('.product-card');
        this.products = Array.from(productCards).map(card => ({
            element: card,
            category: card.getAttribute('data-category'),
            price: parseFloat(card.getAttribute('data-price')),
            isNew: card.getAttribute('data-new') === 'true',
            name: card.querySelector('.product-name').textContent,
            id: card.querySelector('.btn-add-to-cart').getAttribute('data-product')
        }));
    }
    
    setupEventListeners() {
        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleFilterClick(e);
            });
        });
        
        // Sort select
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.handleSortChange(e);
            });
        }
        
        // Reset filters
        const resetBtn = document.getElementById('resetFilters');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetFilters();
            });
        }
        
        // Add to cart buttons
        const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleAddToCart(e);
            });
        });
        
        // Quick view buttons
        const quickViewButtons = document.querySelectorAll('.quick-view-btn');
        quickViewButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleQuickView(e);
            });
        });
        
        // Load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.handleLoadMore();
            });
        }
    }
    
    handleFilterClick(e) {
        const button = e.currentTarget;
        const filter = button.getAttribute('data-filter');
        
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        
        // Update current filter
        this.currentFilter = filter;
        
        // Apply filter and sort
        this.applyFilterAndSort();
    }
    
    handleSortChange(e) {
        this.currentSort = e.target.value;
        this.applyFilterAndSort();
    }
    
    resetFilters() {
        // Reset filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
        
        // Reset sort select
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.value = 'featured';
        }
        
        // Reset current values
        this.currentFilter = 'all';
        this.currentSort = 'featured';
        
        // Apply filter and sort
        this.applyFilterAndSort();
    }
    
    applyFilterAndSort() {
        // Filter products
        const filteredProducts = this.products.filter(product => {
            if (this.currentFilter === 'all') return true;
            return product.category === this.currentFilter;
        });
        
        // Sort products
        filteredProducts.sort((a, b) => {
            switch (this.currentSort) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'newest':
                    return b.isNew ? 1 : -1;
                case 'featured':
                default:
                    // Featured: new items first, then by category
                    if (a.isNew && !b.isNew) return -1;
                    if (!a.isNew && b.isNew) return 1;
                    return 0;
            }
        });
        
        // Update DOM
        this.updateProductGrid(filteredProducts);
        
        // Show/hide empty state
        this.updateEmptyState(filteredProducts.length === 0);
    }
    
    updateProductGrid(filteredProducts) {
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) return;
        
        // Clear grid
        productsGrid.innerHTML = '';
        
        // Add sorted products
        filteredProducts.forEach(product => {
            productsGrid.appendChild(product.element);
        });
    }
    
    updateEmptyState(isEmpty) {
        const emptyState = document.getElementById('productsEmpty');
        const productsGrid = document.getElementById('productsGrid');
        
        if (emptyState && productsGrid) {
            if (isEmpty) {
                emptyState.style.display = 'block';
                productsGrid.style.display = 'none';
            } else {
                emptyState.style.display = 'none';
                productsGrid.style.display = 'grid';
            }
        }
    }
    
    handleAddToCart(e) {
        e.preventDefault();
        const button = e.currentTarget;
        const productId = button.getAttribute('data-product');
        
        // Find product
        const productElement = button.closest('.product-card');
        const productName = productElement.querySelector('.product-name').textContent;
        const productPrice = productElement.getAttribute('data-price');
        
        // Add to cart
        this.addToCart({
            id: productId,
            name: productName,
            price: parseFloat(productPrice),
            quantity: 1
        });
        
        // Update cart count
        this.updateCartCount();
        
        // Show notification
        this.showCartNotification(productName);
        
        // Add animation
        button.classList.add('added');
        setTimeout(() => {
            button.classList.remove('added');
        }, 1000);
    }
    
    addToCart(product) {
        // Check if product already in cart
        const existingProduct = this.cart.find(item => item.id === product.id);
        
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            this.cart.push(product);
        }
        
        // Save to localStorage
        this.saveCartToStorage();
    }
    
    loadCartFromStorage() {
        const savedCart = localStorage.getItem('nesh_cart');
        if (savedCart) {
            this.cart = JSON.parse(savedCart);
        }
    }
    
    saveCartToStorage() {
        localStorage.setItem('nesh_cart', JSON.stringify(this.cart));
        
        // Also update the main cart count for consistency
        localStorage.setItem('nesh_cart_count', this.cart.reduce((total, item) => total + item.quantity, 0).toString());
    }
    
    updateCartCount() {
        const cartCount = this.cart.reduce((total, item) => total + item.quantity, 0);
        const cartCountElement = document.getElementById('cartCount');
        
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
        }
        
        // Also update in localStorage for main.js
        localStorage.setItem('nesh_cart_count', cartCount.toString());
    }
    
    showCartNotification(productName) {
        const lang = localStorage.getItem('nesh_language') || 'en';
        const title = lang === 'am' ? 'ምርት ተጨምሯል!' : 'Product Added!';
        const message = lang === 'am' 
            ? `${productName} ወደ ጋሪዎ ታክሏል`
            : `${productName} added to your cart`;
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
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
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    handleQuickView(e) {
        e.preventDefault();
        const button = e.currentTarget;
        const productId = button.getAttribute('data-product');
        
        // In a real implementation, this would open a modal
        // For now, we'll show an alert
        const lang = localStorage.getItem('nesh_language') || 'en';
        const message = lang === 'am' 
            ? 'የምርት ዝርዝር መረጃ በቅርቡ ይመጣል።'
            : 'Product details coming soon.';
        
        alert(message);
    }
    
    handleLoadMore() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (!loadMoreBtn) return;
        
        const lang = localStorage.getItem('nesh_language') || 'en';
        
        // Disable button and show loading
        loadMoreBtn.disabled = true;
        loadMoreBtn.innerHTML = lang === 'am' 
            ? '<i class="fas fa-spinner fa-spin"></i> <span>በመጫን ላይ...</span>'
            : '<i class="fas fa-spinner fa-spin"></i> <span>Loading...</span>';
        
        // Simulate API call
        setTimeout(() => {
            const message = lang === 'am' 
                ? 'ተጨማሪ ምርቶች በቅርቡ ይመጣሉ።'
                : 'More products coming soon.';
            
            // Show message
            this.showLoadMoreNotification(message);
            
            // Reset button
            loadMoreBtn.disabled = false;
            loadMoreBtn.innerHTML = lang === 'am' 
                ? '<span>ተጨማሪ ምርቶችን ጫን</span> <i class="fas fa-arrow-down"></i>'
                : '<span>Load More Products</span> <i class="fas fa-arrow-down"></i>';
        }, 1500);
    }
    
    showLoadMoreNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'info-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(100%);
            background: #2a6d39;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(-50%) translateY(0)';
        }, 10);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(-50%) translateY(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize products page
let neshProducts;

document.addEventListener('DOMContentLoaded', function() {
    neshProducts = new NESHProducts();
    
    // Expose to window for debugging
    window.neshProducts = neshProducts;
});

// Add CSS for notifications
const productNotificationStyles = `
    .cart-notification {
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
    
    .cart-notification.show {
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
    
    .info-notification {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--primary-green);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    
    .btn-add-to-cart.added {
        background-color: #1a4721 !important;
        animation: pulse 1s;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(0.95); }
        100% { transform: scale(1); }
    }
    
    @media (max-width: 768px) {
        .cart-notification {
            top: auto;
            bottom: 20px;
            left: 20px;
            right: 20px;
            max-width: none;
            transform: translateY(100%);
        }
        
        .cart-notification.show {
            transform: translateY(0);
        }
    }
`;

// Inject product notification styles
const productStyleSheet = document.createElement('style');
productStyleSheet.textContent = productNotificationStyles;
document.head.appendChild(productStyleSheet);