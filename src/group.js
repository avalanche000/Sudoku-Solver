import { range } from "./utils.js";

class Group {
    constructor(points) {
        this.points = points;
        this.points.forEach(point => point.addGroup(this));
    }

    getOpen() {
        return this.points.filter(point => point.value === 0);
    }

    getClosed() {
        return this.points.filter(point => point.value !== 0);
    }

    getValues() {
        return this.getClosed().map(point => point.value);
    }

    getValuesLeft() {
        const values = this.getValues();

        return range(9).filter(num => !values.includes(num));
    }

    getAvailablePoints(value) {
        return this.getOpen().filter(point => point.availableValues.includes(value));
    }
}

export default Group;
