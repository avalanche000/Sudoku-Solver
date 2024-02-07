import { range, invertValues } from "./utils.js";
import Group from "./group.js";

function parseGroups(board) {
    return [
        ...range(9).map(y => new Group(range(9).map(x => board.get(x, y)))),
        ...range(9).map(x => new Group(range(9).map(y => board.get(x, y)))),
        ...range(9).map(si => new Group(range(9).map(i => board.get(i % 3 + (si % 3) * 3, Math.floor(i / 3) + Math.floor(si / 3) * 3)))),
    ];
}

function solve(board, steps) {
    const groups = parseGroups(board);

    let iterations = 0;

    while (!board.isComplete()) {
        iterations++;
        if (iterations > (steps ?? 1_000)) {
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
            const valuesLeft = group.getValuesLeft();
            
            valuesLeft.forEach(value1 => {
                const points = group.getAvailablePoints(value1);

                let matches = 1;
                let values = [value1];

                valuesLeft.forEach(value2 => {
                    if (value1 === value2) return;

                    const points2 = group.getAvailablePoints(value2);

                    if (points.length !== points2.length) return;

                    for (let i = 0; i < points.length; i++) {
                        if (!points2.includes(points[i])) return;
                    }

                    matches++;
                    values.push(value2);
                });
                
                if (matches >= points.length) {
                    points.forEach(point => {
                        point.addWrongValues(invertValues(values));
                    });
                }
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