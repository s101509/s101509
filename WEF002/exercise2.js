const cards = [
	['Spade', 'A'],
	['Diamond', 'J'],
	['Club', '3'],
	['Heart', '6'],
	['Spade', 'K'],
	['Club', '2'],
	['Heart', 'Q'],
	['Spade', '6'],
	['Heart', 'J'],
	['Spade', '10'],
	['Club', '4'],
	['Diamond', 'Q'],
	['Diamond', '3'],
	['Heart', '4'],
	['Club', '7']
]

{
	const card = []

	let count = cards.reduce((acc, elem) => {
		if (elem[0] == 'Spade') {
			acc++
		}
		return acc
	}, 0)

	console.log(count)
}

{
	const suits = ['Diamond', 'Club', 'Heart', 'Spade']
	const ranks = [
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'10',
		'J',
		'Q',
		'K',
		'A'
	]

	suits.sort()
	ranks.sort()

	let result = cards.filter((elem) => {
		if (ranks[elem[1]] < ranks['3']) {
			return false
		} else if (ranks[elem[1]] === ranks['3']) {
			if (suits[elem[0]] < suits['Club']) {
				return false
			} else {
				return true
			}
		} else {
			return true
		}
	})

	console.log(result)
}

{
	const suit = { Diamond: 1, Club: 2, Heart: 3, Spade: 4 }
	const rank = {
		2: 1,
		3: 2,
		4: 3,
		5: 4,
		6: 5,
		7: 6,
		8: 7,
		9: 8,
		10: 9,
		J: 10,
		Q: 11,
		K: 12,
		A: 13
	}

	let count = cards.filter((elem) => {
		if (
			rank[elem[1]] >= rank['J'] &&
			(suit[elem[0]] == suit['Diamond'] || suit[elem[0]] == suit['Heart'])
		) {
			return true
		} else {
			return false
		}
	})

	console.log(count)
}

{
	const result = cards.map(function (elem) {
		if (elem[1] == 'A') {
			return [elem[0], '2']
		} else {
			return elem
		}
	})

	console.log(result)
}
