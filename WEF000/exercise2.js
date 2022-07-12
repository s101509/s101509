let leapYear = '1997'

if (leapYear % 4 == 0 && leapYear % 100 !== 0) {
	console.log('It is a leap year')
} else if (leapYear % 400 == 0) {
	console.log('It is a leap year')
} else {
	console.log('It is not a leap year')
}
