import { loop, pos9, wrap } from "./utils.js";
import { solve } from "./solver.js";
import Board from "./board.js";

const query = x => document.querySelector(x);
const boardDOM = document.getElementById("board");
const board = new Board();
const buttons = [];
const numbers = new Map();
const directions = new Map();
const history = [];

let historyIndex = 0;
let selectedElement;
let selectedX;
let selectedY;

history.push();

numbers.set("Digit1", 1);
numbers.set("Digit2", 2);
numbers.set("Digit3", 3);
numbers.set("Digit4", 4);
numbers.set("Digit5", 5);
numbers.set("Digit6", 6);
numbers.set("Digit7", 7);
numbers.set("Digit8", 8);
numbers.set("Digit9", 9);
numbers.set("Backspace", 0);
numbers.set("Delete", 0);

directions.set("ArrowLeft", [-1, 0]);
directions.set("ArrowRight", [1, 0]);
directions.set("ArrowUp", [0, -1]);
directions.set("ArrowDown", [0, 1]);

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

    const value = numbers.get(event.code);

    if (value != null) {
        selectedElement.innerHTML = value === 0 ? "" : value;
        
        board.set(selectedX, selectedY, value, true);
    } else {
        const movement = directions.get(event.code);

        if (movement != null) event.preventDefault();

        selectedX = wrap(selectedX + movement[0], 0, 8);
        selectedY = wrap(selectedY + movement[1], 0, 8);

        buttons[pos9.i(selectedX, selectedY)].click();

        updateBoard();
    }
});

query("#solve").addEventListener("click", () => {
    query("#result").innerHTML = "";

    unselect();

    attemptSolve();
});

query("#step").addEventListener("click", () => {
    query("#result").innerHTML = "";

    unselect();

    attemptSolve(true);
});

query("#reset").addEventListener("click", () => {
    board.reset();

    query("#result").innerHTML = "";

    unselect();
    updateBoard();
});
