import { range, rMap } from "./utils.js";
import { Board, Group } from "./board.js";

const gameBoard = new Board([
    [9, 0, 0,   5, 0, 0,   0, 6, 2],
    [0, 0, 0,   9, 3, 0,   8, 4, 0],
    [0, 7, 0,   0, 8, 0,   0, 0, 0],

    [0, 0, 0,   6, 0, 0,   2, 0, 0],
    [8, 0, 2,   0, 5, 0,   0, 0, 0],
    [0, 5, 7,   0, 0, 0,   0, 3, 8],

    [0, 3, 0,   0, 6, 4,   0, 0, 0],
    [7, 6, 9,   0, 1, 2,   5, 8, 0],
    [4, 0, 8,   0, 9, 5,   3, 1, 6],
]);

function parseGroups(board) {
    return [
        ...rMap(9, y => new Group(rMap(9, x => board.get(x, y)))),
        ...rMap(9, x => new Group(rMap(9, y => board.get(x, y)))),
        ...rMap(9, si => new Group(rMap(9, i => board.get(i % 3 + (si % 3) * 3, Math.floor(i / 3) + Math.floor(si / 3) * 3)))),
    ];
}

function solve(board) {
    const groups = parseGroups(board);

    let iterations = 0;

    while (!board.isComplete()) {
        iterations++;
        if (iterations > 10_000) {
            console.warn("Too many iterations, breaking the loop.");
            break;
        }

        groups.forEach(group => {
            const wrongValues = group.getValues();

            group.getOpen().forEach(point => point.addWrongValues(wrongValues));
        });

        groups.forEach(group => {
            range(1, 10).forEach(num => {
                const points = group.getAvailablePoints(num);

                groups.forEach(otherGroup => {
                    const otherPoints = otherGroup.points.filter(point => !points.includes(point));

                    if (otherPoints.length + points.length === 9) {
                        otherPoints.forEach(point => point.addWrongValues([num]));
                    }
                });
            });
        });

        groups.forEach(group => {
            group.getValuesLeft().forEach(value => {
                const availablePoints = group.getAvailablePoints();

                if (availablePoints.length === 1) {
                    availablePoints[0].value = value;
                }
            });
        });

        board.points.forEach(point => {
            if (point.availableValues.length === 1) {
                point.value = point.availableValues[0];
            }
        });
    }
}

gameBoard.log();

solve(gameBoard);

gameBoard.log();
