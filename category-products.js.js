// category-products.js
document.addEventListener('DOMContentLoaded', () => {
    const category = getCategoryFromURL();
    loadCategoryData(category);
    loadProducts(category);
    setupFilters();
});

function getCategoryFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('category') || 'phones';
}

const categoryData = {
    phones: {
        title: 'Smartphones',
        description: 'Latest smartphones from top brands with student discounts',
        info: {
            title: 'AAU Store Smartphone Collection',
            content: '<p>Discover the latest smartphones from Apple, Samsung, Google, and more. All devices come with student-exclusive discounts, campus pickup options, and free accessories for AAU students.</p><p>Our smartphones are tested and certified for academic use, with extended battery life and education-focused features.</p>'
        },
        icon: 'smartphone',
        color: 'blue'
    },
    laptops: {
        title: 'Laptops & Computers',
        description: 'Powerful laptops for students and professionals',
        info: {
            title: 'Student Laptops & Workstations',
            content: '<p>From lightweight ultrabooks to powerful gaming laptops, find the perfect machine for your studies. All laptops come pre-installed with academic software and include Microsoft Office 365 for students.</p>'
        },
        icon: 'laptop',
        color: 'purple'
    },
    audio: {
        title: 'Audio & Headphones',
        description: 'Premium audio gear for study and entertainment',
        info: {
            title: 'Audio Excellence for Students',
            content: '<p>Noise-cancelling headphones, studio monitors, and portable speakers perfect for study sessions, online classes, and campus life.</p>'
        },
        icon: 'headphones',
        color: 'green'
    },
    tablets: {
        title: 'Tablets & iPads',
        description: 'Versatile tablets for note-taking and media',
        info: {
            title: 'Digital Note-taking & Creativity',
            content: '<p>Transform your study routine with powerful tablets. Perfect for digital notes, e-books, and creative projects.</p>'
        },
        icon: 'tablet',
        color: 'red'
    },
    wearables: {
        title: 'Wearables & Smartwatches',
        description: 'Smartwatches and fitness trackers',
        info: {
            title: 'Stay Connected & Active',
            content: '<p>Track your fitness, manage notifications, and stay productive with our selection of smartwatches and wearables.</p>'
        },
        icon: 'watch',
        color: 'yellow'
    },
    components: {
        title: 'PC Components',
        description: 'Upgrade your setup with quality components',
        info: {
            title: 'Build Your Dream PC',
            content: '<p>From gaming rigs to workstations, find all the components you need to build or upgrade your PC at student-friendly prices.</p>'
        },
        icon: 'cpu',
        color: 'indigo'
    }
};

const categoryProducts = {
    phones: [
        {
            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
            title: "iPhone 15 Pro Max",
            price: "1199.99",
            originalPrice: "1299.99",
            rating: "4.8",
            brand: "apple",
            deal: true
        },
        {
            image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
            title: "Samsung Galaxy S23 Ultra",
            price: "1099.99",
            rating: "4.7",
            brand: "samsung"
        },
        {
            image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400",
            title: "Google Pixel 8 Pro",
            price: "899.99",
            originalPrice: "999.99",
            rating: "4.6",
            brand: "google",
            deal: true
        },
        // Add more phone products...
    ],
    laptops: [
        {
            image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
            title: "MacBook Pro M3",
            price: "1999.99",
            rating: "4.9",
            brand: "apple"
        },
        {
            image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
            title: "Dell XPS 15",
            price: "1499.99",
            originalPrice: "1699.99",
            rating: "4.7",
            brand: "dell",
            deal: true
        },
        // Add more laptop products...
    ],
    // Add products for other categories...
};

function loadCategoryData(category) {
    const data = categoryData[category];
    if (!data) return;
    
    // Update page title
    document.title = `AAU Store - ${data.title}`;
    
    // Update header
    document.getElementById('category-name').textContent = data.title;
    document.getElementById('category-description').textContent = data.description;
    document.getElementById('category-title').textContent = data.title;
    
    // Update category info
    document.getElementById('info-title').textContent = data.info.title;
    document.getElementById('info-content').innerHTML = data.info.content;
}

