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

export { range, loop };
