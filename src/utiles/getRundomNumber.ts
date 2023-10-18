function randomNum(min: number, max: number): number {
	return Math.floor(Math.random() * (max + 1 - min)) + min
}

function random(max: number = 2): number {
	return randomNum(0, max)
}

export { randomNum, random }