import express from 'express'
import Expenses from '../controllers/Expenses'
import { validateMonth, validateYear } from '../util/dates'
import Vendors from '../controllers/Vendors'
import Categories from '../controllers/Categories'
import PayTypes from '../controllers/PayTypes'


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
		return res.status( 400 ).json({
			error: true,
			data: 'ID must be a numerical value.',
		})
	}

	const expense = await Expenses.getExpenseById( id )

	return res.json({ expense })
})


// get expenses by year
router.get( '/year/:year', async ( req, res ) => {
	const { params, query } = req

	const errors = []

	// ensure valid year
	let { year } = params

	year = validateYear( year )

	if ( !year ) {
		errors.push( 'Year must be a numerical value between 2010 and 9999.' )
	}

	// check for pay type, category, and vendor arguments
	let { vendor, category, paytype } = query

	// ensure vendor arg is a valid vendor ID
	if ( vendor ) {
		vendor = await Vendors.validateId( vendor )

		if ( !vendor ) {
			errors.push( 'Vendor must be a valid vendor ID.' )
		}
	}

	// ensure category arg is a valid category ID
	if ( category ) {
		category = await Categories.validateId( category )

		if ( !category ) {
			errors.push( 'Vendor must be a valid category ID.' )
		}
	}

	// ensure pay type arg is a valid pay type ID
	if ( paytype ) {
		paytype = await PayTypes.validateId( paytype )

		if ( !paytype ) {
			errors.push( 'Vendor must be a valid paytype ID.' )
		}
	}

	if ( errors.length ) {
		return res.status( 400 ).json({
			error: true,
			data: errors,
		})
	}

	const expenses = await Expenses.getExpensesByYear( year, {
		vendor, category, paytype,
	})

	return res.json({ expenses })
})


// get expenses by year and month
router.get( '/year/:year/month/:month', async ( req, res ) => {
	let { year, month } = req.params

	year = validateYear( year )
	month = validateMonth( month )

	const errors = []

	if ( !year ) {
		errors.push( 'Year must be a numerical value between 2010 and 9999.' )
	}

	if ( !month ) {
		errors.push( 'Month must be a numerical value between 1 and 12.' )
	}

	if ( errors.length ) {
		return res.status( 400 ).json({
			error: true,
			data: errors,
		})
	}

	const expenses = await Expenses.getExpensesByYearAndMonth( year, month )

	return res.json({ expenses })
})


export default router
