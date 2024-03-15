import Keyboard from "./keyboard.js";
import BoardDOM from "./boardDOM.js";
import Board from "./board.js";
import { wrap } from "./utils.js";

const boardDOM = new BoardDOM();
const board = new Board();
const history = [];
const maxHistory = 50;

let historyIndex = 0;

function updateBoardDOM() {
    boardDOM.fromString(board.toString());
}

function record() {
    if (historyIndex < history.length - 1) history.splice(historyIndex + 1);

    history.push(board.toString());

    if (history.length > maxHistory) history.shift();

    historyIndex = history.length - 1;
}

function undo() {
    if (history.length === 0 || historyIndex === 0) return;

    historyIndex--;

    board.fromString(history[historyIndex]);

    updateBoardDOM();
}

function redo() {
    if (history.length === 0 || historyIndex === history.length - 1) return;

    historyIndex++;

    board.fromString(history[historyIndex]);

    updateBoardDOM();
}

function moveSelected(dx, dy) {
    const x = boardDOM.selected?.x ?? 0;
    const y = boardDOM.selected?.y ?? 0;

    boardDOM.select(wrap(x + dx, 0, 8), wrap(y + dy, 0, 8));
}

Keyboard.onKeyDown("KeyC", (event, firstPress) => {
    if (firstPress && event.ctrlKey && !event.altKey && !event.metaKey) {
        if (event.shiftKey) redo();
        else undo();
    }
});

Keyboard.onKeysDownMapper({
    "ArrowUp": [0, -1],
    "ArrowDown": [0, 1],
    "ArrowLeft": [-1, 0],
    "ArrowRight": [1, 0]
}, delta => moveSelected(...delta));
