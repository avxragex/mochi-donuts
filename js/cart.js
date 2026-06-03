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
}

// Function to save current cart to local storage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to show cart icon number
function updateCartIcon() {
    const cartNumber = document.getElementById("cart-number");
    console.log("cart number element:", cartNumber);
    console.log("cart:", cart);
    if (!cartNumber) return;

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartNumber.textContent = totalItems;
    // Only toggle visiblity if at least one cart item
    cartNumber.classList.toggle('visible', totalItems > 0);
}