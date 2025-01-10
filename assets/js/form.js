// Global variables go here
const createCatButton = document.getElementById('createCatButton');

// Event listener for create category button click - calls createCategoryModal
createCatButton.addEventListener('click', createCategoryModal);

// This is the master create category modal function - must contain everything needed within the modal (I think)
function createCategoryModal(event) {
    event.preventDefault();
    $('.ui.modal').modal('show');

    $('#card-close-button').click(function () {
        $('.ui.modal').modal('hide');
    });
}