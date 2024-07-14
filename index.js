const container = document.getElementById('container');
let grid = [];
let startNode = null;
let finishNode = null;

const ROWS = 10;
const COLS = 10;

class Cell {
    constructor(element, row, col) {
        this.element = element;
        this.row = row;
        this.col = col;
        this.start = false;
        this.finish = false;
        this.wall = false;
        this.visited = false;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.previous = null;
        this.addClickEvent();
        this.addMouseEnterEvent();
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
        if (!this.start && !this.finish && !this.wall) {
            this.visited = true;
            this.element.classList.add('cell-visited');
        }
    }
}

function getNeighbours(cell) {
    let neighbours = []

    // Top
    if (cell.row > 0) {
        neighbours.push(grid[cell.row - 1][cell.col]);
    }

    // Bottom
    if (cell.row < ROWS - 1) {
        neighbours.push(grid[cell.row + 1][cell.col]);
    }

    // Left
    if (cell.col > 0) {
        neighbours.push(grid[cell.row][cell.col - 1]);
    }

    // Right
    if (cell.col < COLS - 1) {
        neighbours.push(grid[cell.row][cell.col + 1]);
    }

    return neighbours;
}

function heuristic(cell) {
    return Math.abs(cell.row - finishNode.row) + Math.abs(cell.col - finishNode.col);
}

function compareArray(a, b) {
    return a.join() === b.join();
}

function aStar() {
    let openList = [startNode];

    while (openList) {
        let currNode = openList[0];

        for (let i = 0; i < openList.length; i++) {
            if (openList[i].f < currNode.f) {
                currNode = openList[i];
            }
        }

        if (currNode.finish) {
            return;
        }

        openList.splice(openList.indexOf(currNode), 1);
        currNode.visit();

        const neighbours = getNeighbours(currNode);

        for (let i = 0; i < neighbours.length; i++) {
            const neighbour = neighbours[i];

            if (!neighbour.start && !neighbour.visited && !neighbour.wall) {
                const tempG = currNode.g + 1;

                if (openList.includes(neighbour)) {
                    if (tempG < neighbour.g) {
                        neighbour.g = tempG;
                        neighbour.h = heuristic(neighbour, finishNode);
                        neighbour.f = neighbour.g + neighbour.h;
                        this.previous = currNode;
                    }
                } else {
                    neighbour.g = tempG;
                    neighbour.h = heuristic(neighbour, finishNode);
                    neighbour.f = neighbour.g + neighbour.h;
                    this.previous = currNode;
                    openList.push(neighbour);
                }

                openList.push(neighbour);
            }
        }
    }
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

function bfs() {
    let stack = [startNode];
    let found = false;

    while (!found) {
        for (let i = 0; i < stack.length; i++) {
            for (let j = 0; j < stack[i].getNeighbours().length; j++) {
                let cell = stack[i].getNeighbours()[j];

                if (cell.finish) {
                    found = true;
                    return;
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
