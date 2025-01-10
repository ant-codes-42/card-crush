// Global variables go here
let studyCategory = [];
let currentCard = [];

const card = document.getElementById('card');

const flip = function () {  
    card.classList="animate__flipOutX"
}

// Function to filter flashcards by category
function filterByCategory(category) {
    const filteredFlashcards = flashcards.filter(flashcard => flashcard.category === category);
    return filteredFlashcards;
}

// Function to build the study category array
function buildStudyCategoryArray(sessionCategory) {
    studyCategory = filterByCategory(sessionCategory);
    for (let i = 0; i < studyCategory[0].cards.length; i++) {
        studyCategory[0].cards[i].index = i;
    }
}

// Function to shuffle the study category array
function shuffleStudyCategoryArray() {
    for (let i = studyCategory[0].cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [studyCategory[0].cards[i], studyCategory[0].cards[j]] = [studyCategory[0].cards[j], studyCategory[0].cards[i]];
    }
}

// Function to delete the current flashcard from the study category array and flashcards array
function deleteCurrentFlashcard() {
    for (let i = 0; i > studyCategory[0].cards.length; i++) {
        if (studyCategory[0].cards[i].index === currentCard[0].cards.index) {
            studyCategory[0].cards.splice(i, 1);
        }
    }
}