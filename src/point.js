import { range, invertValues } from "./utils.js";

class Point {
    constructor(x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.availableValues = range(1, 10);
    }

    getUnavailableValues() {
        return invertValues(thid, this.availableValues);
    }

    addWrongValues(array) {
        this.availableValues = this.availableValues.filter(value => value === this.value || !array.includes(value));
    }
}

export default Point;
