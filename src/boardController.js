import Keyboard from "./keyboard.js";
import { wrap, query } from "./utils.js";

class BoardController {
    constructor(boardDOM, board) {
        this.boardDOM = boardDOM;
        this.board = board;
        this.history = [];
        this.maxHistory = 50;
        this.historyIndex = 0;

        Keyboard.onKeyDown("KeyZ", (_, event) => {
            if (event.ctrlKey && !event.altKey && !event.metaKey) {
                if (event.shiftKey) this.redo();
                else this.undo();
            }
        });

        Keyboard.onKeysDownMapper({
            "ArrowUp": [0, -1],
            "ArrowDown": [0, 1],
            "ArrowLeft": [-1, 0],
            "ArrowRight": [1, 0]
        }, delta => this.moveSelected(...delta));

        Keyboard.onKeysDownMapper({
            "Digit1": 1,
            "Digit2": 2,
            "Digit3": 3,
            "Digit4": 4,
            "Digit5": 5,
            "Digit6": 6,
            "Digit7": 7,
            "Digit8": 8,
            "Digit9": 9,
            "Backspace": 0,
            "Delete": 0
        }, value => {
            if (this.boardDOM.selected != null) {
                this.board.set(this.boardDOM.selected.x, this.boardDOM.selected.y, value);
                this.updateBoardDOM();
                this.record();
            }
        });
    }

    updateBoardDOM() {
        this.boardDOM.copyString(this.board.toString());
    }

    record() {
        if (this.historyIndex < this.history.length - 1) this.history.splice(this.historyIndex + 1);

        this.history.push(this.board.toString());

        if (this.history.length > this.maxHistory) this.history.shift();

        this.historyIndex = this.history.length - 1;
    }

    undo() {
        if (this.history.length === 0 || this.historyIndex === 0) return;

        this.historyIndex--;

        this.board.copyString(this.history[this.historyIndex]);

        this.updateBoardDOM();
    }

    redo() {
        if (this.history.length === 0 || this.historyIndex === this.history.length - 1) return;

        this.historyIndex++;

        this.board.copyString(this.history[this.historyIndex]);

        this.updateBoardDOM();
    }

    moveSelected(dx, dy) {
        const x = this.boardDOM.selected?.x ?? 0;
        const y = this.boardDOM.selected?.y ?? 0;

        this.boardDOM.select(wrap(x + dx, 0, 8), wrap(y + dy, 0, 8));
    }
}

export default BoardController;
