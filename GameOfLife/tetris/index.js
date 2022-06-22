let mDown = false;
let unitLength = 50;
const boxColor = 000;
const strokeColor = 50;

let columns = 10;
let rows = 22;

var currentBoard;
let score = 0;
let timer = 0;
let speed = 500;
let lose = false;
let options = {

}


const square = [{
        color: [0x06, 0x9A, 0x8E],
        position: [
            [3, 1],
            [4, 1],
            [5, 1],
            [6, 1]
        ],
        pivot: 1
    },
    {
        color: [0x2E, 0x94, 0xB9],
        position: [
            [3, 1],
            [4, 1],
            [4, 0],
            [5, 0]
        ],
        pivot: 2
    }, {
        color: [0x79, 0xDA, 0xE8],
        position: [
            [4, 1],
            [4, 0],
            [3, 0],
            [5, 1]
        ],
        pivot: 1
    },
    {
        color: [0xFB, 0xAC, 0x91],
        position: [
            [4, 0],
            [4, 1],
            [3, 1],
            [5, 1]
        ],
        pivot: 1
    },
    {
        color: [0xEA, 0x99, 0xD5],
        position: [
            [4, 1],
            [3, 1],
            [5, 1],
            [5, 0]
        ],
        pivot: 0
    },
    {
        color: [0xFF, 0xD2, 0x4C],
        position: [
            [4, 0],
            [5, 0],
            [4, 1],
            [5, 1]
        ],
        pivot: -1
    }, {
        color: [0xFF, 0x88, 0x82],
        position: [
            [4, 1],
            [3, 1],
            [5, 1],
            [3, 0]
        ],
        pivot: 0
    }
];

let points = {
    x: 12,
    y: 123
}

let gameState = false;
let startButton = document.querySelectorAll("#start-button")
let startButtonIcon = document.querySelector("#startButtonIcon")

function stopGame() {
    startButton.forEach(element => {
        element.innerHTML = "Start";
    })
    gameState = false;
    startButtonIcon.classList.remove("fa-pause")
    startButtonIcon.classList.add("fa-play")
}

function startGame() {
    startButton.forEach(element => {
        element.innerHTML = "Stop";
    })
    gameState = true;

    startButtonIcon.classList.remove("fa-play")
    startButtonIcon.classList.add("fa-pause")
}

function btnStart() {
    if (gameState) {
        stopGame()
    } else {
        startGame()
    }
}
startButton.forEach(element => {
    element.addEventListener('click',
        btnStart
    )
})



function setup() {

    /* Set the canvas to be under the element #canvas*/
    let bodyWidth = document.querySelector("#canvas-container").offsetWidth;
    unitLength = bodyWidth / 10;
    const canvas = createCanvas(bodyWidth, unitLength * rows);
    canvas.parent(document.querySelector('#canvas'));
    /*Calculate the number of columns and rows */

    frameRate = 1;
    /*     buttonStart = addButton(gameState, 10, 10, btnStart) */

    currentBoard = [];
    /*     nextBoard = []; */


    init()
}

function windowResized() {
    console.log(document.querySelector("#canvas-container").offsetWidth)

    let bodyWidth = document.querySelector("#canvas-container").offsetWidth;
    console.log(bodyWidth)
    unitLength = bodyWidth / 10;
    resizeCanvas(bodyWidth, unitLength * rows);
}

function drawRect(x, y, width, height, r, g, b, hasStroke) {
    let c = color(r, g, b);
    fill(c);
    if (hasStroke) {
        strokeWeight(0.3);
        stroke(0xdf, 0x78, 0x61);
    } else {
        noStroke();
    }
    rect(x, y, width, height);
}




function init() {
    for (let i = 0; i < columns; i++) {
        currentBoard[i] = Array(rows).fill(0);

    }
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            currentBoard[i][j] = { value: 0, color: [0xec, 0xb3, 0x90], movable: false };

        }
    }

    generate();
}

setInterval(() => {
    timer = timer + 10;
    if (timer >= speed) {
        timer = 0;
        down();
    }
}, 10);

