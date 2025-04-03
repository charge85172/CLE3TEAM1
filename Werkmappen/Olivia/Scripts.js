let pageCardData
let cardsData
let filteredCards
let dishes
let drinks
let deserts

let currentPage = 0;
const itemsPerPage = 9;

const prevButton = document.getElementById('prevPage');
const nextButton = document.getElementById('nextPage');
const title = document.getElementsByTagName("h1")[0]

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartActive = false
fetch("products.JSON")
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        return response.json()
    })
    .then(pageHandler)
    .catch(error => console.log(error))


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
    activateFilters()
    updatePaginationButtons()
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
    // een toggle could shorten the entire thing, since it repeats code a lot and requires the listeners to be added again.
    let filters = document.getElementsByClassName("filters")[0]
    if (cartActive) {
        cartActive = false
        cardsData = pageCardData
        filteredCards = cardsData
        shoppingCart.innerHTML = "<i class=\"fa-solid fa-cart-shopping buttonIcon\" style=\"color: #ffffff;\"></i>\n" +
            "                    Winkelwagen"
        // filters terug
        console.log(filters)
        filters.innerHTML = "<button id=\"veganFilter\">\n" +
            "                        <i class=\"fa-solid fa-seedling buttonIcon\" style=\"color: #63E6BE;\"></i>\n" +
            "                        vegatarisch\n" +
            "                    </button>\n" +
            "\n" +
            "                    <button id=\"lactoFreeFilter\">\n" +
            "                        <i class=\"fa-solid fa-cheese buttonIcon\" style=\"color: #FFD43B;\"></i>\n" +
            "                        Lactosevrij\n" +
            "                    </button>\n" +
            "\n" +
            "                    <button id=\"glutenFreeFilter\">\n" +
            "                        <i class=\"fa-solid fa-wheat-awn buttonIcon\" style=\"color: #FFD43B;\"></i>\n" +
            "                        Glutenvrij\n" +
            "                    </button>\n" +
            "\n" +
            "                    <button id=\"nutFreeFilter\">\n" +
            "                        <i class=\"fa-solid fa-jar buttonIcon\" style=\"color: #bb854b;\"></i>\n" +
            "                        Notenvrij\n" +
            "                    </button>"
        activateFilters()
    } else {// do toggle code die dan aan en dan terug gaat
        cartActive = true
        cardsData = cart
        filteredCards = cart
        shoppingCart.innerHTML = "<i class=\"fa-solid fa-cart-shopping buttonIcon\" style=\"color: #ffffff;\"></i>\n" +
            "                    Menu"
        // filters weg
        console.log(filters)
        filters.innerHTML = ""
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
function activateFilters() {
    let filters = ['veganFilter', 'lactoFreeFilter', 'glutenFreeFilter', 'nutFreeFilter']
    for (const filter of filters) {
        document.getElementById(filter).addEventListener('click', function () {
            this.classList.toggle('active');
            applyFilters();
        });
    }
}


// Pagination functions

;// Disable buttons when necessary
function updatePaginationButtons() {
    prevButton.disabled = currentPage === 0 && pageCardData === dishes;
    nextButton.disabled = (currentPage + 1) * itemsPerPage >= filteredCards.length && pageCardData === deserts;
}

// nextButton Event Handler
nextButton.addEventListener('click', function () {
    if ((currentPage + 1) * itemsPerPage < filteredCards.length) {
        currentPage++;
    } else {
        //load next page
        if (pageCardData === drinks) {
            pageCardData = deserts
            title.innerText = 'Nagerechten'
        }
        if (pageCardData === dishes) {
            pageCardData = drinks
            title.innerText = 'Drinken'
        }
        //update cardsData
        cardsData = pageCardData
        filteredCards = cardsData
        // to first page of cardsData
        currentPage = 0
    }
    updatePaginationButtons()
    renderCards();
});
// prevButton Event Handler
prevButton.addEventListener('click', function () {
    if (currentPage > 0) {
        currentPage--;
    } else {
        //load previous page
        if (pageCardData === drinks) {
            pageCardData = dishes
            title.innerText = 'Eten'
        }
        if (pageCardData === deserts) {
            pageCardData = drinks
            title.innerText = 'Drinken'
        }
        //update cardsData
        cardsData = pageCardData
        filteredCards = cardsData

        // to last page of cardsData
        currentPage = Math.ceil(cardsData.length / itemsPerPage) - 1
    }
    updatePaginationButtons()
    renderCards();
});

