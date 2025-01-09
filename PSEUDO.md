## Main Page Load

{logic.js}
Load variable from storage - flashcards, JSON parse
    - If no variable for flashcards set to blank array


Loop through flashcards array
    - grab every categories key:value pair
    - store in categories array (inside function)
Loop through categories array
    - Return categories values | will this return all at once or one at a time?

{logic.js}
Call build elements function:
    - Intake categories values
    - Create buttons in <div> on index.html | Need '#id' to target the right <div>

{form.js}
Event listener - if <create category> button is clicked
    - Check <input> for string | need #id for the <input> field for the category field
    {logic.js}
    Call Create Category function
        - If no text, present error message
        - If text:
            - Store <input> in variable
            - Create new object for category
            - Call function in {logic.js} to add new object to flashcards array.
             Go to modal pop-up logic (New Card)

{form.js}
Event listener - if <category> button is clicked
    - Call function to determine which category was clicked
        - Store category in sessionStorage variable | need variable name
    {logic.js}
    - Redirect to: rolo.html


## New Card Modal Pop Up

{logic.js}
Event listener - if <create card> button is clicked
    - Check <input> with #id for string (front)
    - Check <input> with #id for string (back)
        - If no text, present error message
        - If text, call createCard function | createCard function in {logic.js}
    <Option 1> | Preferred - Rachel's advice b/c we're manipulating data
        - Hide existing modal pop up elements.
        - Show hidden modal pop up elements:
            - <button>: Create another card
                Event listener
                    - Hide existing modal pop up elements
                    - Show refreshed create card modal pop up elements
            - <button>: Start studying
                Event listener
                    {logic.js}
                    - Redirect to: rolo.html
    <Option 2>
        - Generate new modal pop up window:
            - <button>: Create another card
                Event listener
                    - Refresh first modal pop up window
            - <button>: Start studying
                Event listener
                    {logic.js}
                    -Redirect to: rolo.html

## Rolo.html Page Load

{logic.js}
Load variable from storage - flashcards, JSON parse
    - If no variable for flashcards set to blank array

{rolo.js}
Load sessionStorage variable for category, currentCategory
    - If no variable, variable is unrecognized as a valid category:
        - Call function to create category.
    - If category is empty:
        - Text to inform user they must create a card (reference the create a card button on page)
    - If category is recognized, save to global variable

{rolo.js}
Create a category function - modal JS pop up
    - Create <input>: category name
    - Create <button>: create category
    Event listener - if <create category> button is clicked
    - Check <input> for string | need #id for the <input> field for the category field
        {logic.js}
        Call Create Category function
        - If no text, present error message
        - If text:
            - Store <input> in variable
            - Create new object for category
            - Call function in {logic.js} to add new object to flashcards array.

{rolo.js}
Shuffle the category function - randomize the order of the objects within the category in the flashcards array
    - Check global variable (one pulled from sessionStorage) to determine category
    - Pull all key:value pairs inside this category, save to temp array
    - Figure out algorithm to randomize the order inside this temp array | This might be really hard

{rolo.js}
Display flashcards function
    - Check global variable (one pulled from sessionStorage) to determine category, currentCategory
    - Pull all key:value pairs inside this category, save to global variable - array, cardsInCategory
        {rolo.js}
        - Call the shuffle category function
    - Check the global variable for an array object
    - Save the first ([0]) object in the array to a global variable, focusedCard | ex: focusedCard = cardsInCategory[0]
    - Display the first ([0]) object in the array


{rolo.js}
Event Listener - Delete Button | press the delete button - need the #id for this button
Call function to delete from the flashcards array
    - Delete the array object in the global variable from the display flashcards function, focusedCard
    - Call the next flashcard function

{rolo.js}
Event Listener - Next Button | press the next button - need the #id for this button
Call function to move to the next flashcard in the array
    - Increment the object in the array in the global variable, focusedCard | ex: focusedCard = cardsInCategory[i++]
    - Call the display flashcards function {rolo.js}

{rolo.js}
Event Listener - Edit Button | press the Edit button - need the #id for this button
Call function to edit the current flashcard - modal JS pop up
    - Create <input>: front
    - Create <input>: back
    - Fill attribute for default text on front as focusedCard.front
    - Fill attribute for the default text on back as focusedCard.back
