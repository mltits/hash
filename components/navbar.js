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