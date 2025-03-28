// if cartactive -> clicking filter returns the menu, while cartactive => remove filterbuttons/return to menu/filter in cart
let pageCardData
let cardsData
let filteredCards
let dishes
let drinks
let deserts
fetch("products.JSON")
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        return response.json()
    })
    .then(pageHandler)
    .catch(error => console.log(error))

let currentPage = 0;
const itemsPerPage = 9;

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartActive = false

function pageHandler(data) {
    dishes = data.dishes
    drinks = data.drinks
    deserts = data.deserts

    //if page= something =>
    pageCardData = dishes
    cardsData = pageCardData
    filteredCards = cardsData

    // Initial render
    renderCards();
}

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
        cardElement.addEventListener('click', () => !cartActive ? addToCart(card) : removeFromCart(card));
        cardContainer.appendChild(cardElement);
    });
}

// Functions to add and remove item to cart
function addToCart(item) {
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
    alert(`${item.title} has been added to your cart!`);
}

function removeFromCart(item) {
    cart.splice(cart.indexOf(item), 1)
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${item.title} has been removed from your cart!`);
    //update de winkelwagen
    renderCards()
}

//cart showing functions
const shoppingCart = document.getElementById('cartButton');
shoppingCart.addEventListener('click', cartShow);

function cartShow() {
    if (!cartActive) {
        cartActive = true
        cardsData = cart
        filteredCards = cart
        shoppingCart.innerHTML = "Menu"
    } else {
        cartActive = false
        cardsData = pageCardData
        filteredCards = cardsData
        shoppingCart.innerHTML = "<i class=\"fa-solid fa-cart-shopping buttonIcon\" style=\"color: #ffffff;\"></i>\n" +
            "                    Winkelwagen"
    }
    currentPage = 0
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
