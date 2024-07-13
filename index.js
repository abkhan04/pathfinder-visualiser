const container = document.getElementById('container');
let grid = [];
let startNode = null;
let finishNode = null;

const ROWS = 10;
const COLS = 10;

class Cell {
    constructor(element, x, y) {
        this.element = element;
        this.x = x;
        this.y = y;
        this.neighbours = [];
        this.start = false;
        this.finish = false;
        this.wall = false;
        this.visited = false;
        this.addClickEvent();
        this.addMouseEnterEvent();
    }

    getNeighbours() {
        if (compareArray(this.neighbours, [])) {
            // Top
            if (this.x > 0) {
                this.neighbours.push(grid[this.x - 1][this.y]);
            }

            // Bottom
            if (this.x < ROWS - 1) {
                this.neighbours.push(grid[this.x + 1][this.y]);
            }

            // Left
            if (this.y > 0) {
                this.neighbours.push(grid[this.x][this.y - 1]);
            }

            // Right
            if (this.y < COLS - 1) {
                this.neighbours.push(grid[this.x][this.y + 1]);
            }
        }

        return this.neighbours;
    }

    addClickEvent() {
        this.element.addEventListener('click', () => {
            if (!startNode) {
               this.makeStartNode();
            } else if (!finishNode && !this.start) {
                this.makeFinishNode();
            } else if (!this.start && !this.finish) {
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
                if (startNode && finishNode && !this.start && !this.finish) {
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
        startNode = this;
        this.start = true;
        this.element.classList.add('cell-start'); 
    }

    makeFinishNode() {
        finishNode = this;
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
        this.visited = true;
        this.element.classList.add('cell-visited');
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

function heuristic(cell) {
    return Math.abs(cell.x - finishNode.x) + Math.abs(cell.y - finishNode.y);
}

function bfs() {
    let stack = [startNode];
    let found = false;

    while (!found) {
        for (let i = 0; i < stack.length; i++) {
            for (let j = 0; j < stack[i].getNeighbours().length; j++) {
                let cell = stack[i].getNeighbours()[j];

                if (cell.finish) {
                    found = true;
                } else if (!cell.start && !cell.finish && !cell.visited) {
                    stack.push(cell);
                    cell.visit();
                }
            }

            if (found) {
                break;
            }
        }

        if (found) {
            break;
        }
    }
}

setup(ROWS, COLS);