function loadProducts(category, filters = {}) {
    const products = categoryProducts[category] || [];
    const productsGrid = document.getElementById('products-grid');
    const loading = document.getElementById('loading');
    const noResults = document.getElementById('no-results');
    
    // Clear previous products
    productsGrid.innerHTML = '';
    loading.classList.remove('hidden');
    noResults.classList.add('hidden');
    
    // Simulate loading delay
    setTimeout(() => {
        loading.classList.add('hidden');
        
        if (products.length === 0) {
            noResults.classList.remove('hidden');
            return;
        }
        
        // Apply filters
        let filteredProducts = products;
        
        if (filters.brand && filters.brand.length > 0) {
            filteredProducts = filteredProducts.filter(p => 
                filters.brand.includes(p.brand)
            );
        }
        
        if (filters.rating && filters.rating.length > 0) {
            filteredProducts = filteredProducts.filter(p => {
                const rating = parseFloat(p.rating);
                return filters.rating.some(r => {
                    if (r === '4+') return rating >= 4;
                    if (r === '3+') return rating >= 3;
                    return false;
                });
            });
        }
        
        if (filters.deal && filters.deal.includes('true')) {
            filteredProducts = filteredProducts.filter(p => p.deal);
        }
        
        // Sort products
        const sortValue = document.getElementById('sort-select')?.value || 'featured';
        filteredProducts = sortProducts(filteredProducts, sortValue);
        
        // Update product count
        document.getElementById('product-count').textContent = filteredProducts.length;
        
        // Display products
        filteredProducts.forEach(product => {
            const productCard = document.createElement('custom-product-card');
            
            // Set attributes
            for (const [key, value] of Object.entries(product)) {
                if (value !== undefined) {
                    productCard.setAttribute(key.replace(/([A-Z])/g, '-$1').toLowerCase(), value);
                }
            }
            
            // Add review count if not specified
            if (!productCard.getAttribute('review-count')) {
                productCard.setAttribute('review-count', Math.floor(Math.random() * 500 + 100).toString());
            }
            
            productsGrid.appendChild(productCard);
        });
        
        // Show/hide load more button
        const loadMoreContainer = document.getElementById('load-more-container');
        if (filteredProducts.length > 12) {
            loadMoreContainer.classList.remove('hidden');
        } else {
            loadMoreContainer.classList.add('hidden');
        }
        
        // Initialize feather icons
        feather.replace();
        
    }, 500);
}

function sortProducts(products, sortBy) {
    const sorted = [...products];
    
    switch (sortBy) {
        case 'price-low':
            return sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        case 'price-high':
            return sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        case 'rating':
            return sorted.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        case 'newest':
            return sorted.reverse(); // Assuming newer products are at the end
        case 'best-selling':
            return sorted.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
        default:
            return sorted; // Featured
    }
}

function setupFilters() {
    const filterCheckboxes = document.querySelectorAll('input[data-filter]');
    const sortSelect = document.getElementById('sort-select');
    const clearFiltersBtn = document.getElementById('clear-filters');
    
    const currentFilters = {
        brand: [],
        rating: [],
        deal: []
    };
    
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const filterType = checkbox.dataset.filter;
            const value = checkbox.value;
            
            if (checkbox.checked) {
                if (!currentFilters[filterType]) {
                    currentFilters[filterType] = [];
                }
                currentFilters[filterType].push(value);
            } else {
                currentFilters[filterType] = currentFilters[filterType].filter(v => v !== value);
            }
            
            loadProducts(getCategoryFromURL(), currentFilters);
        });
    });
    
    sortSelect?.addEventListener('change', () => {
        loadProducts(getCategoryFromURL(), currentFilters);
    });
    
    clearFiltersBtn?.addEventListener('click', () => {
        filterCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        Object.keys(currentFilters).forEach(key => {
            currentFilters[key] = [];
        });
        
        sortSelect.value = 'featured';
        loadProducts(getCategoryFromURL(), currentFilters);
    });
}