const cardsData = [
    {
        title: "Vegan Salad",
        image: "https://via.placeholder.com/150",
        vegan: true,
        lactoFree: true,
        glutenFree: true,
        nutFree: true
    },
    {
        title: "Lacto Free Cheese",
        image: "https://via.placeholder.com/150",
        vegan: false,
        lactoFree: true,
        glutenFree: true,
        nutFree: true
    },
    {
        title: "Gluten Free Bread",
        image: "https://via.placeholder.com/150",
        vegan: true,
        lactoFree: true,
        glutenFree: true,
        nutFree: true
    },
    {
        title: "Fruit Smoothie",
        image: "https://via.placeholder.com/150",
        vegan: true,
        lactoFree: true,
        glutenFree: true,
        nutFree: true
    },
    {
        title: "Chicken Salad",
        image: "https://via.placeholder.com/150",
        vegan: false,
        lactoFree: true,
        glutenFree: true,
        nutFree: false
    },
    {
        title: "Vegan Burger",
        image: "https://via.placeholder.com/150",
        vegan: true,
        lactoFree: true,
        glutenFree: false,
        nutFree: true
    },
    {
        title: "Pasta",
        image: "https://via.placeholder.com/150",
        vegan: false,
        lactoFree: false,
        glutenFree: false,
        nutFree: false
    },
    {
        title: "Quinoa Bowl",
        image: "https://via.placeholder.com/150",
        vegan: true,
        lactoFree: true,
        glutenFree: true,
        nutFree: true
    },
    {
        title: "Chocolate Cake",
        image: "https://via.placeholder.com/150",
        vegan: false,
        lactoFree: false,
        glutenFree: false,
        nutFree: false
    },
];
let cartActive = false
let currentPage = 0;
const itemsPerPage = 3;
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
            cardElement.addEventListener('click', () => deleteFromCart(card)); // Add click event to add to cart
        } else {
            cardElement.addEventListener('click', () => addToCart(card));
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
    cart.splice(item)
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${item.title} has been deleted from your cart!`);
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
renderCards();
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
        shoppingCart.innerHTML = "Shopping cart"
        cartActive = true

    }
    renderCards()
}

