import BoardDOM from "./boardDOM.js";
import Board from "./board.js";
import BoardController from "./boardController.js";
import { solve } from "./solver.js";
import { query } from "./utils.js";

const board = new Board();
const boardController = new BoardController(BoardDOM, board);

function attemptSolve(doStep) {
    const result = solve(board, doStep);

    boardController.updateBoardDOM();
    boardController.record();

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

query("#solve").addEventListener("click", () => {
    query("#result").innerHTML = "";
    BoardDOM.deselect();
    attemptSolve();
});

query("#step").addEventListener("click", () => {
    query("#result").innerHTML = "";
    BoardDOM.deselect();
    attemptSolve(true);
});

query("#reset").addEventListener("click", () => {
    query("#result").innerHTML = "";
    BoardDOM.deselect();
    board.reset();
    boardController.updateBoardDOM();
    boardController.record();
});
