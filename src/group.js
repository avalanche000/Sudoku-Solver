import { invertValues } from "./utils.js";

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

    getValuesUsed() {
        return this.getClosed().map(point => point.value);
    }

    getValuesLeft() {
        return invertValues(this.getValuesUsed());
    }

    getAvailablePoints(value) {
        return this.getOpen().filter(point => point.availableValues.includes(value));
    }
}

export default Group;
