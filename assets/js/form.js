// Global variables go here
// const createCatButton = document.getElementById('createCatButton');
// const saveClick = document.getElementById(`card-save-button`);
// Event listener for create category button click - calls createCategoryModal
// createCatButton.addEventListener('click', createCategoryModal);
let categoriesArray = [];

// This is the master create category modal function - must contain everything needed within the modal (I think)
function createCategoryModal(event) {
    event.preventDefault();
    const categoryInput = document.getElementById('categoryInput');
    const categoryError = document.getElementById('categoryError');
    if (!categoryInput.value) {
        categoryError.textContent = 'Please enter a category name';
        categoryError.style.display = 'block';
        return;
    } else {
        categoryError.style.display = `none`;
        sessionCategory = categoryInput.value; // Store the category name in sessionCategory
        storeSessionCategory(sessionCategory); // Store the category name in session storage
        categoryInput.value = '';

        // initialize all modals
        $('.coupled.modal').modal({
            allowMultiple: true
        });

        // open second modal within first based on button selection
        $('#modal2')
            .modal('attach events', '#card-save-button');

        // show first modal to user
        $('#modal1').modal('show');

        $('#card-close-button').click(function () {
            $('.ui.modal').modal('hide');
        });

        $('#card-save-button').click(cardSaveButton);
            console.log(`call save function`)
        $('#modal1').modal('attach events', '#another-card-button');

        $('#another-card-button').click(function () {
            $('#card-front').val('');
            $('#card-back').val('');
        });
    }
}
document.getElementById('createCatButton').addEventListener('click', createCategoryModal);

function cardSaveButton(event) {
    event.preventDefault();
    let cardFront = document.getElementById('card-front');
    let cardBack = document.getElementById('card-back'); 
    const cardBackError = document.getElementById('cardBackError');
    const cardFrontError = document.getElementById('cardFrontError');


    if (cardFront.value.trim() == "") {
        cardFrontError.textContent = `Front card empty`;
        cardFrontError.style.display = `block`;
    } else {
        cardFrontError.style.display = `none`;
    }
    if (cardBack.value.trim() == "") {
        cardBackError.textContent = `Back card empty`;
        cardBackError.style.display = `block`;
    } else {
        cardBackError.style.display = `none`;
    }
    if (cardFront.value == "" || cardBack.value == "") {
        $(`#modal2`).modal(`hide`);
        $(`#modal1`).modal(`show`);
        
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

    return;
}

// Load the categories from flashcards into categoriesArray
function loadCategoriesArray() {
    categoriesArray = flashcards.map(flashcard => flashcard.category);
}

function buildCategoryButtons() {
    const buttonContainer = document.getElementById('buttonContainer');
    buttonContainer.innerHTML = '';
    categoriesArray.forEach(category => {
        const button = document.createElement('button');
        button.classList.add('ui', 'button', 'card-category-button');
        button.textContent = category;
        buttonContainer.appendChild(button);
    });
}

loadCategoriesArray();
buildCategoryButtons();
document.addEventListener('DOMContentLoaded', function () {
    const categoryButtons = document.querySelectorAll('.card-category-button');

    for (i of categoryButtons) {
        i.addEventListener('click', function () {
            sessionCategory = this.textContent;
            storeSessionCategory(sessionCategory);
            redirectPage('./rolo.html');
        });
    }
});
