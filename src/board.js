import { range } from "./utils.js";
import Point from "./point.js";

class Board {
    constructor() {
        this.board = range(9).map(y => range(9).map(x => new Point(x, y, 0)));
        this.points = range(81).map(i => this.get(i % 9, Math.floor(i / 9)));
    }

    resetSolve() {
        this.points.forEach(point => {
            point.availablePoints = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        });
    }

    reset() {
        this.points.forEach(point => {
            point.value = 0;
            point.availablePoints = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        });
    }

    get(x, y) {
        return this.board[y][x];
    }

    set(x, y, value, reset = false) {
        this.board[y][x].value = value;
        if (reset) this.resetSolve();
    }

    isComplete() {
        for (let i = 0; i < this.points.length; i++) {
            if (this.points[i].value === 0) return false;
        }

        return true;
    }

    log() {
        this.board.forEach((row, y) => {
            let string = "";

            row.forEach((point, x) => {
                string += point.value === 0 ? " " : point.value;

                if (x < 8) {
                    string += " ";
                }

                if (x === 2 || x === 5) {
                    string += "| ";
                }
            });

            console.log(string);

            if (y === 2 || y === 5) {
                console.log("------|-------|------");
            }
        });
    }
}

export default Board;
