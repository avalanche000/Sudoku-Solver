import { rMap } from "./utils.js";
import Point from "./point.js";

class Board {
    constructor(boardArray) {
        this.board = rMap(9, y => rMap(9, x => new Point(x, y, boardArray[y][x])));
        this.points = rMap(81, i => this.get(i % 9, Math.floor(i / 9)));
    }

    get(x, y) {
        return this.board[y][x];
    }

    set(x, y, value) {
        return this.board[y][x].value = value;
    }

    isComplete() {
        for (let i = 0; i < 81; i++) {
            if (this.get(i % 9, Math.floor(i / 9)).value === 0) return false;
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

export default Board ;
