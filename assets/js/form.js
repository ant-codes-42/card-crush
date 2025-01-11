// Global variables go here
// const createCatButton = document.getElementById('createCatButton');
const categoryInput = document.getElementById('categoryInput');
const saveClick = document.getElementById(`card-save-button`);
// Event listener for create category button click - calls createCategoryModal
// createCatButton.addEventListener('click', createCategoryModal);

// This is the master create category modal function - must contain everything needed within the modal (I think)
function createCategoryModal(event) {
    event.preventDefault();
    if (!categoryInput.value) {
        alert('Please enter a category name');
        return;
    } else {
        sessionCategory = toString(categoryInput.value); // Store the category name in sessionCategory
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

        $('#card-save-button').click(function () {   
            const cardFront = document.getElementById(`card-front`).value;
            const cardBack = document.getElementById(`card-back`).value;
            if(!cardFront || !cardBack){
                alert(`please finish your cards`);
                return;
            } else if(cardBack && cardFront){
                alert(`card saved!`);
            }   
        });
    }
}