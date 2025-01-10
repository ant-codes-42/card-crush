// Global variables go here
let flashcards = readLocalFlashcards();
let sessionCategory = readSessionCategory();
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

// Grabs session category local storage, otherwise returns an empty string
function readSessionCategory() {
    const sessionCategory = localStorage.getItem("sessionCategory");
    return sessionCategory ? sessionCategory : '';
}

// Stores the passed string to sessionCategory in local storage
function storeSessionCategory(string) {
    localStorage.setItem('sessionCategory', string);
}

// This function to be used for redirect to another page (might not be needed)
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
    categoriesArray = flashcards.map(flashcard => flashcard.category);
}