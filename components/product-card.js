class CustomProductCard extends HTMLElement {
    constructor() {
        super();
    }
    
    connectedCallback() {
        console.log('Product card connected:', this.getAttribute('title'));
        
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
                    background: white;
                    border-radius: 0.5rem;
                    overflow: hidden;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                    border: 1px solid #e5e7eb;
                    transition: all 0.3s;
                }
                .product-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 20px 25px rgba(0,0,0,0.1);
                }
                .product-image {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                    background: #f3f4f6;
                }
                .product-info {
                    padding: 1rem;
                }
                .product-title {
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: #1f2937;
                    margin-bottom: 0.5rem;
                    height: 2.5rem;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
                .product-price {
                    font-size: 1.125rem;
                    font-weight: bold;
                    color: #111827;
                }
                .original-price {
                    font-size: 0.875rem;
                    color: #6b7280;
                    text-decoration: line-through;
                    margin-left: 0.5rem;
                }
                .deal-badge {
                    background: #dc2626;
                    color: white;
                    font-size: 0.75rem;
                    font-weight: bold;
                    padding: 0.125rem 0.5rem;
                    border-radius: 0.25rem;
                    margin-left: 0.5rem;
                }
                .rating {
                    margin-top: 0.5rem;
                    font-size: 0.875rem;
                    color: #6b7280;
                }
                .add-to-cart {
                    margin-top: 0.75rem;
                    width: 100%;
                    padding: 0.5rem;
                    background: #fbbf24;
                    color: #000;
                    border-radius: 0.375rem;
                    font-weight: 500;
                    border: none;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }
                .add-to-cart:hover {
                    background: #f59e0b;
                }
            </style>
            <div class="product-card">
                <img src="${image}" alt="${title}" class="product-image">
                <div class="product-info">
                    <div class="product-title">${title}</div>
                    <div>
                        <span class="product-price">$${price}</span>
                        ${originalPrice ? `<span class="original-price">$${originalPrice}</span>` : ''}
                        ${deal ? `<span class="deal-badge">DEAL</span>` : ''}
                    </div>
                    <div class="rating">
                        Rating: ${rating}/5 • ${reviewCount} reviews
                    </div>
                    <button class="add-to-cart">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        
        // Add click event
        const button = this.shadowRoot.querySelector('button');
        button.addEventListener('click', () => {
            console.log(`Added ${title} to cart for $${price}`);
            // Dispatch event for cart functionality
            const event = new CustomEvent('add-to-cart', {
                bubbles: true,
                composed: true,
                detail: {
                    title: title,
                    price: price,
                    image: image
                }
            });
            this.dispatchEvent(event);
            
            // Show visual feedback
            button.textContent = 'Added!';
            button.style.backgroundColor = '#10b981';
            setTimeout(() => {
                button.textContent = 'Add to Cart';
                button.style.backgroundColor = '#fbbf24';
            }, 1000);
        });
    }
}

// Register the component
if (!customElements.get('custom-product-card')) {
    customElements.define('custom-product-card', CustomProductCard);
    console.log('✅ CustomProductCard registered successfully');
}