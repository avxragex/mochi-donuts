// Cart array to store cart items
let cart = [];

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
}

// Function to increase quantity
function increaseQty(id) {
    const item = cart.find(item => item.id === id);
    if (!item) return;
    item.quantity += 1;
    loadCart();
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
    }

    loadCart();
}