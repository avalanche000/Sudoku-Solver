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

function rMap(num, func) {
    return range(num).map(func);
}

export { range, rMap };
