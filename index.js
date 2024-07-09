import Node from './Node.js';

const grid = document.getElementById('grid');
const gridArray = [];

const NUM_OF_ROWS = 10;
const NUM_OF_COLS = 10;


function makeGrid(rows, cols) {
    grid.style.setProperty('--grid-rows', rows);
    grid.style.setProperty('--grid-cols', cols);

    for (let row = 0; row < rows; row++) {
        gridArray.push([]);

        for (let col = 0; col < cols; col++) {
            const node = document.createElement('div');
            node.classList.add('node');
            grid.appendChild(node);
            gridArray[row].push(new Node(node));
        }
    }
}

makeGrid(NUM_OF_ROWS, NUM_OF_COLS);