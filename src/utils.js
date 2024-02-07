function range(a, b) {
    const arr = [];

    if (b == null) {
        b = a;
        a = 0;
    }

    for (let i = a; i < b; i++) {
        arr.push(i);
    }

    return arr;
}

function loop(num, func) {
    for (let i = 0; i < num; i++) {
        func(i);
    }
}

function invertPoints(points) {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(value => !points.includes(value));
}

export { range, loop, invertPoints as invertValues };
