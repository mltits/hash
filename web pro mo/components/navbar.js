[file name]: navbar.js
class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .navbar {
                    transition: all 0.3s ease;
                    background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%);
                }
                .navbar-scrolled {
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }
                .dropdown:hover .dropdown-menu {
                    display: block;
                }
                .cart-badge {
                    animation: pulse 2s infinite;
                }
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }
            </style>
            <nav class="navbar py-3 px-6 fixed w-full top-0 z-50">
                <div class="container mx-auto flex items-center justify-between">
                    <!-- Logo -->
                    <div class="flex items-center space-x-8">
                        <a href="/" class="text-2xl font-bold text-white flex items-center">
                            <i data-feather="shopping-bag" class="mr-2"></i>
                            AAU Store
                        </a>
                        
                        <!-- Delivery Info -->
                        <div class="hidden lg:flex items-center text-white/90">
                            <i data-feather="map-pin" class="w-4 h-4 mr-2"></i>
                            <div>
                                <div class="text-xs">Deliver to</div>
                                <div class="font-medium text-sm">AAU Campus</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Search Bar -->
                    <div class="hidden md:flex flex-grow max-w-2xl mx-4">
                        <div class="relative w-full">
                            <input type="text" 
                                   placeholder="Search AAU Store..." 
                                   class="w-full px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-400">
                            <button class="absolute right-0 top-0 h-full bg-yellow-400 px-4 rounded-r-lg hover:bg-yellow-500">
                                <i data-feather="search" class="w-5 h-5 text-gray-900"></i>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Right Side -->
                    <div class="flex items-center space-x-6">
                        <!-- Account -->
                        <div class="dropdown relative">
                            <button class="text-white hover:text-yellow-300 transition-colors flex flex-col items-center">
                                <i data-feather="user" class="w-5 h-5"></i>
                                <span class="text-xs mt-1">Account</span>
                            </button>
                            <div class="dropdown-menu absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg hidden py-2">
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100 text-gray-800">My Account</a>
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100 text-gray-800">Orders</a>
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100 text-gray-800">Student Discount</a>
                                <div class="border-t my-2"></div>
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100 text-gray-800">Sign Out</a>
                            </div>
                        </div>
                        
                        <!-- Orders -->
                        <a href="#" class="text-white hover:text-yellow-300 transition-colors flex flex-col items-center">
                            <i data-feather="package" class="w-5 h-5"></i>
                            <span class="text-xs mt-1">Orders</span>
                        </a>
                        
                        <!-- Cart -->
                        <a href="#" class="text-white hover:text-yellow-300 transition-colors flex flex-col items-center relative">
                            <i data-feather="shopping-cart" class="w-5 h-5"></i>
                            <span class="text-xs mt-1">Cart</span>
                            <span class="cart-badge absolute -top-1 -right-1 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">3</span>
                        </a>
                        
                        <!-- Mobile Menu -->
                        <button class="md:hidden text-white">
                            <i data-feather="menu" class="w-6 h-6"></i>
                        </button>
                    </div>
                </div>
                
                <!-- Bottom Navigation -->
                <div class="hidden md:block border-t border-white/20 mt-3 pt-3">
                    <div class="container mx-auto flex items-center space-x-6">
                        <a href="#" class="text-white hover:text-yellow-300 transition-colors font-medium">
                            <i data-feather="menu" class="w-4 h-4 inline mr-1"></i>
                            All Categories
                        </a>
                        <a href="#" class="text-white hover:text-yellow-300 transition-colors">Today's Deals</a>
                        <a href="#" class="text-white hover:text-yellow-300 transition-colors">Student Discount</a>
                        <a href="#" class="text-white hover:text-yellow-300 transition-colors">Best Sellers</a>
                        <a href="#" class="text-white hover:text-yellow-300 transition-colors">New Arrivals</a>
                        <a href="#" class="text-white hover:text-yellow-300 transition-colors">Gift Cards</a>
                    </div>
                </div>
            </nav>
            
            <!-- Mobile Search -->
            <div class="md:hidden bg-white py-3 px-4 shadow-md mt-16">
                <div class="flex">
                    <input type="text" 
                           placeholder="Search AAU Store..." 
                           class="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg">
                    <button class="bg-blue-600 text-white px-4 rounded-r-lg">
                        <i data-feather="search" class="w-5 h-5"></i>
                    </button>
                </div>
            </div>
        `;

        // Add scroll effect
        window.addEventListener('scroll', () => {
            const nav = this.shadowRoot.querySelector('.navbar');
            if (window.scrollY > 20) {
                nav.classList.add('navbar-scrolled');
            } else {
                nav.classList.remove('navbar-scrolled');
            }
        });

        // Initialize dropdowns
        const dropdowns = this.shadowRoot.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const button = dropdown.querySelector('button');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                menu.classList.toggle('hidden');
            });
            
            // Close when clicking outside
            document.addEventListener('click', () => {
                menu.classList.add('hidden');
            });
        });
    }
}

customElements.define('custom-navbar', CustomNavbar);