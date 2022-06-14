function checkMarkSix(result, bid) {
    for (let num1 of bid) {
        let match = false;

        for (let num2 of result) {
            if (num1 == num2) {
                match = true;
            }
        }
        if (!match) {
            return false;
        }
    } return true;

}

console.log(checkMarkSix([1,2,3,5,6,7,9],[2,9]));