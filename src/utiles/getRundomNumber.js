function randomNum(min, max) {
	return Math.floor(Math.random() * (max + 1 - min)) + min
}

function random(max = 2) {
	return randomNum(0, max)
}

export { randomNum, random }