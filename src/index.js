import { loop } from "./utils.js";
import { solve } from "./solver.js";
import Board from "./board.js";

const boardDOM = document.getElementById("board");
const solveButton = document.getElementById("solve");
const resetButton = document.getElementById("reset");
const board = new Board();

let selectedElement;
let selectedPos;


const buttons = [];

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
            selectedPos = [x, y];
        });

        buttons.push(number);

        column.appendChild(number);
        row.appendChild(column);
    });

    boardDOM.appendChild(row);
});

const keys = new Map();

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

window.addEventListener("keydown", (event) => {
    const value = keys.get(event.code);

    if (value != null) {
        selectedElement.innerHTML = value === 0 ? "" : value;
        board.set(...selectedPos, value);
    } else {
        switch (event.code) {
            case "ArrowUp":
                if (selectedPos[1] > 0) {
                    selectedPos[1] = selectedPos[1] - 1;
                    buttons[selectedPos[0] + selectedPos[1] * 9].click();
                }
                break;
            case "ArrowDown":
                if (selectedPos[1] < 8) {
                    selectedPos[1] = selectedPos[1] + 1;
                    buttons[selectedPos[0] + selectedPos[1] * 9].click();
                }
                break;
            case "ArrowLeft":
                if (selectedPos[0] > 0) {
                    selectedPos[0] = selectedPos[0] - 1;
                    buttons[selectedPos[0] + selectedPos[1] * 9].click();
                }
                break;
            case "ArrowRight":
                if (selectedPos[0] < 8) {
                    selectedPos[0] = selectedPos[0] + 1;
                    buttons[selectedPos[0] + selectedPos[1] * 9].click();
                }
                break;
            default:
                break;
        }
    }
});

solveButton.addEventListener("click", async () => {
    const result = solve(board);

    board.points.forEach((point, idx) => {
        buttons[idx].innerHTML = point.value === 0 ? "" : point.value;
    });

    switch (result) {
        case 0:
            alert("Success!!!");
            break;
        case 1:
            alert("Error, couldn't find a solution.");
            break;
        default:
            break;
    }
});

resetButton.addEventListener("click", async () => {
    board.points.forEach((point, idx) => {
        point.value = 0;
        buttons[idx].innerHTML = "";
    })
});
