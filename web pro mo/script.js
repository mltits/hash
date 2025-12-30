[file name]: script.js
// AAU Store - Enhanced E-commerce Script

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 AAU Store loaded successfully');
    
    // Initialize animations
    initializeProductCardAnimations();
    
    // Event Listeners
    setupEventListeners();
    
    // Cart functionality
    initializeCart();
    
    // Wishlist functionality
    initializeWishlist();
    
    // Search functionality
    initializeSearch();
    
    // Student verification
    initializeStudentVerification();
});

function initializeProductCardAnimations() {
    const productCards = document.querySelectorAll('custom-product-card');
    productCards.forEach((card, index) => {
        card.style.setProperty('--order', index);
        card.style.animationDelay = `${index * 0.05}s`;
    });
}

function setupEventListeners() {
    // Add to cart event
    document.addEventListener('add-to-cart', (e) => {
        console.log(`🛒 Added "${e.detail.title}" to cart for $${e.detail.price}`);
        updateCartCount(1);
        showNotification(`Added ${e.detail.title} to cart!`, 'success');
        
        // Update cart badge with animation
        const cartBadge = document.querySelector('custom-navbar')?.shadowRoot?.querySelector('.cart-badge');
        if (cartBadge) {
            cartBadge.classList.add('cart-badge');
            setTimeout(() => cartBadge.classList.remove('cart-badge'), 2100);
        }
    });
    
    // Quick view event
    document.addEventListener('quick-view', (e) => {
        console.log(`👁️ Quick view: ${e.detail.title}`);
        showQuickViewModal(e.detail);
    });
    
    // Wishlist toggle event
    document.addEventListener('wishlist-toggle', (e) => {
        console.log(`💖 ${e.detail.added ? 'Added to' : 'Removed from'} wishlist: ${e.detail.title}`);
        showNotification(`${e.detail.title} ${e.detail.added ? 'added to' : 'removed from'} wishlist`, 'info');
    });
    
    // Product view event
    document.addEventListener('product-view', (e) => {
        console.log(`📱 Viewing product: ${e.detail.title}`);
        // In real app, navigate to product page
        window.location.href = `/product/${encodeURIComponent(e.detail.title)}`;
    });
    
    // Newsletter form
    const newsletterForms = document.querySelectorAll('form');
    newsletterForms.forEach(form => {
        if (form.querySelector('input[type="email"]')) {
            form.addEventListener('submit', handleNewsletterSubmit);
        }
    });
}

function initializeCart() {
    let cart = JSON.parse(localStorage.getItem('aau-cart')) || [];
    updateCartCount(cart.length);
    
    // Load cart from localStorage on page load
    document.addEventListener('add-to-cart', (e) => {
        cart.push({
            ...e.detail,
            id: Date.now(),
            quantity: 1
        });
        localStorage.setItem('aau-cart', JSON.stringify(cart));
        updateCartCount(cart.length);
    });
}

function initializeWishlist() {
    let wishlist = JSON.parse(localStorage.getItem('aau-wishlist')) || [];
    
    document.addEventListener('wishlist-toggle', (e) => {
        if (e.detail.added) {
            wishlist.push(e.detail);
        } else {
            wishlist = wishlist.filter(item => item.title !== e.detail.title);
        }
        localStorage.setItem('aau-wishlist', JSON.stringify(wishlist));
    });
}

function initializeSearch() {
    const searchInputs = document.querySelectorAll('input[type="text"][placeholder*="Search"]');
    searchInputs.forEach(input => {
        input.addEventListener('input', debounce(handleSearch, 300));
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch(e);
            }
        });
    });
}

function initializeStudentVerification() {
    // Check for student email in localStorage
    const studentEmail = localStorage.getItem('aau-student-email');
    if (studentEmail) {
        applyStudentDiscount();
    }
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    const emailInput = e.target.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    if (isValidEmail(email)) {
        if (email.endsWith('@aau.edu.et')) {
            localStorage.setItem('aau-student-email', email);
            applyStudentDiscount();
            showNotification('🎓 Student discount activated! 10% off all purchases!', 'success');
        }
        
        console.log(`📧 Subscribed: ${email}`);
        showNotification('Thanks for subscribing to AAU Store!', 'success');
        emailInput.value = '';
        
        // In production: Send to backend
        // fetch('/api/newsletter', { method: 'POST', body: JSON.stringify({ email }) });
    } else {
        showNotification('Please enter a valid email address', 'error');
    }
}

function handleSearch(e) {
    const searchTerm = e.target.value.trim();
    if (searchTerm.length > 2) {
        console.log(`🔍 Searching for: ${searchTerm}`);
        // In production: Make API call
        // fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`)
    }
}

function applyStudentDiscount() {
    // Add visual indicator for student discount
    const priceElements = document.querySelectorAll('custom-product-card');
    priceElements.forEach(card => {
        const shadow = card.shadowRoot;
        if (shadow) {
            const priceEl = shadow.querySelector('.text-lg.font-bold');
            if (priceEl) {
                const originalPrice = parseFloat(priceEl.textContent.replace('$', ''));
                const discountedPrice = (originalPrice * 0.9).toFixed(2);
                priceEl.innerHTML = `
                    <span class="text-red-600 line-through text-sm mr-2">$${originalPrice}</span>
                    <span>$${discountedPrice}</span>
                    <span class="text-xs bg-green-100 text-green-800 px-1 rounded ml-2">STUDENT -10%</span>
                `;
            }
        }
    });
}

function updateCartCount(count) {
    const cartBadges = document.querySelectorAll('.cart-badge');
    cartBadges.forEach(badge => {
        badge.textContent = count;
        badge.style.animation = 'none';
        setTimeout(() => {
            badge.style.animation = 'pulse 2s infinite';
        }, 10);
    });
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function showQuickViewModal(product) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div class="p-6">
                <div class="flex justify-between items-start mb-6">
                    <h2 class="text-2xl font-bold">${product.title}</h2>
                    <button class="text-gray-500 hover:text-gray-700">
                        <i data-feather="x" class="w-6 h-6"></i>
                    </button>
                </div>
                <div class="grid md:grid-cols-2 gap-8">
                    <div>
                        <img src="${product.image}" alt="${product.title}" class="w-full rounded-lg">
                    </div>
                    <div>
                        <div class="text-3xl font-bold text-gray-900 mb-4">$${product.price}</div>
                        <div class="flex items-center mb-4">
                            <div class="flex text-yellow-400 mr-2">
                                ${Array(5).fill('<i data-feather="star" class="w-5 h-5 fill-current"></i>').join('')}
                            </div>
                            <span class="text-gray-600">${product.rating}/5</span>
                        </div>
                        <p class="text-gray-600 mb-6">Premium product with campus delivery available for AAU students.</p>
                        <button class="w-full bg-yellow-400 text-gray-900 py-3 rounded-lg font-bold hover:bg-yellow-500 mb-4">
                            Add to Cart - $${product.price}
                        </button>
                        <button class="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50">
                            Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    feather.replace();
    
    // Close modal
    modal.querySelector('button').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        feather.replace();
        // Refresh icons every second
        setInterval(feather.replace, 1000);
    });
} else {
    feather.replace();
    setInterval(feather.replace, 1000);
}