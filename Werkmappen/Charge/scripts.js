const cardsData = [
    { title: "Vegan Salad", image: "https://via.placeholder.com/150", vegan: true, lactoFree: true, glutenFree: true },
    { title: "Lacto Free Cheese", image: "https://via.placeholder.com/150", vegan: false, lactoFree: true, glutenFree: true },
    { title: "Gluten Free Bread", image: "https://via.placeholder.com/150", vegan: true, lactoFree: true, glutenFree: true },
    { title: "Fruit Smoothie", image: "https://via.placeholder.com/150", vegan: true, lactoFree: true, glutenFree: true },
    { title: "Chicken Salad", image: "https://via.placeholder.com/150", vegan: false, lactoFree: true, glutenFree: true },
    { title: "Vegan Burger", image: "https://via.placeholder.com/150", vegan: true, lactoFree: true, glutenFree: false },
    { title: "Pasta", image: "https://via.placeholder.com/150", vegan: false, lactoFree: false, glutenFree: false },
    { title: "Quinoa Bowl", image: "https://via.placeholder.com/150", vegan: true, lactoFree: true, glutenFree: true },
    { title: "Chocolate Cake", image: "https://via.placeholder.com/150", vegan: false, lactoFree: false, glutenFree: false },
];

let currentPage = 0;
const itemsPerPage = 3;
let filteredCards = cardsData;

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
        cardContainer.appendChild(cardElement);
    });
}

// Function to handle filters
function applyFilters() {
    const veganFilter = document.getElementById('veganFilter').classList.contains('active');
    const lactoFreeFilter = document.getElementById('lactoFreeFilter').classList.contains('active');
    const glutenFreeFilter = document.getElementById('glutenFreeFilter').classList.contains('active');

    filteredCards = cardsData.filter(card => {
        return (!veganFilter || card.vegan) &&
            (!lactoFreeFilter || card.lactoFree) &&
            (!glutenFreeFilter || card.glutenFree);
    });

    currentPage = 0; // Reset to the first page after filtering
    renderCards();
}

// Event listeners for filter buttons
document.getElementById('veganFilter').addEventListener('click', function() {
    this.classList.toggle('active');
    applyFilters();
});

document.getElementById('lactoFreeFilter').addEventListener('click', function() {
    this.classList.toggle('active');
    applyFilters();
});

document.getElementById('glutenFreeFilter').addEventListener('click', function() {
    this.classList.toggle('active');
    applyFilters();
});

// Pagination functions
document.getElementById('nextPage').addEventListener('click', function() {
    if ((currentPage + 1) * itemsPerPage < filteredCards.length) {
        currentPage++;
        renderCards();
    }
});

document.getElementById('prevPage').addEventListener('click', function() {
    if (currentPage > 0) {
        currentPage--;
        renderCards();
    }
});

// Initial render
renderCards();