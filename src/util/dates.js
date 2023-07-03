import dayjs from 'dayjs'
// import dayjsFormat from 'dayjs/plugin/advancedFormat'



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


/**
 * Ensure that date is in YYYY-MM-DD format
 *
 * @param {string} dateRaw
 * @return {bool} True, if date in valid format; otherwise, false
 */
// eslint-disable-next-line arrow-body-style
const validateDateFormat = dateRaw => {
	return dateRaw === dayjs( dateRaw ).format( 'YYYY-MM-DD' )
}


/**
 * Ensure start date is before (or equal to) end date
 *
 * @param {string} startDate
 * @param {string} endDate
 * @return {bool} True, if start date is before (or equal to) end date; otherwise, false
 */
const validateStartDateBeforeEndDate = ( startDate, endDate ) => {
	if ( !validateDateFormat( startDate ) || !validateDateFormat( endDate ) ) {
		return false
	}

	const startTime = dayjs( startDate ).unix()
	const endTime = dayjs( endDate ).unix()

	return startTime <= endTime
}


export {
	validateYear,
	validateMonth,
	validateDateFormat,
	validateStartDateBeforeEndDate,
}
