import { range, pos9 } from "./utils.js";
import Point from "./point.js";

class Board {
    constructor() {
        this.points = range(81).map(i => new Point(...pos9.pos(i)));
    }

    fromArray(boardArray) {
        this.points.forEach((point, i) => {
            point.value = boardArray[i].value;
            point.availableValues = boardArray[i].availableValues;
        });
    }

    fromString(boardString) {
        this.fromArray(JSON.parse(boardString));
    }

    toArray() {
        return this.points.map(point => ({
            value: point.value,
            availableValues: [...point.availableValues]
        }));
    }

    toString() {
        return JSON.stringify(this.toArray());
    }

    resetAvailable() {
        this.points.forEach(point => {
            point.availableValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        });
    }

    reset() {
        this.points.forEach(point => {
            point.value = 0;
            point.availableValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        });
    }

    get(x, y) {
        return this.points[pos9.i(x, y)];
    }

    set(x, y, value) {
        this.get(x, y).value = value;
    }

    isComplete() {
        for (let i = 0; i < this.points.length; i++) {
            if (this.points[i].value === 0) return false;
        }

        return true;
    }
}

export default Board;
