// Cart array to store cart items
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add items to cart
function addToCart(id) {
    const donut = donuts.find(d => d.id === id);

    // Check if item already in cart
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity += 1;
    }

    else {
        cart.push({
            id: donut.id,
            name: donut.name,
            price: donut.price,
            image: donut.image,
            quantity: 1
        });
    }

    // Save cart
    saveCart();
    updateCartIcon();
}

// Function to increase quantity
function increaseQty(id) {
    const item = cart.find(item => item.id === id);
    if (!item) return;
    item.quantity += 1;
    loadCart();
    saveCart();
    updateCartIcon();
}

// Function to decrease quantity
function decreaseQty(id) {
    const item = cart.find(item => item.id === id);
    if (!item) return;

    // Decrease quantity if more than 1 donut quantity
    if (item.quantity > 1) {
        item.quantity -= 1;
    } 
    
    // If only 1, remove from cart
    else {
        cart = cart.filter(item => item.id !== id);
        console.log(cart);
    }

    loadCart();
    saveCart();
    updateCartIcon();
    // Check if cart empty for proceed button
    loadCheckout();
}

// Function to save current cart to local storage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to show cart icon number
function updateCartIcon() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Cart Number Desktop
    const cartNumber = document.getElementById("cart-number");
    if (cartNumber) {
        cartNumber.textContent = totalItems;
        // Only toggle visiblity if at least one cart item
        cartNumber.classList.toggle('visible', totalItems > 0);
    }

    // Cart Number Mobile
    const cartNumberMobile = document.getElementById("cart-number-mobile");
    if (cartNumberMobile) {
        cartNumberMobile.textContent = totalItems;
        // Only toggle visiblity if at least one cart item
        cartNumberMobile.classList.toggle('visible', totalItems > 0);
    }
}