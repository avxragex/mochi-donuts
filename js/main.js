// Function to create Browse Page donut cards
function createBrowseCards() {
    const grid = document.querySelector('.product-grid');
    if (!grid) return;

    for (let i = 0; i < donuts.length; i++) {
        grid.innerHTML += `
            <a href="product.html?id=${donuts[i].id}" class="donut-card">
                <figure>
                    <img src="${donuts[i].image}" alt="${donuts[i].name}">
                </figure>
                <div class="card-info">
                    <h3>${donuts[i].name}</h3>
                    <p>$${donuts[i].price}</p>
                </div>
            </a>
        `;
    } 
}

// Function to load product detail page
function loadProductPage() {
    const productPage = document.querySelector('.product-page');
    if (!productPage) return;

    // Get ID from URL
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));

    // Find the correct donut
    const donut = donuts.find(d => d.id === id);
    if (!donut) return;

    // Update Donut Info
    document.querySelector('.product-thumbnail img').src = donut.image;
    document.querySelector('.product-thumbnail img').alt = donut.name;
    document.querySelector('.product-header h1').textContent = donut.name;
    document.querySelector('.product-header .product-price').textContent = `$${donut.price}`;
    document.querySelector('.product-hero-image img').src = donut.image;
    document.querySelector('.product-hero-image img').alt = donut.name;

    // Add to cart quantity
    let quantity = 1;
    
    const minusBtn = document.querySelector('.quantity-selector .btn-minus');
    const plusBtn = document.querySelector('.quantity-selector .btn-plus');
    const qtyDisplay = document.querySelector('.quantity-selector h3');

    // Minus quantity
    minusBtn.addEventListener('click', () => {
        if (quantity > 1) {
            quantity -= 1;
            qtyDisplay.textContent = quantity;
        }
    });

    // Add quantity
    plusBtn.addEventListener('click', () => {
        quantity += 1;
        qtyDisplay.textContent = quantity;
    });

    // Event listener to add donut to cart
    document.querySelector('.btn-add-cart').addEventListener('click', () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(donut.id);
        }

        // Display add to cart notification
        const notif = document.getElementById('cart-notif');
        notif.classList.add('show');
        setTimeout(() => notif.classList.remove('show'), 2000);
    });

    // Update Donut Nutrition Info
}

// Function to create Home page donut cards
function createFeaturedCards() {
    const grid = document.querySelector('.featured-grid');
    if (!grid) return;

    for (let i = 0; i < 4; i++) {
        grid.innerHTML += `
            <a href="product.html?id=${donuts[i].id}" class="donut-card">
                <figure>
                    <img src="${donuts[i].image}" alt="${donuts[i].name}">
                </figure>
                <h3>${donuts[i].name}</h3>
                <p>$${donuts[i].price}</p>
            </a>
        `;
    }
}

// Function to load cart items
function loadCart() {
    const cartItems = document.querySelector('.cart-items');
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    for (let i = 0; i < cart.length; i++) {
        cartItems.innerHTML += `
            <article class="cart-card">
                <figure>
                    <img src="${cart[i].image}" alt="${cart[i].name}">
                </figure>
                <div class="cart-card-info">
                    <h3>${cart[i].name}</h3>
                    <p>$${cart[i].price}</p>
                </div>
                <div class="cart-quantity">
                    <button class="btn-qty" onclick="decreaseQty(${cart[i].id})">
                        <span class="material-symbols-rounded">remove</span>
                    </button>
                    <span class="qty-count">${cart[i].quantity}</span>
                    <button class="btn-qty" onclick="increaseQty(${cart[i].id})">
                        <span class="material-symbols-rounded">add</span>
                    </button>
                </div>
            </article>
        `;
    }

    // Calculate prices
    const subtotal = cart.reduce((sum,item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.15;
    const total = subtotal + tax;

    document.querySelector('.summary-subtotal').textContent = `$${subtotal}`;
    document.querySelector('.summary-tax').textContent = `$${tax}`;
    document.querySelector('.summary-total-price').textContent = `$${total}`;
}

createBrowseCards();
loadProductPage();
createFeaturedCards();
loadCart();