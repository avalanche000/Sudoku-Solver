import { range } from "./utils.js";
import Group from "./group.js";

function parseGroups(board) {
    return [
        ...range(9).map(y => new Group(range(9).map(x => board.get(x, y)))),
        ...range(9).map(x => new Group(range(9).map(y => board.get(x, y)))),
        ...range(9).map(si => new Group(range(9).map(i => board.get(i % 3 + (si % 3) * 3, Math.floor(i / 3) + Math.floor(si / 3) * 3)))),
    ];
}

function solve(board) {
    const groups = parseGroups(board);

    let iterations = 0;

    while (!board.isComplete()) {
        iterations++;
        if (iterations > 1_000) {
            console.warn("Too many iterations, breaking the loop.");
            return 1;
        }

        groups.forEach(group => {
            const wrongValues = group.getValues();

            group.getOpen().forEach(point => point.addWrongValues(wrongValues));
        });

        groups.forEach(group => {
            group.getValuesLeft().forEach(value => {
                const availablePoints = group.getAvailablePoints(value);

                groups.forEach(otherGroup => {
                    if (otherGroup === group) return;

                    const otherPoints = otherGroup.points.filter(point => !availablePoints.includes(point));

                    if (otherPoints.length + availablePoints.length === 9) {
                        otherPoints.forEach(point => point.addWrongValues([value]));
                    }
                });
            });
        });

        groups.forEach(group => {
            group.getValuesLeft().forEach(value => {
                const availablePoints = group.getAvailablePoints(value);

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
    
    return 0;
}

export { solve };