// Global Variables
let cart = [];
let products = [];
let currentProductIndex = 0;
const productsPerLoad = 8;

// Sample Products Data
const sampleProducts = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
        rating: 4.8,
        reviews: 124,
        badge: "Best Seller"
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
        rating: 4.6,
        reviews: 89,
        badge: "New"
    },
    {
        id: 3,
        name: "Luxury Leather Handbag",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
        rating: 4.9,
        reviews: 156,
        badge: "Sale"
    },
    {
        id: 4,
        name: "Professional Camera",
        price: 899.99,
        image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=300&fit=crop",
        rating: 4.7,
        reviews: 78,
        badge: "Featured"
    },
    {
        id: 5,
        name: "Comfortable Running Shoes",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
        rating: 4.5,
        reviews: 203,
        badge: "Popular"
    },
    {
        id: 6,
        name: "Wireless Bluetooth Speaker",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
        rating: 4.4,
        reviews: 92,
        badge: "Deal"
    },
    {
        id: 7,
        name: "Stylish Sunglasses",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop",
        rating: 4.3,
        reviews: 67,
        badge: "Trending"
    },
    {
        id: 8,
        name: "Gaming Mechanical Keyboard",
        price: 159.99,
        image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=300&fit=crop",
        rating: 4.8,
        reviews: 145,
        badge: "Gaming"
    },
    {
        id: 9,
        name: "Organic Cotton T-Shirt",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
        rating: 4.2,
        reviews: 234,
        badge: "Eco"
    },
    {
        id: 10,
        name: "Smart Home Assistant",
        price: 99.99,
        image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=300&h=300&fit=crop",
        rating: 4.6,
        reviews: 178,
        badge: "Smart"
    },
    {
        id: 11,
        name: "Portable Power Bank",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1609592806763-4b0b5464e1d8?w=300&h=300&fit=crop",
        rating: 4.4,
        reviews: 156,
        badge: "Essential"
    },
    {
        id: 12,
        name: "Designer Backpack",
        price: 119.99,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
        rating: 4.7,
        reviews: 89,
        badge: "Travel"
    }
];

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const cartIcon = document.querySelector('.cart-icon');
const cartModal = document.getElementById('cartModal');
const closeModal = document.querySelector('.close');
const productsGrid = document.getElementById('productsGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const cartCount = document.querySelector('.cart-count');
const searchInput = document.getElementById('searchInput');
const newsletterForm = document.getElementById('newsletterForm');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    products = [...sampleProducts];
    loadProducts();
    setupEventListeners();
    updateCartCount();
    setupSmoothScrolling();
    setupScrollAnimations();
}

// Event Listeners Setup
function setupEventListeners() {
    // Mobile menu toggle
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Cart modal
    cartIcon.addEventListener('click', openCartModal);
    closeModal.addEventListener('click', closeCartModal);
    window.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            closeCartModal();
        }
    });
    
    // Load more products
    loadMoreBtn.addEventListener('click', loadMoreProducts);
    
    // Search functionality
    searchInput.addEventListener('input', debounce(searchProducts, 300));
    
    // Newsletter form
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    
    // Cart actions
    document.getElementById('clearCart').addEventListener('click', clearCart);
    document.getElementById('checkout').addEventListener('click', checkout);
}

// Mobile Menu Functions
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Product Functions
function loadProducts() {
    const endIndex = Math.min(currentProductIndex + productsPerLoad, products.length);
    const productsToShow = products.slice(currentProductIndex, endIndex);
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
    
    currentProductIndex = endIndex;
    
    // Hide load more button if all products are loaded
    if (currentProductIndex >= products.length) {
        loadMoreBtn.style.display = 'none';
    }
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x300?text=Product+Image'">
            <div class="product-badge">${product.badge}</div>
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <div class="product-price">$${product.price}</div>
            <div class="product-rating">
                <div class="stars">${generateStars(product.rating)}</div>
                <span class="rating-text">${product.rating} (${product.reviews} reviews)</span>
            </div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `;
    return card;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function loadMoreProducts() {
    loadProducts();
    
    // Add loading animation
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    setTimeout(() => {
        loadMoreBtn.innerHTML = 'Load More Products';
    }, 1000);
}

// Search Functions
function searchProducts() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        // Reset to show all products
        productsGrid.innerHTML = '';
        currentProductIndex = 0;
        products = [...sampleProducts];
        loadProducts();
        loadMoreBtn.style.display = 'block';
        return;
    }
    
    // Filter products based on search term
    const filteredProducts = sampleProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.badge.toLowerCase().includes(searchTerm)
    );
    
    // Clear current products and show filtered results
    productsGrid.innerHTML = '';
    currentProductIndex = 0;
    products = filteredProducts;
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #666;">No products found matching your search.</div>';
        loadMoreBtn.style.display = 'none';
    } else {
        loadProducts();
        loadMoreBtn.style.display = filteredProducts.length > productsPerLoad ? 'block' : 'none';
    }
}

// Cart Functions
function addToCart(productId) {
    const product = sampleProducts.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    showAddToCartAnimation();
    
    // Show success message
    showNotification('Product added to cart!', 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    updateCartModal();
}

function updateCartQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            updateCartCount();
            updateCartModal();
        }
    }
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
}

function openCartModal() {
    updateCartModal();
    cartModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeCartModal() {
    cartModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function updateCartModal() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Your cart is empty</p>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem;">
                <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
                <div>
                    <h4 style="margin: 0; font-size: 1rem;">${item.name}</h4>
                    <p style="margin: 0; color: #666;">$${item.price}</p>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 1rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})" style="width: 30px; height: 30px; border: 1px solid #ddd; background: white; border-radius: 4px; cursor: pointer;">-</button>
                    <span style="min-width: 30px; text-align: center;">${item.quantity}</span>
                    <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})" style="width: 30px; height: 30px; border: 1px solid #ddd; background: white; border-radius: 4px; cursor: pointer;">+</button>
                </div>
                <div style="min-width: 80px; text-align: right; font-weight: 600;">$${itemTotal.toFixed(2)}</div>
                <button onclick="removeFromCart(${item.id})" style="color: #ff4757; border: none; background: none; cursor: pointer; font-size: 1.2rem;">&times;</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = total.toFixed(2);
}

function clearCart() {
    cart = [];
    updateCartCount();
    updateCartModal();
    showNotification('Cart cleared!', 'info');
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    // Simulate checkout process
    showNotification('Redirecting to checkout...', 'success');
    setTimeout(() => {
        showNotification('Thank you for your purchase!', 'success');
        clearCart();
        closeCartModal();
    }, 2000);
}

// Animation Functions
function showAddToCartAnimation() {
    cartIcon.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
    }, 200);
}

// Newsletter Functions
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    if (email) {
        showNotification('Thank you for subscribing!', 'success');
        e.target.reset();
    }
}

// Utility Functions
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

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Smooth Scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });
}

// Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.feature-card, .category-card, .product-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(102, 126, 234, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        header.style.backdropFilter = 'none';
    }
});

// Loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/300x300?text=Image+Not+Found';
            this.style.opacity = '1';
        });
        
        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
});
