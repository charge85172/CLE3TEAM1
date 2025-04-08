let pageCardData;
let cardsData;
let filteredCards;
let dishes;
let drinks;
let deserts;
let menuNames = ['Eten', 'Drinken', 'Toetjes', 'Winkelwagen'];

let currentPage = 0;
const itemsPerPage = 9;

const prevButton = document.getElementById('prevPage');
const nextButton = document.getElementById('nextPage');
const title = document.getElementsByTagName("h1")[0];

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartActive = false;

fetch("products.JSON")
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    })
    .then(pageHandler)
    .catch(error => console.log(error));

function pageHandler(data) {
    dishes = data.dishes;
    drinks = data.drinks;
    deserts = data.deserts;

    // Set initial page data
    pageCardData = drinks; // Start with drinks
    cardsData = pageCardData;
    filteredCards = cardsData;

    // Initial render
    renderCards();
    activateFilters();
    updatePaginationButtons();
    updateCartCount();
}

// Function to render cards
function renderCards() {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = '';

    const firstItem = currentPage * itemsPerPage;
    const lastItem = firstItem + itemsPerPage;
    const cardsToDisplay = filteredCards.slice(firstItem, lastItem);

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
    updateCartCount();
}

function removeFromCart(item) {
    cart.splice(cart.indexOf(item), 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    if (currentPage > 0 && currentPage * itemsPerPage >= cart.length) currentPage--;

    // Update the cart
    renderCards();
    updatePaginationButtons();
    updateCartCount();
}

// Cart showing functions
const shoppingCart = document.getElementById('cartButton');
shoppingCart.addEventListener('click', cartShow);

function cartShow() {
    let filters = document.getElementsByClassName("filters")[0];
    let subText = document.getElementById("cartSubText");

    if (!subText) {
        subText = document.createElement("p");
        subText.id = "cartSubText";
        subText.className = "cart-subtext";
        title.parentNode.insertBefore(subText, title.nextSibling);
    }

    if (cartActive) {
        // Switch back to menu
        cartActive = false;
        cardsData = pageCardData; // Reset to the current page data
        filteredCards = cardsData; // Reset filtered cards to the current page data
        shoppingCart.innerHTML = `<i class=\"fa-solid fa-cart-shopping buttonIcon\" style=\"color: #ffffff;\"></i> Winkelwagen
            <span id="cartItemCount">${cart.length}</span>`;

        if (subText) {
            subText.remove();
        }

        // Filters back
        filters.innerHTML = `
            <button id="veganFilter">
                <i class="fa-solid fa-seedling buttonIcon" style="color: #63E6BE;"></i>
                vegetarisch
            </button>
            <button id="lactoFreeFilter">
                <i class="fa-solid fa-cheese buttonIcon" style="color: #FFD43B;"></i>
                Lactosevrij
            </button>
            <button id="glutenFreeFilter">
                <i class="fa-solid fa-wheat-awn buttonIcon" style="color: #FFD43B;"></i>
                Glutenvrij
            </button>
            <button id="nutFreeFilter">
                <i class="fa-solid fa-jar buttonIcon" style="color: #bb854b;"></i>
                Notenvrij
            </button>`;

        // Title update
        for (let i = 0; i < 3; i++) {
            const menus = [dishes, drinks, deserts];
            if (pageCardData === menus[i]) {
                title.innerText = menuNames[i];
            }
        }
        title.className = 'title';
        activateFilters();
    } else {
        // Switch to cart
        cartActive = true;
        cardsData = cart; // Set cardsData to the cart
        filteredCards = cart; // Set filteredCards to the cart
        shoppingCart.innerHTML = "<i class=\"fa-solid fa-cart-shopping buttonIcon\" style=\"color: #ffffff;\"></i> Menu";

        // Filters away
        filters.innerHTML = "";

        // Title update
        title.innerText = 'Winkelwagen';
        title.className = 'shopping_cart';
        subText.innerText = "Klik op gerecht om het te verwijderen";
    }
    currentPage = 0; // Reset to the first page
    renderCards(); // Render the cards based on the current state
    updatePaginationButtons(); // Update pagination buttons
    updateCartCount(); // Update cart count display
}

// Function to handle filters
function applyFilters() {
    const veganFilter = document.getElementById('veganFilter').classList.contains('active');
    const lactoFreeFilter = document.getElementById('lactoFreeFilter').classList.contains('active');
    const glutenFreeFilter = document.getElementById('glutenFreeFilter').classList.contains('active');
    const nutFreeFilter = document.getElementById('nutFreeFilter').classList.contains('active');

    filteredCards = cardsData.filter(card => {
        return (!veganFilter || card.vegan) &&
            (!lactoFreeFilter || card.lactoFree) &&
            (!glutenFreeFilter || card.glutenFree) &&
            (!nutFreeFilter || card.nutFree);
    });

    currentPage = 0; // Reset to the first page after filtering
    renderCards();
}

// Event listeners for filter buttons
function activateFilters() {
    let filters = ['veganFilter', 'lactoFreeFilter', 'glutenFreeFilter', 'nutFreeFilter'];
    for (const filter of filters) {
        document.getElementById(filter).addEventListener('click', function () {
            this.classList.toggle('active');
            applyFilters();
        });
    }
}

// Pagination functions
function updatePaginationButtons() {
    prevButton.disabled = currentPage === 0 && (pageCardData === drinks || cardsData === cart);
    nextButton.disabled = (currentPage + 1) * itemsPerPage >= filteredCards.length && (pageCardData === deserts || cardsData === cart);
}

// nextButton Event Handler
nextButton.addEventListener('click', function () {
    if ((currentPage + 1) * itemsPerPage < filteredCards.length) {
        currentPage++;
    } else {
        // Load next page
        if (cardsData === dishes) {
            pageCardData = deserts;
            title.innerText = menuNames[2];
        }
        if (cardsData === drinks) {
            pageCardData = dishes;
            title.innerText = menuNames[0];
        }
        // Update cardsData
        cardsData = pageCardData;
        filteredCards = cardsData;
        // To first page of cardsData
        currentPage = 0;
    }
    updatePaginationButtons();
    renderCards();
});

// prevButton Event Handler
prevButton.addEventListener('click', function () {
    if (currentPage > 0) {
        currentPage--;
    } else {
        // Load previous page
        if (cardsData === dishes) {
            pageCardData = drinks;
            title.innerText = menuNames[1];
        }
        if (cardsData === deserts) {
            pageCardData = dishes;
            title.innerText = menuNames[0];
        }
        // Update cardsData
        cardsData = pageCardData;
        filteredCards = cardsData;

        // To last page of cardsData
        currentPage = Math.ceil(cardsData.length / itemsPerPage) - 1;
    }
    updatePaginationButtons();
    renderCards();
});

// Function to update cart count display
function updateCartCount() {
    const cartItemCount = document.getElementById('cartItemCount');
    const itemCount = cart.length; // Aantal items in de winkelwagen
    cartItemCount.innerText = itemCount; // Update de tekst
    cartItemCount.style.display = itemCount > 0 ? 'inline' : 'none'; // Toon of verberg de teller
}

// Bij het laden van de pagina, update de cart count
updateCartCount();