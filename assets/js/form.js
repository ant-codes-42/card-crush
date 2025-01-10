// Global variables go here
// const createCatButton = document.getElementById('createCatButton');
const categoryInput = document.getElementById('categoryInput');

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
        $('.ui.modal').modal('show');

        $('#card-close-button').click(function () {
            $('.ui.modal').modal('hide');
        });

        $('#card-save-button').click(function () {
        
        });
    }
}