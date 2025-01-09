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
Load sessionStorage variable for category
    - If no variable, variable is unrecognized as a valid category:
        - Call function to create category.
    - If category is empty:
        - Text to inform user they must create a card (reference the create a card button on page)

{rolo.js}
Create a category function - modal JS pop up
    - Create <input>: category name
    - Create <button>: create category
    
