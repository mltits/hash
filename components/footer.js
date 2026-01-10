class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                /* Main styles */
                .footer {
                    background: #1f2937;
                    color: white;
                    padding-top: 3rem;
                    padding-bottom: 1.5rem;
                    padding-left: 1rem;
                    padding-right: 1rem;
                }
                
                .footer-container {
                    max-width: 1280px;
                    margin-left: auto;
                    margin-right: auto;
                    width: 100%;
                }
                
                .back-to-top {
                    display: block;
                    background: #2563eb;
                    color: white;
                    padding: 0.5rem 1.5rem;
                    border-radius: 0.5rem;
                    margin-left: auto;
                    margin-right: auto;
                    margin-bottom: 2rem;
                    border: none;
                    cursor: pointer;
                    font-weight: 500;
                    transition: all 0.3s ease;
                }
                
                .back-to-top:hover {
                    background: #1d4ed8;
                    transform: translateY(-3px);
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
                }
                
                .footer-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 2rem;
                    margin-bottom: 2rem;
                }
                
                @media (min-width: 768px) {
                    .footer-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                
                @media (min-width: 1024px) {
                    .footer-grid {
                        grid-template-columns: repeat(4, 1fr);
                    }
                }
                
                .footer-section h4 {
                    font-weight: bold;
                    font-size: 1.125rem;
                    margin-bottom: 1rem;
                    color: #fbbf24;
                }
                
                .footer-links {
                    list-style: none;
                }
                
                .footer-links li {
                    margin-bottom: 0.75rem;
                }
                
                .footer-link {
                    color: #d1d5db;
                    display: flex;
                    align-items: center;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }
                
                .footer-link:hover {
                    color: #fbbf24;
                    transform: translateX(4px);
                }
                
                .campus-info {
                    border-top: 1px solid #374151;
                    padding-top: 2rem;
                    margin-bottom: 2rem;
                }
                
                .info-grid {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    gap: 1rem;
                }
                
                @media (min-width: 768px) {
                    .info-grid {
                        flex-direction: row;
                    }
                }
                
                .info-item {
                    display: flex;
                    align-items: center;
                }
                
                .info-icon {
                    color: #fbbf24;
                    width: 1.25rem;
                    height: 1.25rem;
                    margin-right: 0.5rem;
                }
                
                .info-text div:first-child {
                    font-weight: 600;
                }
                
                .info-text div:last-child {
                    color: #9ca3af;
                    font-size: 0.875rem;
                }
                
                .footer-bottom {
                    border-top: 1px solid #374151;
                    padding-top: 2rem;
                }
                
                .footer-bottom-content {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    gap: 1.5rem;
                }
                
                @media (min-width: 768px) {
                    .footer-bottom-content {
                        flex-direction: row;
                    }
                }
                
                .logo {
                    display: flex;
                    align-items: center;
                }
                
                .logo-icon {
                    color: #fbbf24;
                    width: 1.5rem;
                    height: 1.5rem;
                    margin-right: 0.5rem;
                }
                
                .logo-text {
                    font-size: 1.25rem;
                    font-weight: bold;
                }
                
                .social-links {
                    display: flex;
                    gap: 1rem;
                }
                
                .social-link {
                    background: #374151;
                    padding: 0.5rem;
                    border-radius: 9999px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s;
                }
                
                .social-link:hover {
                    background: #4b5563;
                }
                
                .social-icon {
                    width: 1.25rem;
                    height: 1.25rem;
                }
                
                .language-selector {
                    display: flex;
                    align-items: center;
                }
                
                .language-icon {
                    color: #9ca3af;
                    width: 1rem;
                    height: 1rem;
                    margin-right: 0.5rem;
                }
                
                select {
                    background: #374151;
                    color: white;
                    padding: 0.25rem 0.75rem;
                    border-radius: 0.25rem;
                    border: 1px solid #4b5563;
                }
                
                .copyright {
                    text-align: center;
                    color: #9ca3af;
                    border-top: 1px solid #374151;
                    margin-top: 2rem;
                    padding-top: 2rem;
                }
                
                .copyright-links {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    gap: 1rem;
                }
                
                @media (min-width: 768px) {
                    .copyright-links {
                        flex-direction: row;
                    }
                }
                
                .copyright-links a {
                    color: #9ca3af;
                    text-decoration: none;
                    margin-right: 1rem;
                }
                
                .copyright-links a:hover {
                    color: white;
                }
                
                .copyright-text {
                    font-size: 0.875rem;
                }
                
                .copyright-small {
                    font-size: 0.75rem;
                    margin-top: 0.25rem;
                }
            </style>
            
            <footer class="footer">
                <!-- Back to top -->
                <div class="footer-container">
                    <button class="back-to-top">
                        Back to top
                    </button>
                    
                    <!-- Main Footer -->
                    <div class="footer-grid">
                        <!-- Get to Know Us -->
                        <div class="footer-section">
                            <h4>Get to Know Us</h4>
                            <ul class="footer-links">
                                <li><a href="#" class="footer-link">About AAU Store</a></li>
                                <li><a href="#" class="footer-link">Careers</a></li>
                                <li><a href="#" class="footer-link">Investor Relations</a></li>
                                <li><a href="#" class="footer-link">AAU Store Devices</a></li>
                                <li><a href="#" class="footer-link">AAU Store Science</a></li>
                            </ul>
                        </div>
                        
                        <!-- Make Money with Us -->
                        <div class="footer-section">
                            <h4>Make Money with Us</h4>
                            <ul class="footer-links">
                                <li><a href="#" class="footer-link">Sell on AAU Store</a></li>
                                <li><a href="#" class="footer-link">Sell under AAU Accelerator</a></li>
                                <li><a href="#" class="footer-link">Become an Affiliate</a></li>
                                <li><a href="#" class="footer-link">Advertise Your Products</a></li>
                                <li><a href="#" class="footer-link">Host an AAU Hub</a></li>
                            </ul>
                        </div>
                        
                        <!-- AAU Store Payment -->
                        <div class="footer-section">
                            <h4>AAU Store Payment</h4>
                            <ul class="footer-links">
                                <li><a href="#" class="footer-link">AAU Store Business Card</a></li>
                                <li><a href="#" class="footer-link">Shop with Points</a></li>
                                <li><a href="#" class="footer-link">Reload Your Balance</a></li>
                                <li><a href="#" class="footer-link">AAU Store Currency Converter</a></li>
                            </ul>
                        </div>
                        
                        <!-- Let Us Help You -->
                        <div class="footer-section">
                            <h4>Let Us Help You</h4>
                            <ul class="footer-links">
                                <li><a href="#" class="footer-link">Your Account</a></li>
                                <li><a href="#" class="footer-link">Your Orders</a></li>
                                <li><a href="#" class="footer-link">Shipping Rates & Policies</a></li>
                                <li><a href="#" class="footer-link">AAU Store Assistant</a></li>
                                <li><a href="#" class="footer-link">Help</a></li>
                            </ul>
                        </div>
                    </div>
                    

                    <!-- Copyright -->
                    <div class="copyright">
                        <div class="copyright-links">
                            <div>
                                <a href="#">Conditions of Use</a>
                                <a href="#">Privacy Notice</a>
                                <a href="#">Your Ads Privacy Choices</a>
                            </div>
                            <div class="copyright-text">
                                <p>&copy; ${new Date().getFullYear()} AAU Store, Inc. All rights reserved.</p>
                                <p class="copyright-small">Addis Ababa University - Student Tech Marketplace</p>
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
        
        // Initialize feather icons inside the shadow DOM
        setTimeout(() => {
            const featherIcons = this.shadowRoot.querySelectorAll('[data-feather]');
            if (featherIcons.length > 0 && typeof feather !== 'undefined') {
                feather.replace();
            }
        }, 100);
    }
}

customElements.define('custom-footer', CustomFooter);