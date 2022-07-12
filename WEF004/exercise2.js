let slot = ['', '', '', '', '', '', '', '', '']
let boxes = document.querySelectorAll('.somebox')
let count = 0
let end = false
let turn = document.querySelector('.middle-container>h4')

for (let box of boxes) {
	box.addEventListener('click', function (e) {
		if (!end) {
			if (slot[e.target.slot] == '') {
				if (count % 2 == 0) {
					slot[e.target.slot] = 'X'
					e.target.innerHTML = `<img class="animate__animated animate__tada mx-auto my-auto" src="cross.png">`
					turn.innerHTML = `O turn`
				} else {
					slot[e.target.slot] = 'O'
					e.target.innerHTML = `<img class=" animate__animated animate__tada mx-auto my-auto" src="circle.png">`
					turn.innerHTML = `X turn`
				}

				if (
					(slot[0] == slot[1] &&
						slot[1] == slot[2] &&
						slot[2] != '') ||
					(slot[3] == slot[4] &&
						slot[4] == slot[5] &&
						slot[5] != '') ||
					(slot[6] == slot[7] &&
						slot[7] == slot[8] &&
						slot[8] != '') ||
					(slot[0] == slot[3] &&
						slot[3] == slot[6] &&
						slot[6] != '') ||
					(slot[1] == slot[4] &&
						slot[4] == slot[7] &&
						slot[7] != '') ||
					(slot[2] == slot[5] &&
						slot[5] == slot[8] &&
						slot[8] != '') ||
					(slot[0] == slot[4] &&
						slot[4] == slot[8] &&
						slot[8] != '') ||
					(slot[2] == slot[4] && slot[4] == slot[6] && slot[6] != '')
				) {
					if (count % 2 == 0) {
						setTimeout(function () {
							alert('X Win!')
						}, 200)
						end = true
					} else {
						setTimeout(function () {
							alert('O Win!')
						}, 200)
						end = true
					}
				} else if (count >= 8) {
					setTimeout(function () {
						alert("It's draw!")
					}, 200)
				}
				count++
			} else {
				setTimeout(function () {
					alert('This slot already selected')
				}, 200)
			}
		}
		console.log(slot)
	})
}

let restart = document.querySelector('.text')
restart.addEventListener('click', function (e) {
	restart.classList.toggle('animate__animated')
	restart.classList.toggle('animate__faster')
	restart.classList.toggle('animate__pulse')

	count = 0
	slot = ['', '', '', '', '', '', '', '', '']
	for (let box of boxes) {
		box.innerHTML = ''
	}
	end = false
	turn.innerHTML = `X turn`
})
