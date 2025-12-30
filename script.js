// AAU Store - Simplified E-commerce Script

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 AAU Store loaded successfully');
    
    // Initialize icons
    feather.replace();
    
    // Initialize cart from localStorage
    let cart = JSON.parse(localStorage.getItem('aau-cart')) || [];
    updateCartCount(cart.length);
    
    // Setup event listeners
    setupEventListeners();
});

function setupEventListeners() {
    // Add to cart buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const card = e.target.closest('.product-card');
            const title = card.querySelector('h3').textContent;
            const price = parseFloat(card.querySelector('span').textContent.replace('$', ''));
            const image = card.querySelector('img').src;
            
            // Add to cart
            let cart = JSON.parse(localStorage.getItem('aau-cart')) || [];
            cart.push({
                title,
                price,
                image,
                id: Date.now(),
                quantity: 1
            });
            localStorage.setItem('aau-cart', JSON.stringify(cart));
            
            // Update cart count
            updateCartCount(cart.length);
            
            // Show notification
            showNotification(`Added ${title} to cart!`, 'success');
            e.preventDefault();
        }
    });
    
    // Cart button
    const cartButton = document.getElementById('cartButton');
    if (cartButton) {
        cartButton.addEventListener('click', showCartModal);
    }
    
    // Newsletter form
    const newsletterButton = document.getElementById('newsletterButton');
    if (newsletterButton) {
        newsletterButton.addEventListener('click', handleNewsletterSubmit);
    }
    
    // Search functionality (simplified)
    const searchInput = document.querySelector('input[placeholder*="Search"]');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                console.log(`🔍 Searching for: ${e.target.value}`);
                // Simple search alert
                if (e.target.value.trim()) {
                    showNotification(`Searching for: ${e.target.value}`, 'info');
                }
            }
        });
    }
}

function updateCartCount(count) {
    const cartBadge = document.getElementById('cartCount');
    if (cartBadge) {
        cartBadge.textContent = count;
        
        // Add animation
        cartBadge.classList.add('animate-ping');
        setTimeout(() => {
            cartBadge.classList.remove('animate-ping');
        }, 500);
    }
}

function showNotification(message, type = 'info') {
    // Create simple alert for now
    alert(message);
}

function showCartModal() {
    let cart = JSON.parse(localStorage.getItem('aau-cart')) || [];
    
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Calculate total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = total * 0.1; // 10% student discount
    const finalTotal = total - discount;
    
    alert(`Shopping Cart (${cart.length} items):\n\n` +
          cart.map(item => `• ${item.title} - $${item.price.toFixed(2)}`).join('\n') +
          `\n\nSubtotal: $${total.toFixed(2)}` +
          `\nStudent Discount (10%): -$${discount.toFixed(2)}` +
          `\nTotal: $${finalTotal.toFixed(2)}`);
}

function handleNewsletterSubmit() {
    const input = this.previousElementSibling;
    const email = input.value.trim();
    
    if (email.includes('@') && email.includes('.')) {
        if (email.endsWith('@aau.edu.et')) {
            localStorage.setItem('aau-student-email', email);
            showNotification('🎓 Student discount activated! 10% off all purchases!', 'success');
        }
        
        showNotification('Thanks for subscribing to AAU Store!', 'success');
        input.value = '';
    } else {
        showNotification('Please enter a valid email address', 'error');
    }
}

// Refresh feather icons every 5 seconds (in case new content loads)
setInterval(feather.replace, 5000);
