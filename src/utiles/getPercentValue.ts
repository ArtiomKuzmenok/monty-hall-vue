const getPercentValue = (value: number): string => {
	let percents = Math.round(value * 100)

	if (isNaN(percents)) {
	  percents = 0
	}

	return percents + "%"
}

export { getPercentValue }