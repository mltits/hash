[file name]: footer.js
class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .footer-link:hover {
                    color: #fbbf24;
                    transform: translateX(4px);
                }
                .footer-link {
                    transition: all 0.3s ease;
                }
                .back-to-top {
                    transition: all 0.3s ease;
                }
                .back-to-top:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
                }
            </style>
            <footer class="bg-gray-900 text-white pt-12 pb-6 px-4">
                <!-- Back to top -->
                <div class="container mx-auto mb-8">
                    <button class="back-to-top bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 mx-auto block">
                        Back to top
                    </button>
                </div>
                
                <!-- Main Footer -->
                <div class="container mx-auto">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                        <!-- Get to Know Us -->
                        <div>
                            <h4 class="font-bold text-lg mb-4 text-yellow-300">Get to Know Us</h4>
                            <ul class="space-y-3">
                                <li><a href="#" class="footer-link text-gray-300 hover:text-white flex items-center">About AAU Store</a></li>
                                <li><a href="#" class="footer-link text-gray-300 hover:text-white flex items-center">Careers</a></li>
                                <li><a href="#" class="footer-link text-gray-300 hover:text-white flex items-center">Investor Relations</a></li>
                                <li><a href="#" class="footer-link text-gray-300 hover:text-white flex items-center">AAU Store Devices</a></li>
                                <li><a href="#" class="footer-link text-gray-300 hover:text-white flex items-center">AAU Store Science</a></li>
                            </ul>
                        </div>
                        
                        <!-- Make Money with Us -->
                        <div>
                            <h4 class="font-bold text-lg mb-4 text-yellow-300">Make Money with Us</h4>
                            <ul class="space-y-3">
                                <li><a href="#" class="footer-link text-gray-300 hover:text-white flex items-center">Sell on AAU Store</a></li>
                                <li><a href="#" class="footer-link text-gray-300 hover:text-white flex items-center">Sell under AAU Accelerator</a></li>
                                <li><a href="#" class="footer-link text-gray-300 hover:text-white flex items-center">Become an Affiliate</a></li>
                                <li><a href="#" class="footer-link text-gray-300 hover:text-white flex items-center">Advertise Your Products</a></li>
                                <li><a href="#" class="footer-link text-gray-300 hover:text-white flex items-center">Host an AAU Hub</a></li>
                            </ul>
                        </div>
                        
                        <!-- AAU Store Payment -->
                        <div>
                            <h4 class="font-bold text-lg mb-4 text-yellow-300">AAU Store Payment</h4>
                            <ul class="space-y-3">
                                <li><a href="#" class="footer-link text-gray-300 hover:text-white flex items-center">AAU Store Business Card</a></li>
                                <li><a href="#" class="footer-link text-gray-300 hover:text-white flex items-center">Shop with Points</a></li>
                                <li><a href="#" class="footer-link text-gray-300 hover:text-white flex items-center">Reload Your Balance</a></li>
                                <li><a href="#" class="footer-link text-gray-300 hover:text-white flex items-center">AAU Store Currency Converter</a></li>
                            </ul>
                        </div>
                        
                        <!-- Let Us Help You -->
                        <div>
                            <h4 class="font-bold text-lg mb-4 text-yellow-300">Let Us Help You</h4>
                            <ul class="space-y-3">
                                <li><a href="#" class="footer-link text-gray-300 hover:text-white flex items-center">Your Account</a></li>
                                <li><a href="#" class="footer-link text-gray-300 hover:text-white flex items-center">Your Orders</a></li>
                                <li><a href="#" class="footer-link text-gray-300 hover:text-white flex items-center">Shipping Rates & Policies</a></li>
                                <li><a href="#" class="footer-link text-gray-300 hover:text-white flex items-center">AAU Store Assistant</a></li>
                                <li><a href="#" class="footer-link text-gray-300 hover:text-white flex items-center">Help</a></li>
                            </ul>
                        </div>
                    </div>
                    
                    <!-- Campus Info -->
                    <div class="border-t border-gray-800 pt-8 mb-8">
                        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div class="flex items-center">
                                <i data-feather="map-pin" class="w-5 h-5 text-yellow-400 mr-2"></i>
                                <div>
                                    <div class="font-semibold">AAU Store Campus Center</div>
                                    <div class="text-gray-400 text-sm">Addis Ababa University, Sidist Kilo Campus</div>
                                </div>
                            </div>
                            <div class="flex items-center">
                                <i data-feather="clock" class="w-5 h-5 text-yellow-400 mr-2"></i>
                                <div>
                                    <div class="font-semibold">Store Hours</div>
                                    <div class="text-gray-400 text-sm">Mon-Sun: 8:00 AM - 9:00 PM</div>
                                </div>
                            </div>
                            <div class="flex items-center">
                                <i data-feather="phone" class="w-5 h-5 text-yellow-400 mr-2"></i>
                                <div>
                                    <div class="font-semibold">Campus Support</div>
                                    <div class="text-gray-400 text-sm">+251 11 123 4567</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Social & Language -->
                    <div class="border-t border-gray-800 pt-8">
                        <div class="flex flex-col md:flex-row justify-between items-center gap-6">
                            <!-- Logo -->
                            <div class="flex items-center">
                                <i data-feather="shopping-bag" class="w-6 h-6 text-yellow-400 mr-2"></i>
                                <span class="text-xl font-bold">AAU Store</span>
                            </div>
                            
                            <!-- Social Media -->
                            <div class="flex space-x-4">
                                <a href="#" class="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors">
                                    <i data-feather="facebook" class="w-5 h-5"></i>
                                </a>
                                <a href="#" class="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors">
                                    <i data-feather="twitter" class="w-5 h-5"></i>
                                </a>
                                <a href="#" class="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors">
                                    <i data-feather="instagram" class="w-5 h-5"></i>
                                </a>
                                <a href="#" class="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors">
                                    <i data-feather="linkedin" class="w-5 h-5"></i>
                                </a>
                                <a href="#" class="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors">
                                    <i data-feather="youtube" class="w-5 h-5"></i>
                                </a>
                            </div>
                            
                            <!-- Language Selector -->
                            <div class="flex items-center">
                                <i data-feather="globe" class="w-4 h-4 mr-2 text-gray-400"></i>
                                <select class="bg-gray-800 text-white px-3 py-1 rounded border border-gray-700">
                                    <option>English</option>
                                    <option>Amharic</option>
                                    <option>Afaan Oromoo</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Copyright -->
                    <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div class="text-sm">
                                <a href="#" class="hover:text-white mr-4">Conditions of Use</a>
                                <a href="#" class="hover:text-white mr-4">Privacy Notice</a>
                                <a href="#" class="hover:text-white">Your Ads Privacy Choices</a>
                            </div>
                            <div class="text-sm">
                                <p>&copy; ${new Date().getFullYear()} AAU Store, Inc. All rights reserved.</p>
                                <p class="text-xs mt-1">Addis Ababa University - Student Tech Marketplace</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        `;
        
        // Add back to top functionality
        const backToTopButton = this.shadowRoot.querySelector('.back-to-top');
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

customElements.define('custom-footer', CustomFooter);