function draw() {
    background(0x94, 0xb4, 0x9f);
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {

            if (currentBoard[i][j].value == 0) {
                drawRect(i * unitLength, j * unitLength, unitLength, unitLength, 0xfc, 0xf8, 0xe8, true);

            } else {
                drawRect(i * unitLength, j * unitLength, unitLength, unitLength, currentBoard[i][j].color[0], currentBoard[i][j].color[1], currentBoard[i][j].color[2], true);
            }

        }
    }
}

let dMode = document.querySelectorAll('#dark-mode')
let buttonDarkMode = true;

function darkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");

    if (buttonDarkMode) {
        dMode.forEach(element => {
            element.innerHTML = "Light";
        })
        buttonDarkMode = false
    } else {
        dMode.forEach(element => {
            element.innerHTML = "Dark";
        })
        buttonDarkMode = true
    }
}


let musicOn = true;
var audio = new Audio('../backgroundmusic.mp3');
audio.loop = true;

let music = document.querySelectorAll('#music')
music.forEach(element => {
    element.addEventListener('click', function(play) {

        if (musicOn) {
            music.forEach(element => {
                element.innerHTML = "Music off";
            })
            musicOn = false;
            audio.play();
            audio.volume = 0.2;
        } else if (!musicOn) {
            music.forEach(element => {
                element.innerHTML = "Music on";
            })
            musicOn = true;
            audio.pause();


        }
    })

})

window.addEventListener("keydown", function(event) {
    if (event.defaultPrevented) {
        return;
    }

    if (event.keyCode == 38) {
        console.log("up")
        event.preventDefault();
        up();
    } else if (event.keyCode == 40) {
        event.preventDefault();
        down();
    } else if (event.keyCode == 37) {
        event.preventDefault();
        left();
    } else if (event.keyCode == 39) {
        event.preventDefault();
        right();
    }
})

function up() {
    if (!gameState) {
        return;
    }
    let nextBoard = copyBoard(currentBoard)
    nextBoard = clearBoardMovable(nextBoard);
    let pivotPoint = []
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            /*     if (!currentBoard[x][y].pivot) {
                    return
                } */
            if (currentBoard[x][y].movable && currentBoard[x][y].pivot) {

                pivotPoint = [x, y]

            }
        }
    }
    if (pivotPoint[0] && pivotPoint[1]) {
        for (let x = 0; x < columns; x++) {
            for (let y = 0; y < rows; y++) {
                if (currentBoard[x][y].movable) {
                    /*    console.log(`x:${x - pivotPoint[0]},y:${y - pivotPoint[1]}`) */
                    let relativeX = x - pivotPoint[0]
                    let relativeY = y - pivotPoint[1]
                    let rotatedX = pivotPoint[0] - (y - pivotPoint[1]);
                    let rotatedY = pivotPoint[1] + (x - pivotPoint[0]);
                    if (rotatedX < 0 || rotatedY < 0 || rotatedX > 9 || rotatedY > 21) {
                        console.log("Limited")
                        return
                    }
                    if (nextBoard[rotatedX][rotatedY].value == 1) {
                        console.log("Limited")
                        return
                    }
                    nextBoard[pivotPoint[0] - relativeY][pivotPoint[1] + relativeX] = {...currentBoard[x][y] }

                }
            }
        }
        currentBoard = copyBoard(nextBoard)
    }

}

function down() {
    if (!gameState) {
        return;
    }
    let nextBoard = copyBoard(currentBoard)
    nextBoard = clearBoardMovable(nextBoard);
    let limited = false;
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            if (currentBoard[x][y].movable) {
                if (y == 21 || nextBoard[x][y + 1].value == 1) {
                    limited = true;
                } else {
                    nextBoard[x][y + 1] = {...currentBoard[x][y] }
                }
            }

        }
    }


    if (limited) {
        console.log("Reached Bottom Border!")
        checkLine();
        generate();
    } else {
        currentBoard = copyBoard(nextBoard)
    }
}

const pop = new Audio('pop.mp3')

