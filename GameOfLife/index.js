// const helenGame = {
//     mouseDown: false,
//     darkMode: false,
//     clear: function() {
// 
//     }
// }

let mDown = false;

const boxColor = 000;
const strokeColor = 50;
let columns = 25;
let rows = 25;
let unitLength = 50;
let currentBoard;
let nextBoard;
let timer = 0;
let speed = 0
let options = {

}

let points = {
    x: 12,
    y: 123
}

function addButton(state, x, y, handler) {
    if (state == "Start") {
        button = createButton("Stop");
    } else {
        button = createButton("Start");
    }
    button.position(x, y);
    button.mousePressed(handler);
    return button;
}
let startButton = document.querySelector("#start-button")

function btnStart(e) {
    /*     e.preventDefault() */
    if (buttonStartState === "Start") {
        /*  buttonStart.html("Start"); */
        console.log(timer)
        startButton.innerHTML = "Start";
        buttonStartState = "Stop";
    } else {
        /*     buttonStart.html("Stop"); */
        console.log(timer)
        startButton.innerHTML = "Stop";
        buttonStartState = "Start";
    }
}

let buttonStart;
let buttonStartState = "Stop";

function setup() {

    /* Set the canvas to be under the element #canvas*/
    let bodyWidth = document.querySelector("#canvas-container").offsetWidth;
    unitLength = bodyWidth / columns;
    const canvas = createCanvas(bodyWidth, unitLength * rows);
    canvas.parent(document.querySelector('#canvas'));


    frameRate = 1;
    /*     buttonStart = addButton(buttonStartState, 10, 10, btnStart) */
    startButton.addEventListener("mouseup", btnStart)
    currentBoard = [];
    nextBoard = [];

    for (let i = 0; i < columns; i++) {
        //currentBoard[i] = [];
        currentBoard[i] = Array(rows).fill(0);
        nextBoard[i] = Array(rows).fill(0);
    }

}

function drawRect(x, y, width, height, r, g, b, hasStroke) {
    let c = color(r, g, b);
    fill(c);
    if (hasStroke) {
        strokeWeight(1);
        stroke(0xdf, 0x78, 0x61);
    } else {
        noStroke();
    }
    rect(x, y, width, height);
}

function generate() {

    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            let neighbors = 0;

            for (let i of[-1, 0, 1]) {
                for (let j of[-1, 0, 1]) {
                    if (i == 0 && j == 0) {
                        // the cell itself is not its own neighbor
                        continue;
                    }
                    // The modulo operator is crucial for wrapping on the edge
                    neighbors += currentBoard[(x + i + columns) % columns][(y + j + rows) % rows];
                }
            }

            // Rules of Life
            if (currentBoard[x][y] == 1 && neighbors < 2) {
                // Die of Loneliness
                nextBoard[x][y] = 0;
            } else if (currentBoard[x][y] == 1 && neighbors > 3) {
                // Die of Overpopulation
                nextBoard[x][y] = 0;
            } else if (currentBoard[x][y] == 0 && neighbors == 3) {
                // New life due to Reproduction
                nextBoard[x][y] = 1;
                /*    console.log({ x, y, c: 3 }); */
            } else {
                // Stasis
                nextBoard[x][y] = currentBoard[x][y];
            }

        }
    }

    [nextBoard, currentBoard] = [currentBoard, nextBoard];
}

function init() {
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            currentBoard[i][j] = 0;
            nextBoard[i][j] = 0;
        }
    }
    boxActiveColor = [0xec, 0xb3, 0x90];
}


const speedSlider = document.querySelector("#speed-slider");
speedSlider.addEventListener("input", (e) => {
    console.log(e.target.value)
    speed = e.target.value;
    console.log(speed)
    speedSlider.style.setProperty("--thumb-rotate", `${e.target.value * 10}deg`);
})

function gameSpeedController() {
    if (buttonStartState === "Start" && timer > speed) {
        generate();
        timer = 0;
    }
}
setInterval(() => {
    timer = timer + 20;
}, 20);

let boxActiveColor = [0xec, 0xb3, 0x90];

function draw() {
    background(128);

    gameSpeedController()

    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {

            if (currentBoard[i][j] == 0) {
                drawRect(i * unitLength, j * unitLength, unitLength, unitLength, 0xfc, 0xf8, 0xe8, true);
            } else {
                if (currentBoard[i][j] == nextBoard[i][j]) {
                    drawRect(i * unitLength, j * unitLength, unitLength, unitLength, 0x7f, 0x84, 0x87, true);
                } else {
                    drawRect(i * unitLength, j * unitLength, unitLength, unitLength, boxActiveColor[0], boxActiveColor[1], boxActiveColor[2], true);
                }

            }

        }
    }



    {
        let w = unitLength;
        if (mDown) drawRect(mouseX - w / 2, mouseY - w / 2, w, w, boxActiveColor[0], boxActiveColor[1], boxActiveColor[2]);
    }
}

let dMode = document.querySelector('#dark-mode')
let buttonDarkMode = true;

function darkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");

    if (buttonDarkMode) {
        dMode.innerHTML = "Light";
        buttonDarkMode = false
    } else {
        dMode.innerHTML = "Dark";
        buttonDarkMode = true
    }
}

/* function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
} */

function windowResized() {
    console.log(document.querySelector("#canvas-container").offsetWidth)

    let bodyWidth = document.querySelector("#canvas-container").offsetWidth;
    console.log(bodyWidth)
    unitLength = bodyWidth / columns;
    resizeCanvas(bodyWidth, unitLength * rows);
}


/**
 * When mouse is dragged
 */
function mouseDragged() {
    if (mouseX > unitLength * columns || mouseX < 0 || mouseY > unitLength * rows || mouseY < 0) {
        return;
    }
    const x = Math.floor(mouseX / unitLength);
    const y = Math.floor(mouseY / unitLength);
    currentBoard[x][y] = 1;
    /*    fill(boxColor);
       stroke(strokeColor); */
    rect(x * unitLength, y * unitLength, unitLength, unitLength, boxActiveColor[0], boxActiveColor[1], boxActiveColor[2]);
}

/**
 * When mouse is pressed
 */
function mousePressed() {
    mDown = true;
}

/**
 * When mouse is released
 */
function mouseReleased() {
    mDown = false;
    let x = floor(mouseX / unitLength);
    let y = floor(mouseY / unitLength);

    /*     currentBoard[x][y] = 1; */
}

document.querySelector('#reset-button')
    .addEventListener('click', function() {
        init();
    });

function setRandomColor() {
    boxActiveColor = boxActiveColor.map(() => {
        return Math.random() * 255
    })
}

let randomPattern = document.querySelector('#random-pattern');

function setRandomPattern() {
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            // Rules of Life
            nextBoard[x][y] = Math.round(Math.random() * 1)

        }
    }

    [nextBoard, currentBoard] = [currentBoard, nextBoard];
}

randomPattern.addEventListener('click', setRandomPattern)

let music = document.querySelector('#music')
let musicOn = true;
var audio = new Audio('backgroundmusic.mp3');
audio.loop = true;

function play() {
    if (musicOn) {
        music.innerHTML = "Music off";
        musicOn = false;
        audio.play();
        audio.volume = 0.2;
    } else if (!musicOn) {
        music.innerHTML = "Music on";
        musicOn = true;
        audio.pause();
    }
}

music.addEventListener('click', play)