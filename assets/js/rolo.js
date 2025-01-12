// Global variables go here
let studyCategory = [];
let currentCard = [];
let stackPosition = readStackPosition();

const crushCardButton = document.getElementById('crushCardButton');
const nextCardButton = document.getElementById('nextCardButton');
const addCardButton = document.getElementById('addCardButton');
const cardStack = document.getElementById("cardStack");
const card = document.getElementById('card');

// Function to populate the category header
function populateCatHeader() {
    const categoryHeader = document.getElementById('categoryHeader');
    if (sessionCategory) {
        categoryHeader.innerHTML = '';
        categoryHeader.innerHTML = sessionCategory;
    } else {
        categoryHeader.innerHTML = '';
        categoryHeader.innerHTML = 'No Category Selected';
    }
}

// Create Card from array stacked with flip ability
function createFlashcards(cards) {
    cardStack.innerHTML = ""; // Do we need to clear existing cards?

    //loop to create number of cards in array
    cards.forEach((card, studyCategory) => {
        const cardWrapper = document.createElement("div");
        cardWrapper.classList.add("cardCustom");

        const cardElement = document.createElement("div");
        cardElement.classList.add("cardInd");

        // Adjusts stacking effect
        cardWrapper.style.transform = `translateY(${studyCategory* 20}px)`;

        // Front side
        const cardFront = document.createElement("div");
        cardFront.classList.add("cardFront");
        cardFront.innerText = card.front;

        // Back side
        const cardBack = document.createElement("div");
        cardBack.classList.add("cardBack");
        cardBack.innerText = card.back;

        // Attaches cards to rolo html
        cardElement.appendChild(cardFront);
        cardElement.appendChild(cardBack);
        cardWrapper.appendChild(cardElement);
        cardStack.appendChild(cardWrapper);

        // Flip functionality
        cardElement.addEventListener("click", () => {
            cardElement.classList.toggle("flipped");
        });
    });
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
    /*const stringCategory = JSON.stringify(filterByCategory(sessionCategory));
    studyCategory = JSON.parse(stringCategory);*/
    studyCategory = JSON.parse(JSON.stringify(filterByCategory(sessionCategory))); // deep copy of filtered flashcards

    // This adds an index to each card in the study category array
    for (let i = 0; i < studyCategory.cards.length; i++) {
        studyCategory.cards[i].index = i;
    }

    // Here we are adding an index to the same cards in the master flashcards array so we can match them up later
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
    const cardFront = document.getElementById('card-front');
    const cardBack = document.getElementById('card-back');
    const card = document.querySelector('.cardCustom');
    currentCard = studyCategory.cards[stackPosition];
    // This needs to be updated to populate the correct HTML elements
    card.innerHTML = `
        <div class="card animate__animated animate__flipInX">
            <div class="card-body">
                <h5 class="card-title">${currentCard.front}</h5>
                <p class="card-text">${currentCard.back}</p>
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

    storeLocalFlashcards();
}

// Function to edit the current flashcard and update the flashcards array
// UNTESTED - needs to be called from modal pop up and passed the new category, front, and back (if it works lmao)
function editCurrentFlashcard(newCategory, newFront, newBack) {
    if (newCategory !== currentCard.category) {
        deleteCurrentFlashcard();
        currentCard.category = newCategory;
        flashcards.push({ category: newCategory, cards: [{ front: newFront, back: newBack }] });
    } else {
        for (let i = 0; i < studyCategory.cards.length; i++) {
            if (studyCategory.cards[i].index === currentCard.cards[0].index) {
                studyCategory.cards[i].front = newFront;
                studyCategory.cards[i].back = newBack;
            }
        }

        for (let i = 0; i < flashcards.length; i++) {
            if (flashcards[i].category === currentCard.category) {
                for (let j = 0; j < flashcards[i].cards.length; j++) {
                    if (flashcards[i].cards[j].index === currentCard.cards[0].index) {
                        flashcards[i].cards[j].front = newFront;
                        flashcards[i].cards[j].back = newBack;
                    }
                }
            }
        }
    }
}

// Function for saving a new card and saving (same as the one in form.js for index.html)
function cardSaveButton(event) {
    event.preventDefault();
    const cardFront = document.getElementById('rolo-card-front').value;
    const cardBack = document.getElementById('rolo-card-back').value;

    if (!cardFront || !cardBack) {
        alert('Please finish your cards');
        return;
    }

    // Find the category in the flashcards array
    let category = flashcards.find(flashcard => flashcard.category === sessionCategory);

    if (category) {
        // If the category exists, add the new card to the existing category
        category.cards.push({ front: cardFront, back: cardBack });
        storeLocalFlashcards();
    } else {
        // If the category does not exist, create a new category with the card
        flashcards.push({ category: sessionCategory, cards: [{ front: cardFront, back: cardBack }] });
        storeLocalFlashcards();
    }

    $('#modal3').modal('hide');
}

function cardAddRolo() {
    $('#modal3').modal('show');

    $('#card-close-button').click(function () {
        $('.ui.modal').modal('hide');
    });

    $('#card-save-button').click(cardSaveButton);
}

populateCatHeader();
buildStudyCategoryArray(sessionCategory);
shuffleStudyCategoryArray();
selectCurrentFlashcard();
createFlashcards(flashcards);

// Event listeners

// Delete currentCard if crushCardButton is clicked
crushCardButton.addEventListener('click', deleteCurrentFlashcard);

// Move to next card if nextCardButton is clicked
nextCardButton.addEventListener('click', nextCard);

addCardButton.addEventListener('click', cardAddRolo);