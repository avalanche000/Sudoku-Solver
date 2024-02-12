import { range, createPosWrapper, invertValues } from "./utils.js";
import Group from "./group.js";

const pos3 = createPosWrapper(3);

function parseGroups(board) {
    return [
        ...range(9).map(y => new Group(range(9).map(x => board.get(x, y)))),
        ...range(9).map(x => new Group(range(9).map(y => board.get(x, y)))),
        ...range(9).map(si => new Group(range(9).map(i => board.get(pos3.x(i) + pos3.x(si) * 3, pos3.y(i) + pos3.y(si) * 3))))
    ];
}

function solve(board, steps) {
    const groups = parseGroups(board);
    const stepRecordings = [];

    let boardString;
    let iterations = 0;

    function record() {
        stepRecordings.push(board.toArray());
    }
    
    record();

    while (!board.isComplete()) {
        iterations++;

        if (iterations > steps) return 2;
        if (iterations > 1_000) return 3;

        // board.resetAvailable();

        record();

        // if a value is used in a group, then all other points in that group must not have that value
        groups.forEach(group => {
            const usedValues = group.getValues();

            group.getOpen().forEach(point => point.addWrongValues(usedValues));
        });

        record();

        // if all the available points for a value in one group all also in another group, then all of the other points in the other group must not contain that value
        groups.forEach(group => {
            group.getValuesLeft().forEach(value => {
                const availablePoints = group.getAvailablePoints(value);

                groups.forEach(otherGroup => {
                    // not neccessary but it avoids an extra loop
                    if (otherGroup === group) return;

                    const otherPoints = otherGroup.points.filter(point => !availablePoints.includes(point));

                    // basically a weird way to check if group2 contains all the available points because I need to set values on all the other points
                    if (otherPoints.length + availablePoints.length === 9) {
                        otherPoints.forEach(point => point.addWrongValues([value]));
                    }
                });
            });
        });

        record();

        // if (x) number of sub-groups take over the same (x) number of squares, and each sub-group is composed of all the same value, then the points within those squares can only have the values that each sub-group is composed of
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

        record();

        // if a point is the only point left in a group that can have a certain value, then it must have that value
        groups.forEach(group => {
            group.getValuesLeft().forEach(value => {
                const availablePoints = group.getAvailablePoints(value);

                if (availablePoints.length === 1) {
                    availablePoints[0].value = value;
                }
            });
        });

        record();

        // if a point only has one available value, then it must have that value
        board.points.forEach(point => {
            if (point.availableValues.length === 1) {
                point.value = point.availableValues[0];
            }
        });

        record();

        const curr = board.toString();

        if (boardString === curr) return 1;

        boardString = curr;
    }

    return 0;
}

export { solve };