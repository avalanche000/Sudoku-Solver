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

function invertValues(points) {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(value => !points.includes(value));
}

function createPosWrapper(width) {
    return {
        x: i => i % width,
        y: i => Math.floor(i / width),
        pos: i => [i % width, Math.floor(i / width)],
        i: (x, y) => x + y * width
    };
}

function wrap(x, min, max) {
    if (x < min) return min;
    if (x > max) return max;
    return x;
}

const pos9 = createPosWrapper(9);

export { range, loop, invertValues, createPosWrapper, pos9, wrap };
