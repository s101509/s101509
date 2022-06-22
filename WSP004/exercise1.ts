function sum(num: number): number {

    if (num == 1) {
        return 1;
    }

    return num + sum(num - 1);
}

console.log(sum(100));


function hanoi(x: number): number {
    if (x < 0) {
        return -1;
    }

    if (x == 1) {
        return 1;
    }

    return hanoi(x - 1) + 1 + hanoi(x - 1);
}

console.log(hanoi(3));