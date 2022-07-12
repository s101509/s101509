async function clientSideGetMemo() {
	const res = await fetch('http://192.168.80.84:8000/getMemo')
	const memos = await res.json()

	memos.reverse()

	document.querySelector('main').innerHTML = ''

	let total = memos.length - 1
	let i = 0
	for (const memo of memos) {
		if (isAdmin) {
			document.querySelector('main').innerHTML +=
				'<div class="memo">' +
				memo.content +
				'<button data-id="' +
				(total - i) +
				'">刪除</button></div>'
		} else {
			document.querySelector('main').innerHTML +=
				'<div class="memo">' + memo.content + '</div>'
		}

		i++
	}

	// 呢個位先至有曬啲 memos

	const buttons = document.querySelectorAll('main button')
	for (const button of buttons) {
		button.addEventListener('click', async function () {
			await fetch('http://192.168.80.84:8000/deleteMemo', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: 'memoId=' + button.dataset.id // key1=value&key2=value --> {key1: 'value', key2: 'value'}
			})

			clientSideGetMemo()
		})
	}

	console.log(memos)
}
clientSideGetMemo()
