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
            quanity: 1
        });
    }
}