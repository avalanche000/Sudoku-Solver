import { range, rMap } from "./utils.js";

class Point {
    constructor(x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.availableValues = range(1, 10);
    }

    addWrongValues(array) {
        this.availableValues = this.availableValues.filter(value => value == this.value || !array.includes(value));
    }
}

class Group {
    constructor(points) {
        this.points = points;
    }

    getOpen() {
        return this.points.filter(point => point.value == 0);
    }

    getClosed() {
        return this.points.filter(point => point.value != 0);
    }

    getValues() {
        return this.getClosed().map(point => point.value);
    }

    getValuesLeft() {
        const values = this.getValues();

        return range(9).filter(num => !values.includes(num));
    }

    getAvailablePoints(value) {
        return this.getOpen().filter(point => point.availableValues.includes(value));
    }
}

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
            if (this.get(i % 9, Math.floor(i / 9)).value == 0) return false;
        }

        return true;
    }

    log() {
        this.board.forEach((row, y) => {
            let string = "";

            row.forEach((point, x) => {
                string += point.value;

                if (x < 8) {
                    string += " ";
                }

                if (x == 2 || x == 5) {
                    string += "| ";
                }
            });

            console.log(string);

            if (y == 2 || y == 5) {
                console.log("------|-------|------");
            }
        });
    }
}

export { Point, Group, Board };
