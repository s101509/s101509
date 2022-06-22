let a: number = 1
let b: string = "alex"
let students: string[] = ["alex", "gordon", "michael"]
let teachers: [string] = ["jason"] //得一個string既array
let card: [string, number] = ["Spade", 1]
let array: [] = [] //永遠都唔會有野既array
let obj: {
    name: string,
    age: number,
    weight: number
} = {
    name: "Alex",
    age: 18,
    weight: 80
}
let studentInfos: { name: string }[] = [{ name: "Alex" }, { name: "Gordon" }]
let checkDuplicate: {
    [key: string]: number
} = {
    a: 0,
    b: 0,
}
let c: string | number = 1 //union type
c = "alex"
let date: Date = new Date()
let fn: () => void = () => {
    console.log("hi")
}
let fnWithParam: (name?: string) => string = (name?: string): string => { // ?=可有可無
    if (name) {
        return "Hello" + name
    } else {
        return "Hello who r u"
    }
}

fnWithParam()
fnWithParam("Alex")

function add(a: number, b: number): number {
    return a + b
}

console.log("Hello World")
console.log(add(1, 2))
console.log(b);








function findFactors(num: number) {
    let factors: Array<number> = [];
    for (let factor = 2; factor <= num / 2; factor++) {
        if (num % factor === 0) {
            factors.push(factor);
        }
    }
    return factors;
}


function leapYear(year: number): boolean {
    if (year % 400 === 0) {
        console.log("Leap Year");
        return true;
    } else if (year % 100 === 0) {
        console.log("Not a Leap Year");
        return false;
    } else if (year % 4 === 0) {
        console.log("Leap Year");
        return true;
    } else {
        console.log("Not a Leap Year");
        return false;
    }
}


function rnaTranscription(dna: string) {
    let rna: string = "";
    for (let nucleotide of dna) {
        switch (nucleotide) {
            case "G":
                rna += "C";
                break;
            case "C":
                rna += "G";
                break;
            case "T":
                rna += "A";
                break;
            case "A":
                rna += "U";
                break;
            default:
                throw new Error(`The nucleotide ${nucleotide} does not exist`)
        }
    }
    return rna;
}


function factorial(number: number) {
    if (number === 0 || number === 1) {
        return 1;
    }

    return factorial(number - 1) * number
}


var peter: {
    name: string;
    age: number;
    students: Array<{
        name: string;
        age: number;
        exercise?: Array<{ score: number; date: Date; }>;
    }>;
} = {
    name: "Peter",
    age: 50,
    students: [
        { name: "Andy", age: 20 },
        { name: "Bob", age: 23 },
        {
            name: "Charlie", age: 25, exercises: [{ score: 60, date: new Date() }]
        }
    ]
}



const timeoutHandler = () => {
    console.log("Timeout happens!");
}

const timeout: number = 1000;

setTimeout(timeoutHandler, timeout)

const someValue: number | null = Math.random() > 0.5 ? 12 : null;