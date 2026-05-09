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

createBrowseCards();
loadProductPage();
createFeaturedCards();