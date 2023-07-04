import dayjs from 'dayjs'
// import dayjsFormat from 'dayjs/plugin/advancedFormat'


/**
 * Validate value is a number and between 2010 (when Rob first started tracking expenses) and 9999 (when Rob has
 * certainly stopped tracking expenses)
 *
 * @param {mixed} arg
 * @return {Integer|false} Integer, if valid year; otherwise, false
 */
const sanitizeYear = arg => {
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
const sanitizeMonth = arg => {
	const month = parseInt( arg, 10 )

	if ( !Number.isNaN( month ) && 1 <= month && 12 >= month ) {
		return month
	}

	return false
}


/**
 * Ensure that date is in YYYY-MM-DD format
 *
 * @param {string} dateRaw
 * @return {string} Date, if in valid format; otherwise, false
 */
const sanitizeDateFormat = dateRaw => {
	const dateFormatted = dayjs( dateRaw ).format( 'YYYY-MM-DD' )

	return dateRaw === dateFormatted ? dateFormatted : false
}


/**
 * Ensure start date is before end date
 *
 * @param {string} startDate
 * @param {string} endDate
 * @return {bool} True, if start date is before end date; otherwise, false
 */
const validateStartDateBeforeEndDate = ( startDate, endDate ) => {

	// are values non-null and strings?
	if ( !startDate || 'string' !== typeof startDate || !endDate || 'string' !== typeof endDate ) {
		return false
	}

	// are values in correct format?
	if ( !sanitizeDateFormat( startDate ) || !sanitizeDateFormat( endDate ) ) {
		return false
	}

	const startTime = dayjs( startDate ).unix()
	const endTime = dayjs( endDate ).unix()

	return startTime < endTime
}


export {
	sanitizeYear,
	sanitizeMonth,
	sanitizeDateFormat,
	validateStartDateBeforeEndDate,
}
