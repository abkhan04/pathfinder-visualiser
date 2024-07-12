const container = document.getElementById('container');
let grid = [];

const ROWS = 10;
const COLS = 10;

let startNode = [];
let finishNode = [];

class Cell {
    constructor(element, x, y) {
        this.element = element;
        this.x = x;
        this.y = y;
        this.neighbours = [];
        this.addNeighbours();
        this.start = false;
        this.finish = false;
        this.wall = false;
        this.visited = false;
        this.addClickEvent();
        this.addMouseEnterEvent();
    }

    addNeighbours() {
        // Top
        if (this.x > 0) {
            this.neighbours.push([this.x - 1, this.y]);
        }

        // Bottom
        if (this.x < ROWS - 1) {
            this.neighbours.push([this.x + 1, this.y]);
        }

        // Left
        if (this.y > 0) {
            this.neighbours.push([this.x, this.y - 1]);
        }

        // Right
        if (this.y < COLS - 1) {
            this.neighbours.push([this.x, this.y + 1]);
        }
    }

    addClickEvent() {
        this.element.addEventListener('click', () => {
            if (compareArray(startNode, [])) {
               this.makeStartNode();
            } else if (compareArray(finishNode, []) && this.start === false) {
                this.makeFinishNode();
            } else if (this.start === false && this.finish === false) {
                if (this.wall) {
                    this.removeWall();
                } else {
                    this.makeWall();
                }
            }
        });
    }

    addMouseEnterEvent() {
        this.element.addEventListener('mouseenter', (event) => {
            if (event.buttons === 1) {
                if (!compareArray(startNode, []) && !compareArray(finishNode, []) && this.start === false && this.finish === false) {
                    if (!this.wall) {
                        this.makeWall();
                    } else {
                        this.removeWall();
                    }
                }
            }
        });
    }

    makeStartNode() {
        startNode = [this.x, this.y];
        this.start = true;
        this.element.classList.add('cell-start'); 
    }

    makeFinishNode() {
        finishNode = [this.x, this.y];
        this.finish = true;
        this.element.classList.add('cell-finish');   
    }

    makeWall() {
        this.wall = true;
        this.element.classList.add('cell-wall');
    }

    removeWall() {
        this.wall = false;
        this.element.classList.remove('cell-wall');
    }

    visit() {
        for (let i = 0; i < this.neighbours.length; i++) {
            let [x, y] = this.neighbours[i];
            grid[x][y].element.classList.add('cell-visited');
        }
    }
}

function compareArray(a, b) {
    return a.join() === b.join();
}

function setup(rows, cols) {
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);

    for (let row = 0; row < rows; row++) {
        grid.push([]);

        for (let col = 0; col < cols; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            container.appendChild(cell);
            grid[row].push(new Cell(cell, row, col));
        }
    }
}

function debug() {
    grid[startNode[0]][startNode[1]].visit();
}

setup(ROWS, COLS);
