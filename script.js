function createFoodImage(emoji, label) {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
            <rect width="120" height="120" rx="20" fill="#fff7e6"/>
            <rect x="12" y="12" width="96" height="96" rx="16" fill="#ffedd5"/>
            <text x="60" y="50" text-anchor="middle" font-size="36">${emoji}</text>
            <text x="60" y="90" text-anchor="middle" font-size="16" font-family="Arial, sans-serif" fill="#8a4b00">${label}</text>
        </svg>
    `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

// Food pairs - South Indian Food
const foodPairs = [
    { id: 'pongal', name: 'Pongal', image: createFoodImage('🥣', 'Pongal') },
    { id: 'vada', name: 'Vada', image: createFoodImage('🧆', 'Vada') },
    { id: 'sambar', name: 'Sambar', image: createFoodImage('🍲', 'Sambar') },
    { id: 'dosa', name: 'Dosa', image: createFoodImage('🥞', 'Dosa') },
    { id: 'idli', name: 'Idli', image: createFoodImage('🫓', 'Idli') },
    { id: 'uttapam', name: 'Uttapam', image: createFoodImage('🍽️', 'Uttapam') },
    { id: 'pesarattu', name: 'Pesarattu', image: createFoodImage('🥬', 'Pesarattu') },
    { id: 'kesari', name: 'Kesari', image: createFoodImage('🍮', 'Kesari') }
];

// Game variables
let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;
let moves = 0;

// Initialize game
function initGame() {
    const gameCards = [...foodPairs, ...foodPairs];
    cards = gameCards.sort(() => 0.5 - Math.random());

    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';

    cards.forEach((food, index) => {
        const card = document.createElement('button');
        card.className = 'card';
        card.innerHTML = '<span class="card-back">❓</span>';
        card.setAttribute('data-food-id', food.id);
        card.setAttribute('data-food-name', food.name);
        card.setAttribute('data-image', food.image);
        card.setAttribute('data-index', index);
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// Flip card function
function flipCard(e) {
    const clickedCard = e.currentTarget;

    if (lockBoard) return;
    if (clickedCard === firstCard) return;

    const foodName = clickedCard.getAttribute('data-food-name');
    const foodImage = clickedCard.getAttribute('data-image');

    clickedCard.innerHTML = `<img src="${foodImage}" alt="${foodName}" />`;
    clickedCard.classList.add('flipped');

    if (!firstCard) {
        firstCard = clickedCard;
        return;
    }

    secondCard = clickedCard;
    lockBoard = true;
    moves++;
    updateMoves();

    checkForMatch();
}

// Check if cards match
function checkForMatch() {
    const isMatch = firstCard.getAttribute('data-food-id') === secondCard.getAttribute('data-food-id');

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

// Disable matched cards
function disableCards() {
    firstCard.classList.add('matched');
    firstCard.removeEventListener('click', flipCard);
    secondCard.classList.add('matched');
    secondCard.removeEventListener('click', flipCard);

    matches++;
    updateMatches();

    resetBoard();

    if (matches === foodPairs.length) {
        setTimeout(() => alert(`🎉 You Won! Completed in ${moves} moves!`), 500);
    }
}

// Unflip cards if no match
function unflipCards() {
    setTimeout(() => {
        firstCard.innerHTML = '<span class="card-back">❓</span>';
        firstCard.classList.remove('flipped');
        secondCard.innerHTML = '<span class="card-back">❓</span>';
        secondCard.classList.remove('flipped');

        resetBoard();
    }, 1000);
}

// Reset board variables
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

// Update matches display
function updateMatches() {
    document.getElementById('matches').textContent = matches;
}

// Update moves display
function updateMoves() {
    document.getElementById('moves').textContent = moves;
}

// Reset game
function resetGame() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    matches = 0;
    moves = 0;
    updateMatches();
    updateMoves();
    initGame();
}

// Start the game
window.addEventListener('load', initGame);
