[file name]: product-card.js
class CustomProductCard extends HTMLElement {
    connectedCallback() {
        const image = this.getAttribute('image') || 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400';
        const title = this.getAttribute('title') || 'Product Title';
        const price = this.getAttribute('price') || '0.00';
        const originalPrice = this.getAttribute('original-price');
        const rating = this.getAttribute('rating') || '0';
        const reviewCount = this.getAttribute('review-count') || '128';
        const deal = this.getAttribute('deal') === 'true';
        
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .product-card {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                }
                .product-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                }
                .product-card:hover .quick-view {
                    opacity: 1;
                    transform: translateY(0);
                }
                .add-to-cart:hover {
                    background-color: #fbbf24;
                    transform: scale(1.05);
                }
                .deal-badge {
                    animation: pulse 2s infinite;
                }
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }
                .quick-view {
                    transition: all 0.3s ease;
                    opacity: 0;
                    transform: translateY(10px);
                }
            </style>
            <div class="product-card bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <!-- Image Container -->
                <div class="relative aspect-square overflow-hidden bg-gray-100">
                    <img src="${image}" alt="${title}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105">
                    
                    <!-- Quick View Button -->
                    <button class="quick-view absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700">
                        Quick View
                    </button>
                    
                    <!-- Badges -->
                    <div class="absolute top-2 left-2 flex flex-col gap-2">
                        ${deal ? `<span class="deal-badge bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">DEAL</span>` : ''}
                        <span class="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">AAU</span>
                    </div>
                    
                    <!-- Wishlist Button -->
                    <button class="absolute top-2 right-2 bg-white/90 p-1 rounded-full hover:bg-white">
                        <i data-feather="heart" class="w-4 h-4 text-gray-600"></i>
                    </button>
                </div>
                
                <!-- Product Info -->
                <div class="p-4">
                    <!-- Category -->
                    <div class="text-xs text-gray-500 mb-1">Electronics</div>
                    
                    <!-- Title -->
                    <h3 class="text-sm font-medium text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer" title="${title}">
                        ${title}
                    </h3>
                    
                    <!-- Rating -->
                    <div class="flex items-center mb-3">
                        <div class="flex text-yellow-400 mr-2">
                            ${this.renderStars(rating)}
                        </div>
                        <span class="text-gray-600 text-xs">${rating}</span>
                        <span class="text-gray-400 text-xs mx-1">•</span>
                        <span class="text-gray-500 text-xs">${reviewCount} reviews</span>
                    </div>
                    
                    <!-- Price -->
                    <div class="mb-4">
                        <div class="flex items-baseline">
                            <span class="text-lg font-bold text-gray-900">$${price}</span>
                            ${originalPrice ? `
                                <span class="text-sm text-gray-500 line-through ml-2">$${originalPrice}</span>
                                <span class="text-xs font-semibold bg-green-100 text-green-800 px-1 rounded ml-2">
                                    Save $${(parseFloat(originalPrice) - parseFloat(price)).toFixed(2)}
                                </span>
                            ` : ''}
                        </div>
                        ${this.calculateMonthly(price) ? `
                            <div class="text-xs text-gray-600 mt-1">
                                ${this.calculateMonthly(price)}/mo for 12 mo
                            </div>
                        ` : ''}
                    </div>
                    
                    <!-- Actions -->
                    <div class="flex gap-2">
                        <button class="add-to-cart flex-grow bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-all flex items-center justify-center">
                            <i data-feather="shopping-cart" class="w-4 h-4 mr-2"></i>
                            Add to Cart
                        </button>
                        <button class="bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200">
                            <i data-feather="more-vertical" class="w-4 h-4"></i>
                        </button>
                    </div>
                    
                    <!-- Features -->
                    <div class="mt-3 pt-3 border-t border-gray-100">
                        <div class="flex items-center text-xs text-gray-600">
                            <i data-feather="truck" class="w-3 h-3 mr-1"></i>
                            <span>Free campus delivery</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add event listeners
        const addToCartButton = this.shadowRoot.querySelector('.add-to-cart');
        const quickViewButton = this.shadowRoot.querySelector('.quick-view');
        const wishlistButton = this.shadowRoot.querySelector('button:nth-child(3)');
        const titleElement = this.shadowRoot.querySelector('h3');

        addToCartButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.dispatchAddToCart(title, price, image);
        });

        quickViewButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.dispatchQuickView(title, price, image, rating);
        });

        wishlistButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleWishlist(title, price, image);
        });

        titleElement.addEventListener('click', (e) => {
            e.stopPropagation();
            this.dispatchProductView(title);
        });

        // Hover effect for wishlist
        wishlistButton.addEventListener('mouseenter', () => {
            const icon = wishlistButton.querySelector('i');
            icon.setAttribute('data-feather', 'heart');
            feather.replace();
        });
    }

    renderStars(rating) {
        const stars = [];
        const fullStars = Math.floor(rating);
        const decimal = rating - fullStars;
        
        for (let i = 0; i < fullStars; i++) {
            stars.push('<i data-feather="star" class="w-3 h-3 fill-current"></i>');
        }
        
        if (decimal >= 0.3 && decimal <= 0.7) {
            stars.push('<i data-feather="star" class="w-3 h-3 fill-current" style="clip-path: inset(0 50% 0 0)"></i>');
        } else if (decimal > 0.7) {
            stars.push('<i data-feather="star" class="w-3 h-3 fill-current"></i>');
        }
        
        const totalStars = stars.length;
        const emptyStars = 5 - totalStars;
        for (let i = 0; i < emptyStars; i++) {
            stars.push('<i data-feather="star" class="w-3 h-3 text-gray-300"></i>');
        }
        
        return stars.join('');
    }

    calculateMonthly(price) {
        const monthly = parseFloat(price) / 12;
        return monthly >= 10 ? `$${monthly.toFixed(2)}` : null;
    }

    dispatchAddToCart(title, price, image) {
        const event = new CustomEvent('add-to-cart', {
            bubbles: true,
            composed: true,
            detail: {
                title: title,
                price: price,
                image: image,
                timestamp: new Date().toISOString()
            }
        });
        this.dispatchEvent(event);
    }

    dispatchQuickView(title, price, image, rating) {
        const event = new CustomEvent('quick-view', {
            bubbles: true,
            composed: true,
            detail: {
                title: title,
                price: price,
                image: image,
                rating: rating
            }
        });
        this.dispatchEvent(event);
    }

    toggleWishlist(title, price, image) {
        const button = this.shadowRoot.querySelector('button:nth-child(3)');
        const icon = button.querySelector('i');
        const isInWishlist = icon.getAttribute('data-feather') === 'heart';
        
        if (isInWishlist) {
            icon.setAttribute('data-feather', 'heart');
            icon.style.fill = 'currentColor';
        } else {
            icon.setAttribute('data-feather', 'heart');
            icon.style.fill = '#ef4444';
        }
        
        feather.replace();
        
        const event = new CustomEvent('wishlist-toggle', {
            bubbles: true,
            composed: true,
            detail: {
                title: title,
                price: price,
                image: image,
                added: !isInWishlist
            }
        });
        this.dispatchEvent(event);
    }

    dispatchProductView(title) {
        const event = new CustomEvent('product-view', {
            bubbles: true,
            composed: true,
            detail: { title: title }
        });
        this.dispatchEvent(event);
    }
}

customElements.define('custom-product-card', CustomProductCard);