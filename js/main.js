/* ------------------------
Home Page
------------------------ */
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
                <p>$${donuts[i].price.toFixed(2)}</p>
            </a>
        `;
    }
}


/* ------------------------
Browse Page
------------------------ */
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
                    <p>$${donuts[i].price.toFixed(2)}</p>
                </div>
            </a>
        `;
    } 
}


/* ------------------------
Product Page
------------------------ */
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
    document.querySelector('.product-hero-image img').src = donut.image;
    document.querySelector('.product-hero-image img').alt = donut.name;
    
    // Change donut header info for both mobile and desktop
    document.querySelectorAll('.product-header h1').forEach(element => element.textContent = donut.name);
    document.querySelectorAll('.product-header .product-price').forEach(element => element.textContent = `$${donut.price.toFixed(2)}`);
    
    // Update donut ingredient info
    document.getElementById('product-ingredients').textContent = donut.ingredients;
    document.getElementById('product-contains').textContent = donut.contains;
    document.getElementById('product-calories').textContent = donut.calories + ' kcal';
    document.getElementById('product-protein').textContent = donut.protein;
    document.getElementById('product-carbs').textContent = donut.carbs;
    document.getElementById('product-fat').textContent = donut.fat;
    document.getElementById('product-sodium').textContent = donut.sodium;

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


/* ------------------------
Cart Page
------------------------ */
// Function to load cart items
function loadCart() {
    const cartItems = document.querySelector('.cart-items');
    if (!cartItems) return;
    cartItems.innerHTML = '';

    // Calculate prices
    const subtotal = cart.reduce((sum,item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.15;
    const total = subtotal + tax;

    // Change HTML prices
    document.querySelector('.summary-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.querySelector('.summary-tax').textContent = `$${tax.toFixed(2)}`;
    document.querySelector('.summary-total-price').textContent = `$${total.toFixed(2)}`;

    updateCartIcon();

    // Check if empty
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <span class="material-symbols-rounded cart-empty-icon">shopping_bag</span>
                <h3>Your cart is empty</h3>
                <p>Browse the donuts we have!</p>
                <a href="browse.html" class="btn-add-cart">Browse Donuts</a>
            </div>
        `;
        return;
    }

    // Add donuts to cart
    for (let i = 0; i < cart.length; i++) {
        cartItems.innerHTML += `
            <article class="cart-card">
                <figure>
                    <img src="${cart[i].image}" alt="${cart[i].name}">
                </figure>
                <div class="cart-card-info">
                    <h3>${cart[i].name}</h3>
                    <p>$${cart[i].price.toFixed(2)}</p>
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

// Function to change the checkout states
function loadCheckout() {
    const summaryView = document.getElementById('summary-view');
    if (!summaryView) return;

    // Dont allow user to proceed checkout without items in cart
    const proceedBtn = document.querySelector('#summary-view .btn-add-cart');
    if (proceedBtn) {
        if (cart.length === 0) {
            proceedBtn.disabled = true;
            proceedBtn.style.opacity = '0.5';
        } 
        
        else {
            proceedBtn.disabled = false;
            proceedBtn.style.opacity = '';
        }
    }

    // Proceed Button
    // Hides cart summary shows payment form
    document.getElementById('btn-proceed').addEventListener('click', () => {
        document.getElementById('summary-view').classList.add('hidden');
        document.getElementById('payment-view').classList.remove('hidden');
    });

    // Submit form
    // Hides form shows payment succesful
    document.getElementById('payment-form').addEventListener('submit', (e) => {
        e.preventDefault(); // Dont refresh
        document.getElementById('payment-view').classList.add('hidden');
        document.getElementById('success-view').classList.remove('hidden');
    });

    // Finish payment
    // Reset cart
    document.getElementById('btn-okay').addEventListener('click', () => {
        cart = [];
        saveCart();
        window.location = 'index.html';
    });
}

// Page Initialisation Calls
createBrowseCards();
loadProductPage();
createFeaturedCards();
loadCart();
loadCheckout();
updateCartIcon();