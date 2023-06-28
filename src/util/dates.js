/**
 * Validate value is a number and between 2010 (when Rob first started tracking expenses) and 9999 (when Rob has 
 * certainly stopped tracking expenses)
 *
 * @param {mixed} arg
 * @return {Integer|false} Integer, if valid year; otherwise, false
 */
const validateYear = arg => {
	const year = parseInt( arg, 10 )

	if ( !Number.isNaN( year ) && 2010 <= year && 9999 >= year ) {
		return year
	}

	return false
}


/**
 * Validate value is a month
 *
 * @param {mixed} arg
 * @return {Integer|false} Integer, if valid month; otherwise, false
 */
const validateMonth = arg => {
	const month = parseInt( arg, 10 )

	if ( !Number.isNaN( month ) && 1 <= month && 12 >= month ) {
		return month
	}

	return false
}


export {
	validateYear,
	validateMonth,
}
