/**
 * Simple function to check if a value is numeric, including numeric strings
 *
 * @see https://stackoverflow.com/a/1421988/10901581
 *
 * @param {mixed} arg Number or string to check
 * @return {bool} True, if numeric
 */
const isNumeric = arg => {

	// avoid issues with null
	if ( !arg ) {
		return false
	}

	return !Number.isNaN( parseFloat( arg ) ) && !Number.isNaN( arg - 0 )
}


export {
	isNumeric,
}
