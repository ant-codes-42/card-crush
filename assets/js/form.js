// Global variables go here
// const createCatButton = document.getElementById('createCatButton');
const saveClick = document.getElementById(`card-save-button`);
// Event listener for create category button click - calls createCategoryModal
// createCatButton.addEventListener('click', createCategoryModal);

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

        $('#modal1').modal('attach events', '#another-card-button');

        $('#another-card-button').click(function () {
            $('#card-front').val('');
            $('#card-back').val('');
        });
    }
}

function cardSaveButton(event) {
    event.preventDefault();
    const cardFront = document.getElementById('card-front').value;
    const cardBack = document.getElementById('card-back').value;
    const cardBackError = document.getElementById('cardBackError');
    const cardFrontError = document.getElementById('cardFrontError');
    
    let hasError = false;

    if (!cardFront) {
        cardFrontError.textContent = `Front card empty`; //broken somewhere in these if statements
        cardFrontError.style.display = `block`;
        hasError = true;
    } else {
        cardFrontError.style.display = `none`;
    }
    if (!cardBack) {
        cardBackError.textContent = `Back card empty`;
        cardBackError.style.display = `block`;
        hasError = true;
    } else {
        cardBackError.style.display = `none`;
    }
    if (hasError) {
        preventDefault();
        return;
    }
    // if (!cardFront || !cardBack) {
    //     alert('Please finish your cards');
    //     return;
    // }

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

    // alert('Card saved!');
}