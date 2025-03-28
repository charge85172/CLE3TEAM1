const cardsData = [
    { title: "Vegan Salad", image: "../Renji/Fotos/vegan_salad.jpg", vegan: true, lactoFree: true, glutenFree: true },
    { title: "Lacto Free Cheese", image: "../Renji/Fotos/lacto_free_cheese.jpg", vegan: false, lactoFree: true, glutenFree: true },
    { title: "Gluten Free Bread", image: "../Renji/Fotos/gluten_free_bread.png", vegan: true, lactoFree: true, glutenFree: true },
    { title: "Fruit Smoothie", image: "../Renji/Fotos/smoothie.jpg", vegan: true, lactoFree: true, glutenFree: true },
    { title: "Chicken Salad", image: "../Renji/Fotos/chicken_salad.jpg", vegan: false, lactoFree: true, glutenFree: true },
    { title: "Vegan Burger", image: "../Renji/Fotos/vegan_burger.jpg", vegan: true, lactoFree: true, glutenFree: false },
    { title: "Pasta", image: "../Renji/Fotos/pasta.jpg", vegan: false, lactoFree: false, glutenFree: false },
    { title: "Quinoa Bowl", image: "../Renji/Fotos/quinoa_bowl.jpg", vegan: true, lactoFree: true, glutenFree: true },
    { title: "Chocolate Cake", image: "../Renji/Fotos/chocolate_cake.jpg", vegan: false, lactoFree: false, glutenFree: false },
];

let cartActive = true;
let currentPage = 0;
const itemsPerPage = 9;
let filteredCards = cardsData;
let cart = JSON.parse(localStorage.getItem('cart')) || []; // Load cart from localStorage

// Function to render cards
function renderCards() {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = '';

    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    const cardsToDisplay = filteredCards.slice(start, end);

    cardsToDisplay.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.innerHTML = `
            <img src="${card.image}" alt="${card.title}">
            <h3>${card.title}</h3>
        `;
        if (cartActive) {
            cardElement.addEventListener('click', () => addToCart(card)); // Add click event to add to cart
        } else {
            cardElement.addEventListener('click', () => deleteFromCart(card));
        }
        cardContainer.appendChild(cardElement);
    });
}

// Function to add item to cart
function addToCart(item) {
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
    alert(`${item.title} has been added to your cart!`);
}

function deleteFromCart(item) {
    cart.splice(item, 1)
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${item.title} has been deleted from your cart!`);
    renderCards();
}

// Function to handle filters
function applyFilters() {
    const veganFilter = document.getElementById('veganFilter').classList.contains('active');
    const lactoFreeFilter = document.getElementById('lactoFreeFilter').classList.contains('active');
    const glutenFreeFilter = document.getElementById('glutenFreeFilter').classList.contains('active');
    const nutFreeFilter = document.getElementById('nutFreeFilter').classList.contains('active'); // New filter

    filteredCards = cardsData.filter(card => {
        return (!veganFilter || card.vegan) &&
            (!lactoFreeFilter || card.lactoFree) &&
            (!glutenFreeFilter || card.glutenFree) &&
            (!nutFreeFilter || card.nutFree); // Apply nut free filter
    });

    currentPage = 0; // Reset to the first page after filtering
    renderCards();
}

// Event listeners for filter buttons
document.getElementById('veganFilter').addEventListener('click', function () {
    this.classList.toggle('active');
    applyFilters();
});

document.getElementById('lactoFreeFilter').addEventListener('click', function () {
    this.classList.toggle('active');
    applyFilters();
});

document.getElementById('glutenFreeFilter').addEventListener('click', function () {
    this.classList.toggle('active');
    applyFilters();
});

document.getElementById('nutFreeFilter').addEventListener('click', function () { // New event listener
    this.classList.toggle('active');
    applyFilters();
});

// Pagination functions
document.getElementById('nextPage').addEventListener('click', function () {
    if ((currentPage + 1) * itemsPerPage < filteredCards.length) {
        currentPage++;
        renderCards();
    }
});

document.getElementById('prevPage').addEventListener('click', function () {
    if (currentPage > 0) {
        currentPage--;
        renderCards();
    }
});

// Initial render
let shoppingCart = document.getElementById('cartButton');
shoppingCart.addEventListener('click', cartShow);
cart.forEach((value, index) => {
    console.log(`Index: ${cart}`);
});

function cartShow() {

    if (cartActive) {
        filteredCards = cart
        shoppingCart.innerHTML = "Menu"
        cartActive = false
    } else {
        filteredCards = cardsData
        shoppingCart.innerHTML = "Shopping Cart"
        cartActive = true
    }

    renderCards();
}

renderCards();