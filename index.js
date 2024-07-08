

const grid = document.getElementById('grid');
const gridArray = []

const NUM_OF_ROWS = 10;
const NUM_OF_COLS = 10;

class Node {

}

function makeGrid(rows, cols) {
    grid.style.setProperty('--grid-rows', rows);
    grid.style.setProperty('--grid-cols', cols);

    for (let row = 0; row < rows; row++) {
        gridArray.push([]);

        for (let col = 0; col < cols; col++) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            grid.appendChild(gridItem);
            gridArray[row].push(gridItem);
        }
    }
}

function setStartNode(row, col) {
    gridArray[row][col].classList.add('grid-item-start');
}

function setFinishNode(row, col) {
    gridArray[row][col].classList.add('grid-item-finish');
}

makeGrid(NUM_OF_ROWS, NUM_OF_COLS);
console.log(gridArray);
setStartNode(0, 0);
setFinishNode(9, 9);