// Function to create Browse Page donut cards
function createBrowseCards() {
    const grid = document.querySelector('.product-grid');
    if (!grid) return;

    for (let i = 0; i < donuts.length; i++) {
        grid.innerHTML += `
            <article class="donut-card">
                <figure>
                    <img src="${donuts[i].image}" alt="${donuts[i].name}">
                </figure>
                <div class="card-info">
                    <h3>${donuts[i].name}</h3>
                    <p>$${donuts[i].price}</p>
                </div>
            </article>
        `;
    } 
}

createBrowseCards();

/*
            <article class="donut-card">
                <figure>
                    <img src="images/biscoff.png" alt="Biscoff donut">
                </figure>
                    <div class="card-info">
                        <h3>Biscoff with Caramel Drizzle</h3>
                        <p>$4.50</p>
                    </div>
            </article>
*/