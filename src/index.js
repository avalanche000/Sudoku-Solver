import { loop, pos9, wrap } from "./utils.js";
import { solve } from "./solver.js";
import Board from "./board.js";

const query = x => document.querySelector(x);
const boardDOM = document.getElementById("board");
const board = new Board();
const buttons = [];
const keys = new Map();
const directions = { x: new Map(), y: new Map() };

let selectedElement;
let selectedX;
let selectedY;

keys.set("Digit1", 1);
keys.set("Digit2", 2);
keys.set("Digit3", 3);
keys.set("Digit4", 4);
keys.set("Digit5", 5);
keys.set("Digit6", 6);
keys.set("Digit7", 7);
keys.set("Digit8", 8);
keys.set("Digit9", 9);
keys.set("Backspace", 0);
keys.set("Delete", 0);

directions.x.set("ArrowLeft", -1);
directions.x.set("ArrowRight", 1);
directions.y.set("ArrowUp", -1);
directions.y.set("ArrowDown", 1);

function updateBoard() {
    board.points.forEach((point, idx) => {
        buttons[idx].innerHTML = point.value === 0 ? "" : point.value;
    });

    query("#data").innerHTML = "";

    selectedElement?.click();
}

function unselect() {
    selectedElement?.classList.remove("selected");
    selectedElement = null;
    selectedX = null;
    selectedY = null;

    query("#data").innerHTML = "";
}

function attemptSolve(step) {
    const result = solve(board, step);

    updateBoard();

    switch (result) {
        case 0:
            query("#result").innerHTML = "Success!";
            break;
        case 1:
            query("#result").innerHTML = "Error: Couldn't find a solution.";
            break;
        case 2: // used step function
            break;
        case 3:
            query("#result").innerHTML = "Error: Too many iterations.";
            break;
        default:
            break;
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

        number.addEventListener("click", () => {
            selectedElement?.classList.remove("selected");
            selectedElement = number;
            selectedElement.classList.add("selected");
            selectedX = x;
            selectedY = y;

            query("#data").innerHTML = JSON.stringify(board.get(x, y).availableValues);
        });

        buttons.push(number);

        column.appendChild(number);
        row.appendChild(column);
    });

    boardDOM.appendChild(row);
});

window.addEventListener("keydown", (event) => {
    if (selectedElement == null) return;

    const value = keys.get(event.code);

    if (value != null) {
        selectedElement.innerHTML = value === 0 ? "" : value;
        
        board.set(selectedX, selectedY, value, true);
    } else {
        const deltaX = directions.x.get(event.code) ?? 0;
        const deltaY = directions.y.get(event.code) ?? 0;

        if (Math.abs(deltaX) + Math.abs(deltaY) > 0) event.preventDefault();

        selectedX = wrap(selectedX + deltaX, 0, 8);
        selectedY = wrap(selectedY + deltaY, 0, 8);

        buttons[pos9.i(selectedX, selectedY)].click();

        updateBoard();
    }
});

query("#solve").addEventListener("click", () => {
    query("#solve").innerHTML = ". . . . .";
    query("#result").innerHTML = "";

    unselect();

    setTimeout(() => {
        attemptSolve();
        query("#solve").innerHTML = "Solve";
    }, 1);
});

query("#step").addEventListener("click", () => {
    query("#result").innerHTML = "";

    unselect();

    setTimeout(() => {
        attemptSolve(true);
    }, 1);
});

query("#reset").addEventListener("click", () => {
    board.reset();

    query("#result").innerHTML = "";

    unselect();
    updateBoard();
});
