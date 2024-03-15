import { pos9 } from "./utils.js";

class BoardDOM {
    static points = [];
    static selected;

    static select(x, y) {
        this.selected?.DOM.classList.remove("selected");
        this.selected = this.points[pos9.i(x, y)];
        this.selected.DOM.classList.add("selected");
    }

    static deselect() {
        this.selected?.DOM.classList.remove("selected");
        this.selected = null;
    }

    static set(x, y, value) {
        this.points[pos9.i(x, y)].DOM.innerHTML = value;
    }

    static fromString(boardString) {
        JSON.parse(boardString).forEach((point, i) => {
            this.points[i].DOM = point.value;
        });
    }
}

loop(9, y => {
    const row = document.createElement("div");

    row.classList.add("row");

    loop(9, x => {
        const column = document.createElement("div");
        const number = document.createElement("div");

        column.classList.add("col");
        number.classList.add("number");

        number.addEventListener("click", () => BoardDOM.select(x, y));

        BoardDOM.points.push({ DOM: number, x, y });

        column.appendChild(number);
        row.appendChild(column);
    });

    document.getElementById("board").appendChild(row);
});

export default BoardDOM;
