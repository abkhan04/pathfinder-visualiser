import Node from './Node.js';

const grid = document.getElementById('grid');
const gridArray = []

const NUM_OF_ROWS = 10;
const NUM_OF_COLS = 10;

// Create a grid
function makeGrid(rows, cols) {
    // Set properties from CSS
    grid.style.setProperty('--grid-rows', rows);
    grid.style.setProperty('--grid-cols', cols);

    for (let row = 0; row < rows; row++) {
        gridArray.push([]);

        for (let col = 0; col < cols; col++) {
            // Create a HTML Element with the CSS class 'grid-item'
            // Append to the HTML div and push to the array with class Node
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            grid.appendChild(gridItem);
            gridArray[row].push(new Node(gridItem));
        }
    }
}

// Set Node at [row][col] to the starting position
function setStartNode(row, col) {
    gridArray[row][col].setStart();
}

// Set Node at [row][col] to the finishing position
function setFinishNode(row, col) {
    gridArray[row][col].setFinish();
}

makeGrid(NUM_OF_ROWS, NUM_OF_COLS);
setStartNode(0, 0);
setFinishNode(9, 9);