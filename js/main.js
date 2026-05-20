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
}

/*
           <article class="cart-card">
                <!-- Image + Title -->
                <figure>
                    <img src="images/biscoff.png" alt="Biscoff donut">
                </figure>
                <div class="cart-card-info">
                    <h3>Biscoff with Caramel Drizzle</h3>
                    <p>$4.50</p>
                </div>
                <!-- Quantity -->
                <div class="cart-quantity">
                    <button class="btn-qty">
                        <span class="material-symbols-rounded">remove</span>
                    </button>
                    <span class="qty-count">1</span>
                    <button class="btn-qty">
                        <span class="material-symbols-rounded">add</span>
                    </button>
                </div>
            </article>
*/

createBrowseCards();
loadProductPage();
createFeaturedCards();
loadCart();