function checkLine() {
    for (let y = 0; y < rows; y++) {
        let lineFill = true;
        for (let x = 0; x < columns; x++) {
            if (currentBoard[x][y].value == 0) {
                lineFill = false;
                break;
            }
        }
        if (lineFill) {
            pop.play();
            score += +100;
            let countScore = document.querySelector('#score');
            countScore.innerHTML = `Score: ${score}`;


            let nextBoard = copyBoard(currentBoard);

            nextBoard = nextBoard.map((element) => {
                let newElement = (element)
                newElement.splice(y, 1);
                newElement.unshift({ value: 0, color: [0xec, 0xb3, 0x90], movable: false })
                return newElement;
            })

            console.log(nextBoard)
            currentBoard = copyBoard(nextBoard);

        }
    }
}


function left() {
    if (!gameState) {
        return;
    }
    let nextBoard = copyBoard(currentBoard)
    nextBoard = clearBoardMovable(nextBoard);

    let limited = false;
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            if (currentBoard[x][y].movable) {
                if (x == 0 || nextBoard[x - 1][y].value == 1) {
                    limited = true;
                } else {
                    nextBoard[x - 1][y] = currentBoard[x][y]
                }

            }
        }
    }
    if (limited) {
        console.log("Reached Left Border!")
    } else {
        currentBoard = copyBoard(nextBoard)
    }

}

function right() {
    if (!gameState) {
        return;
    }
    let nextBoard = copyBoard(currentBoard)
    nextBoard = clearBoardMovable(nextBoard);

    let limited = false;
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            if (currentBoard[x][y].movable) {
                if (x == 9 || nextBoard[x + 1][y].value == 1) {
                    limited = true;
                    return
                } else {
                    nextBoard[x + 1][y] = currentBoard[x][y]
                }
            }
        }
    }
    if (limited) {
        console.log("Reached Right Border!")
    } else {
        currentBoard = copyBoard(nextBoard)
    }
}

function clearBoardMovable(board) {
    let outputBoard = board
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            if (outputBoard[x][y].movable) {
                outputBoard[x][y] = { value: 0, color: [0xec, 0xb3, 0x90], movable: false };
            }
        }
    }
    return outputBoard
}

function copyBoard(board) {
    return board.map((element) => element.slice())
}

function generate() {
    let gameOver = false;
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            currentBoard[x][y].movable = false;

        }

    }
    let selectedSquare = square[Math.floor(Math.random() * 7)]



    let nextBoard = copyBoard(currentBoard);
    selectedSquare.position.forEach((element, index) => {
        if (currentBoard[element[0]][element[1]].value == 1) {
            gameOver = true;
            return;
        }

        if (index == selectedSquare.pivot) {
            nextBoard[element[0]][element[1]] = { value: 1, color: selectedSquare.color, movable: true, pivot: true };
        } else {
            nextBoard[element[0]][element[1]] = { value: 1, color: selectedSquare.color, movable: true };
        }
    })
    if (gameOver) {
        alert("Game over!");
        gameState = "Stop"
    } else(
        currentBoard = copyBoard(nextBoard)
    )
}


document.querySelectorAll('#restart-button').forEach(element => {
    element.addEventListener('click', function() {
        init();
        let countScore = document.querySelector('#score');
        countScore.innerHTML = `Score: ${0}`;
        gameState = "Start"
        closeNav()
    });
})

function openNav() {
    document.querySelector(".overlay").classList.remove("d-none")
    document.querySelector(".overlay").classList.remove("animate__zoomOut")
    document.querySelector("#overlay-container").classList.remove("overlay-hide");
    document.querySelector(".overlay").classList.remove("overlay-hide")
    document.querySelector(".overlay").classList.add("animate__zoomIn")



    stopGame();
}

function closeNav() {
    document.querySelector("#overlay-container").classList.add("overlay-hide");
    /*  document.querySelector(".overlay").classList.add("overlay-hide") */
    document.querySelector(".overlay").classList.add("animate__zoomOut")
    document.querySelector(".overlay").classList.remove("animate__zoomIn")



    startGame();
}