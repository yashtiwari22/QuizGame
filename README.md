# Quiz Game

This is a React component for a quiz game that allows users to arrange given numbers in ascending order by dragging and dropping the cards in the correct order.

## Installation

1: Clone the repository or download the source code.
2: Navigate to the project directory.
3: Install the dependencies by running the following command:
4: Start the development server:
npm start
The application will be running at http://localhost:3000.

## Features

. Generates random options for the quiz game.
. Allows dragging and dropping of options to arrange them.
. Provides visual feedback for correct and incorrect order.
. Notifies the user whether they won or lost the game.
. Allows resetting the game for another round.

## Functions

### generateOptions()

Generates an array of random options for the quiz game. It uses the useState hook to update the options state with the generated random options.

### handleDragStart(event, optionIndex)

Event handler function that sets the dataTransfer data for the drag event. It sets the optionIndex as the data to be transferred.

### handleDragOver(event)

Event handler function that prevents the default behavior of the drag over event.

### handleDrop(event, inputIndex)

Event handler function that handles the drop event. It retrieves the option index from the dataTransfer data, retrieves the dragged option from the options state, and updates the input state based on the drop position. It also handles swapping values if the drop zone is already filled.

### handleOptionDragStart(event, inputIndex)

Event handler function that sets the dataTransfer data for the drag event. It sets the inputIndex as the data to be transferred and sets the drop state to true.

### handleOptionDragOver(event)

Event handler function that prevents the default behavior of the drag over event.

### handleOptionDrop(event, optionIndex)

Event handler function that handles the drop event for options. It retrieves the input index from the dataTransfer data, retrieves the dragged item from the input state, and updates the options state and input state based on the drop position.

### checkResult()

Checks the result of the quiz game by comparing the sorted input array with the original input array. If they are the same, it sets the isWinner state to true, indicating the user has won. It also sets the showResult state to true to display the result.

### resetGame()

Resets the quiz game by generating new options, resetting the input state, and setting the showResult state to false.

## Dependencies

The following dependencies are required to run the QuizGame component:

. React
. framer-motion
. @lottiefiles/react-lottie-player

You can install these dependencies using the following command:

npm install react framer-motion @lottiefiles/react-lottie-player

## License

This project is licensed under the MIT License. See the LICENSE file for more information.
