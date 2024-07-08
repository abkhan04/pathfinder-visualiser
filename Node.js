export default class Node {
    constructor(htmlElement) {
        this.htmlElement = htmlElement;
        this.isVisited = false;
        this.isStart = false;
        this.isFinish = false;
    }

    setStart() {
        this.htmlElement.classList.add('grid-item-start');
        this.isStart = true;
        this.isFinish = false;
    }

    setFinish() {
        this.htmlElement.classList.add('grid-item-finish');
        this.isStart = false;
        this.isFinish = true;  
    }
}