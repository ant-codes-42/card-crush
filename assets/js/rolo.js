// Global variables go here
let studyCategory = [];
let currentCard = [];
let stackPosition = readStackPosition();

const card = document.getElementById('card');

const flip = function () {  
    card.classList="animate__flipOutX"
}

// Function to read the stack position from session storage
function readStackPosition() {
    const stackPosition = parseInt(sessionStorage.getItem('stackPosition'));
    return stackPosition ? stackPosition : 0;
}

// Function to store the stack position in session storage
function storeStackPosition() {
    sessionStorage.setItem('stackPosition', stackPosition);
}

// Function to filter flashcards by category
function filterByCategory(category) {
    const filteredFlashcard = flashcards.find(flashcard => flashcard.category === category);
    return filteredFlashcard ? { category: filteredFlashcard.category, cards: filteredFlashcard.cards } : { category, cards: [] };
}

// Function to build the study category array
function buildStudyCategoryArray(sessionCategory) {
    let stringCategory = JSON.stringify(filterByCategory(sessionCategory)); // these two lines needed two make a deep copy
    studyCategory = JSON.parse(stringCategory);

    for (let i = 0; i < studyCategory.cards.length; i++) {
        studyCategory.cards[i].index = i;
    }
    for (let i = 0; i < flashcards.length; i++) {
        if (flashcards[i].category === sessionCategory) {
            for (let j = 0; j < flashcards[i].cards.length; j++) {
                flashcards[i].cards[j].index = j;
            }
        }
    }
}

// Function to shuffle the study category array
function shuffleStudyCategoryArray() {
    for (let i = studyCategory.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [studyCategory.cards[i], studyCategory.cards[j]] = [studyCategory.cards[j], studyCategory.cards[i]];
    }
}

// Function to select and display the current flashcard
function selectCurrentFlashcard() {
    const card = document.querySelector('.CardContainer');
    currentCard = studyCategory.cards[stackPosition];
    if (stackPosition === studyCategory.cards.length) {
        stackPosition = 0;
    }
    card.innerHTML = `
        <div class="card animate__animated animate__flipInX">
            <div class="card-body">
                <h5 class="card-title">${currentCard[0].front}</h5>
                <p class="card-text">${currentCard[0].back}</p>
            </div>
        </div>`;
}

// Function to move to next card
function nextCard() {
    stackPosition++;
    if (stackPosition === studyCategory.cards.length) {
        stackPosition = 0;
    }
    storeStackPosition();
    // This all happens instantly so something should happen right here for the animation...
    selectCurrentFlashcard();
}

// Function to delete the current flashcard from the study category array and flashcards array
function deleteCurrentFlashcard() {
    for (let i = 0; i < studyCategory.cards.length; i++) {
        if (studyCategory.cards[i].index === currentCard.cards[0].index) {
            studyCategory.cards.splice(i, 1);
        }
    }

    for (let i = 0; i < flashcards.length; i++) {
        if (flashcards[i].category === currentCard.category) {
            for (let j = 0; j < flashcards[i].cards.length; j++) {
                if (flashcards[i].cards[j].index === currentCard.cards[0].index) {
                    flashcards[i].cards.splice(j, 1);
                }
            }
        }
    }
}