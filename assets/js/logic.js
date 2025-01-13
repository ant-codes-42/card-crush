// Global variables go here
let flashcards = readLocalFlashcards();
let sessionCategory = readSessionCategory();
let cardFront = '';
let cardBack = '';

// Grabs flashcards local storage, otherwise returns an empty array
function readLocalFlashcards() {
    const flashcards = localStorage.getItem("flashcards");
    return flashcards ? JSON.parse(flashcards) : [];
}

// Stores the passed object to flashcards in local storage
function storeLocalFlashcards() {
    let tempCardsArray = JSON.parse(JSON.stringify(flashcards)); // deep copy of flashcards array

    localStorage.setItem('flashcards', JSON.stringify(tempCardsArray));
}

// Grabs session category local storage, otherwise returns an empty string
function readSessionCategory() {
    const sessionCategory = sessionStorage.getItem("sessionCategory");
    return sessionCategory ? sessionCategory : '';
}

// Stores the passed string to sessionCategory in local storage
function storeSessionCategory(string) {
    sessionStorage.setItem('sessionCategory', string);
}

// This function to be used for redirect to another page (might not be needed)
let redirectURL = '';

const redirectPage = function (url) {
    redirectURL = url;
    location.assign(url);
}