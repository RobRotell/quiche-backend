import express from 'express'
import Expenses from '../controllers/Expenses'
import { validateDateFormat, validateStartDateBeforeEndDate, validateYear } from '../util/dates'
import { ErrorResponseBody } from '../models/ErrorResponse'


const router = express.Router()


// get all expenses
// todo -- for testing only; should be disabled before launch
router.get( '/', async ( req, res ) => {
	const expenses = await Expenses.getExpenses()

	return res.json({ expenses })
})


// get expense by ID
router.get( '/:id', async ( req, res ) => {
	let { id } = req.params

	id = parseInt( id, 10 )

	if ( Number.isNaN( id ) ) {
		return res.status( 400 ).json( new ErrorResponseBody( 'ID must be a numerical value.' ) )
	}

	const expense = await Expenses.getExpenses({ id })

	return res.json({ expense })
})


// get expenses by year
router.get( '/year/:year', async ( req, res ) => {
	const { params, query } = req

	const { year } = params

	// bare-minimum -- requires at least a year
	// todo refactor as current approach allows non-numerical string
	if ( !year ) {
		return res.status( 400 ).json(
			new ErrorResponseBody(
				'This endpoint requires a numerical year between 2014 and 9999 to query expenses.',
			),
		)
	}

	// grab filter values
	const { vendor, category, paytype } = query

	const args = {
		year,
		vendorId: parseInt( vendor, 10 ),
		categoryId: parseInt( category, 10 ),
		paytypeId: parseInt( paytype, 10 ),
	}

	// if invalid, an array of error messages is returned
	const isValid = await Expenses.validateExpenseArgs( args )

	if ( Array.isArray( isValid ) && isValid.length ) {
		const argErrors = isValid

		return res.status( 400 ).json( new ErrorResponseBody( argErrors ) )
	}

	const expenses = await Expenses.getExpenses( args )

	return res.json({ expenses })
})


// get expenses by year and month
router.get( '/year/:year/month/:month', async ( req, res ) => {
	const { params, query } = req

	const { year, month } = params

	const baseArgErrors = []

	// endpoint requires a year
	// todo refactor as current approach allows non-numerical string
	if ( !year ) {
		baseArgErrors.push( 'This endpoint requires a year to query expenses.' )
	}

	// endpoint requires a month
	// todo -- refactor as current approach allows non-numerical strings
	if ( !month ) {
		baseArgErrors.push( 'This endpoint requires a month to query expenses.' )
	}

	if ( baseArgErrors.length ) {
		return res.status( 400 ).json( new ErrorResponseBody( baseArgErrors ) )
	}

	// grab filter values
	const { vendor, category, paytype } = query

	const args = {
		year,
		month,
		vendorId: parseInt( vendor, 10 ),
		categoryId: parseInt( category, 10 ),
		paytypeId: parseInt( paytype, 10 ),
	}

	// if invalid, an array of error messages is returned
	const isValid = await Expenses.validateArgs( args )

	if ( Array.isArray( isValid ) && isValid.length ) {
		const argErrors = isValid

		return res.status( 400 ).json({
			error: true,
			data: argErrors,
		})
	}

	const expenses = await Expenses.getExpenses( args )

	return res.json({ expenses })
})


// get expenses between start and end date
router.get( '/start/:start/end/:end', async ( req, res ) => {
	const { params, query } = req
	const { start, end } = params

	const argErrors = []

	if ( !validateDateFormat( start ) ) {
		argErrors.push( 'Start date must be in a "YYYY-MM-DD" format.' )
	}

	if ( !validateDateFormat( end ) ) {
		argErrors.push( 'End date must be in a "YYYY-MM-DD" format.' )
	}

	if ( !validateStartDateBeforeEndDate( start, end ) ) {
		argErrors.push( 'Start date must be before or equal to end date.' )
	}

	if ( argErrors.length ) {
		return res.status( 400 ).json( new ErrorResponseBody( argErrors, 400 ) )
	}

	return res.status( 200 ).json({})
})


export default router
