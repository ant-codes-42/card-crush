// Global variables go here
let flashcards = readLocalFlashcards();
let categoriesArray = [];

// Grabs flashcards local storage, otherwise returns an empty array
function readLocalFlashcards() {
    const flashcards = localStorage.getItem("flashcards");
    return flashcards ? JSON.parse(flashcards) : [];
}

// Stores the passed object to flashcards in local storage
function storeLocalFlashcards(object) {
    localStorage.setItem('flashcards', JSON.stringify(object));
}

// This function to be used for redirect to another page
let redirectURL = '';

const redirectPage = function (url) {
    redirectURL = url;
    location.assign(url);
}

// Work in progress - create category in flashcards
function createCategory(newCategory) {
    flashcards.push(newCategory);
}

// Load the categories from flashcards into categoriesArray
function loadCategoriesArray() {
    /*for (let i = 0; i < flashcards.length; i++) {
        categoriesArray[i] = flashcards[i]['category']; 
    }*/
    categoriesArray = flashcards.map(flashcard => flashcard.category);
}