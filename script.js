// Food pairs - Indian Food
const foodPairs = [
    '🍛', '🥘', '🥙', '🌶️', '🍲', '🥒', '🍚', '🧆'
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
    // Create double array (pairs)
    const gameCards = [...foodPairs, ...foodPairs];
    
    // Shuffle cards
    cards = gameCards.sort(() => 0.5 - Math.random());
    
    // Create board
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    
    cards.forEach((food, index) => {
        const card = document.createElement('button');
        card.className = 'card';
        card.textContent = '❓';
        card.setAttribute('data-food', food);
        card.setAttribute('data-index', index);
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// Flip card function
function flipCard(e) {
    if (lockBoard) return;
    if (e.target === firstCard) return;

    const clickedCard = e.target;
    clickedCard.textContent = clickedCard.getAttribute('data-food');
    clickedCard.classList.add('flipped');

    if (!firstCard) {
        firstCard = clickedCard;
        return;
    }

    secondCard = clickedCard;
    lockBoard = true;
    moves++;
    updateMoves();

    // Check for match
    checkForMatch();
}

// Check if cards match
function checkForMatch() {
    const isMatch = firstCard.getAttribute('data-food') === secondCard.getAttribute('data-food');
    
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

    // Check if game is won
    if (matches === foodPairs.length) {
        setTimeout(() => alert(`🎉 You Won! Completed in ${moves} moves!`), 500);
    }
}

// Unflip cards if no match
function unflipCards() {
    setTimeout(() => {
        firstCard.textContent = '❓';
        firstCard.classList.remove('flipped');
        secondCard.textContent = '❓';
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
