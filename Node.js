let isStartSet = false;
let isFinishSet = false;

export default class Node {
    constructor(element) {
        this.element = element;
        this.element.addEventListener('click', () => {
            if (!isStartSet) {
                this.setStart();
                isStartSet = true;
            }
            else if (!isFinishSet && !this.isStartNode) {
                this.setFinish();
                isFinishSet = true;
            }
            else if (!this.isStartNode && !this.isFinishNode) {
                if (!this.isWallNode) {
                    this.setWall();
                }
                else {
                    this.unsetWall();
                }
            }
        });
        this.element.addEventListener('mouseenter', (event) => {
            if (event.buttons == 1) {
                if (isStartSet && isFinishSet && !this.isStartNode && !this.isFinishNode) {
                    if (!this.isWallNode) {
                        this.setWall();
                    }
                    else {
                        this.unsetWall();
                    }
                }
            }
        });
        this.isStartNode = false;
        this.isFinishNode = false;
        this.isWallNode = false;
        this.isVisited = false;
    }

    setStart() {
        this.element.classList.add('node-start');
        this.isStartNode = true;
        this.isFinishNode = false;
        this.isWallNode = false;
        this.isVisited = true;
    }

    setFinish() {
        this.element.classList.add('node-finish');
        this.isStartNode = false;
        this.isFinishNode = true;
        this.isWallNode = false;
        this.isVisited = true;
    }

    setWall() {
        this.element.classList.add('node-wall');
        this.isStartNode = false;
        this.isFinishNode = false;
        this.isWallNode = true;
        this.isVisited = false;
    }

    unsetWall() {
        this.element.classList.remove('node-wall');
        this.isStartNode = false;
        this.isFinishNode = false;
        this.isWallNode = false;
    }

    setVisited() {
        this.element.classList.add('node-visited');
        this.isStartNode = false;
        this.isFinishNode = false;
        this.isWallNode = false;
        this.isVisited = true;
    }
}