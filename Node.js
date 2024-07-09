let isStartSet = false;
let isFinishSet = false;

export default class Node {
    constructor(element) {
        this.element = element;
        this.element.addEventListener('click', () => {
            if (!isStartSet) {
                this.setStart();
                isStartSet = true;
            } else if (!isFinishSet && !this.isStart) {
                this.setFinish();
                isFinishSet = true;
            } else if (!(this.isStart || this.isFinish)) {
                this.setWall();
            }
        });
        this.isVisited = false;
        this.isStart = false;
        this.isFinish = false;
        this.isWall = false;
    }

    setStart() {
        this.element.classList.add('node-start');
        this.isStart = true;
        this.isFinish = false;
        this.isWall = false;
    }

    setFinish() {
        this.element.classList.add('node-finish');
        this.isStart = false;
        this.isFinish = true;
        this.isWall = false;
    }

    setWall() {
        this.element.classList.add('node-wall');
        this.isStart = false;
        this.isFinish = false;
        this.isWall = true;
    }
}