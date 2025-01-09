## Main Page Load

Load variable from storage - flashcards, JSON parse
    - If no variable for flashcards set to blank array

Loop through flashcards array
    - grab every categories key:value pair
    - store in categories array
Loop through categories array
    - Return categories values

Event listener - if <create category> button is clicked
    - Check <input> with #id for string
        - If no text, present error message
        - If text, go to modal pop-up logic

Event listener - if <category> button is clicked (how do we watch all buttons? / know which button is clicked?)
    - Redirect to: rolo.html


## New Card Modal Pop Up

Event listener - if <create card> button is clicked
    - Check <input> with #id for string (front)
    - Check <input> with #id for string (back)
        - If no text, present error message
        - If text, call createCard function
    <Option 1>
        - Hide existing modal pop up elements.
        - Show hidden modal pop up elements:
            - <button>: Create another card
                Event listener
                    - Hide existing modal pop up elements
                    - Show refreshed create card modal pop up elements
            - <button>: Start studying
                Event listener
                    - Redirect to: rolo.html



