import { range, invertValues } from "./utils.js";

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.value = 0;
        this.availableValues = range(1, 10);
        this.groups = [];
    }

    get unavailableValues() {
        return invertValues(thid, this.availableValues);
    }

    addGroup(group) {
        this.groups.push(group);
    }

    addWrongValues(array) {
        this.availableValues = this.availableValues.filter(value => value === this.value || !array.includes(value));
    }
}

export default Point;
