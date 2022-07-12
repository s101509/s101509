let mDown = false

const unitLength = 20
const boxColor = 150
const strokeColor = 50
let columns /* To be determined by window width */
let rows /* To be determined by window height */
let currentBoard
let nextBoard

let options = {}

let points = {
	x: 12,
	y: 123
}

function addButton(state, x, y, handler) {
	if (state == 'Start') {
		button = createButton('Stop')
	} else {
		button = createButton('Start')
	}
	button.position(x, y)
	button.mousePressed(handler)
	return button
}

function btnStart() {
	if (buttonStartState === 'Start') {
		buttonStart.html('Start')
		buttonStartState = 'Stop'
	} else {
		buttonStart.html('Stop')
		buttonStartState = 'Start'
	}
}

let buttonStart
let buttonStartState = 'Stop'

function setup() {
	/* Set the canvas to be under the element #canvas*/
	const canvas = createCanvas(windowWidth, windowHeight)
	canvas.parent(document.querySelector('#canvas'))

	/*Calculate the number of columns and rows */
	columns = floor(width / unitLength)
	rows = floor(height / unitLength)

	buttonStart = addButton(buttonStartState, 10, 10, btnStart)

	currentBoard = []
	nextBoard = []

	for (let i = 0; i < columns; i++) {
		//currentBoard[i] = [];
		currentBoard[i] = Array(rows).fill(0)
		nextBoard[i] = Array(rows).fill(0)
	}
}

function drawRect(x, y, width, height, r, g, b, hasStroke) {
	let c = color(r, g, b)
	fill(c)
	if (hasStroke) {
		strokeWeight(1)
		stroke(100, 200, 100)
	} else {
		noStroke()
	}
	rect(x, y, width, height)
}

function drawEllipse() {
	let y = 50
	let r2 = 330

	strokeWeight(10)
	stroke(100, 200, 100)
	translate(50, r2 / 2 - y)
	fill(204, 153, 0)
	ellipse(100, y, 33, r2)
}

function generate() {
	for (let x = 0; x < columns; x++) {
		for (let y = 0; y < rows; y++) {
			let neighbors = 0

			for (let i of [-1, 0, 1]) {
				for (let j of [-1, 0, 1]) {
					if (i == 0 && j == 0) {
						// the cell itself is not its own neighbor
						continue
					}
					// The modulo operator is crucial for wrapping on the edge
					neighbors +=
						currentBoard[(x + i + columns) % columns][
							(y + j + rows) % rows
						]
				}
			}

			// Rules of Life
			if (currentBoard[x][y] == 1 && neighbors < 2) {
				// Die of Loneliness
				nextBoard[x][y] = 0
			} else if (currentBoard[x][y] == 1 && neighbors > 3) {
				// Die of Overpopulation
				nextBoard[x][y] = 0
			} else if (currentBoard[x][y] == 0 && neighbors == 3) {
				// New life due to Reproduction
				nextBoard[x][y] = 1
				console.log({ x, y, c: 3 })
			} else {
				// Stasis
				nextBoard[x][y] = currentBoard[x][y]
			}
		}
	}

	;[nextBoard, currentBoard] = [currentBoard, nextBoard]
}

function draw() {
	background(128)

	if (buttonStartState === 'Start') {
		generate()
	}

	for (let i = 0; i < columns; i++) {
		for (let j = 0; j < rows; j++) {
			if (currentBoard[i][j] == 0) {
				drawRect(
					i * unitLength,
					j * unitLength,
					unitLength,
					unitLength,
					123,
					145,
					45,
					true
				)
			} else {
				drawRect(
					i * unitLength,
					j * unitLength,
					unitLength,
					unitLength,
					0,
					0,
					0,
					true
				)
			}
		}
	}

	{
		let w = unitLength
		if (mDown) drawRect(mouseX - w / 2, mouseY - w / 2, w, w, 10, 10, 10)
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
}

/**
 * When mouse is dragged
 */
function mouseDragged() {
	// /**
	//  * If the mouse coordinate is outside the board
	//  */
	// if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
	//     return;
	// }
	// const x = Math.floor(mouseX / unitLength);
	// const y = Math.floor(mouseY / unitLength);
	// currentBoard[x][y] = 1;
	// fill(boxColor);
	// stroke(strokeColor);
	// rect(x * unitLength, y * unitLength, unitLength, unitLength);
}

/**
 * When mouse is pressed
 */
function mousePressed() {
	mDown = true
}

/**
 * When mouse is released
 */
function mouseReleased() {
	mDown = false

	let x = floor(mouseX / unitLength)
	let y = floor(mouseY / unitLength)

	currentBoard[x][y] = 1
}
