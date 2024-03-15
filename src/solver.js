import { range, createPosWrapper, invertValues } from "./utils.js";
import Group from "./group.js";

const pos3 = createPosWrapper(3);

function solve(board, step) {
    board.resetAvailable();

    const groups = [
        ...range(9).map(y => new Group(range(9).map(x => board.get(x, y)))),
        ...range(9).map(x => new Group(range(9).map(y => board.get(x, y)))),
        ...range(9).map(si => new Group(range(9).map(i => board.get(pos3.x(i) + pos3.x(si) * 3, pos3.y(i) + pos3.y(si) * 3))))
    ];

    let boardString;
    let current;
    let iterations = 0;

    while (!board.isComplete()) {
        iterations++;

        // if (iterations > steps) return 2;
        if (iterations > 1_000) return 3;

        // if a value is used in a group, then no other points in that group can have that value
        groups.forEach(group => {
            const valuesUsed = group.getValuesUsed();
            const valuesLeft = group.getValuesLeft();

            group.points.forEach(point => point.addWrongValues(valuesUsed));

            // if all the available points for a value in one group are also in another group, then all of the other points in the
            // other group must not contain that value
            valuesLeft.forEach(value => {
                const availablePoints = group.getAvailablePoints(value);

                groups.forEach(otherGroup => {
                    // not neccessary but it avoids an extra loop
                    if (otherGroup === group) return;

                    const otherPoints = otherGroup.points.filter(point => !availablePoints.includes(point));

                    // basically a weird way to check if group2 contains all the available points because I need to set values on all
                    // the other points
                    if (otherPoints.length + availablePoints.length === 9) {
                        otherPoints.forEach(point => point.addWrongValues([value]));
                    }
                });
            });

            // if (x) number of sub-groups take up the same (x) number of squares, and each sub-group is composed of all the same
            // value, then the points within those squares can only have the values that each sub-group is composed of
            valuesLeft.forEach(value => {
                const points = group.getAvailablePoints(value);

                let matches = 1;
                let values = [value];

                valuesLeft.forEach(value2 => {
                    if (value === value2) return;

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

            // if a point is the only point left in a group that can have a certain value, then it cannot contain any other values
            valuesLeft.forEach(value => {
                const availablePoints = group.getAvailablePoints(value);

                if (availablePoints.length === 1) {
                    availablePoints[0].availableValues = [value];
                }
            });
        });

        // if a point only has one available value, then it must have that value
        board.points.forEach(point => {
            if (point.value !== 0) return;

            if (point.availableValues.length === 1) {
                point.value = point.availableValues[0];
            }
        });

        current = board.toString();

        if (boardString === current) return 1;

        boardString = current;
    }

    return 0;
}

export { solve };