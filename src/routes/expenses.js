import express from 'express'
import { Expenses } from '../controllers/Expenses'
import { ErrorResponseBody } from '../models/ErrorResponse'
import { ExpenseQueryArgs } from '../models/ExpenseQueryArgs'


const router = express.Router()


// get all expenses
// todo -- for testing only; delete before going into production
router.get( '/', async ( req, res ) => {
	const { query } = req
	const queryArgs = new ExpenseQueryArgs()

	// extract vendors, categories, and pay types (if present) from query string
	await queryArgs.setTermsFromQuery( query )

	if ( queryArgs.hasErrors() ) {
		return res.status( 400 ).json( new ErrorResponseBody( queryArgs.getErrors() ) )
	}

	const expenses = await Expenses.getExpenses( queryArgs )

	return res.json({ expenses })
})


// get expense by ID
router.get( '/:id', async ( req, res ) => {
	const { id } = req.params
	const queryArgs = new ExpenseQueryArgs({ id })

	if ( queryArgs.hasErrors() ) {
		return res.status( 400 ).json( new ErrorResponseBody( queryArgs.getErrors() ) )
	}

	const expense = await Expenses.getExpenses( queryArgs )

	return res.json({ expense })
})


// get expenses by year
router.get( '/year/:year', async ( req, res ) => {
	const { params, query } = req
	const { year } = params

	const queryArgs = new ExpenseQueryArgs({ year })

	// extract vendors, categories, and pay types (if present) from query string
	await queryArgs.setTermsFromQuery( query )

	if ( queryArgs.hasErrors() ) {
		return res.status( 400 ).json( new ErrorResponseBody( queryArgs.getErrors() ) )
	}

	const expenses = await Expenses.getExpenses( queryArgs )

	return res.json({ expenses })
})


// get expenses by year and month
router.get( '/year/:year/month/:month', async ( req, res ) => {
	const { params, query } = req
	const { year, month } = params

	const queryArgs = new ExpenseQueryArgs({ year, month })

	// extract vendors, categories, and pay types (if present) from query string
	await queryArgs.setTermsFromQuery( query )

	if ( queryArgs.hasErrors() ) {
		return res.status( 400 ).json( new ErrorResponseBody( queryArgs.getErrors() ) )
	}

	const expenses = await Expenses.getExpenses( queryArgs )

	return res.json({ expenses })
})


// get expenses for a specific date
router.get( '/date/:date', async ( req, res ) => {
	const { params, query } = req
	const { date } = params

	const queryArgs = new ExpenseQueryArgs({ date })

	// extract vendors, categories, and pay types (if present) from query string
	await queryArgs.setTermsFromQuery( query )

	if ( queryArgs.hasErrors() ) {
		return res.status( 400 ).json( new ErrorResponseBody( queryArgs.getErrors() ) )
	}

	const expenses = await Expenses.getExpenses( queryArgs )

	return res.json({ expenses })
})


// get expenses between start and end date
router.get( '/start/:start/end/:end', async ( req, res ) => {
	const { params, query } = req
	const { start: startDate, end: endDate } = params

	const queryArgs = new ExpenseQueryArgs({ startDate, endDate })

	// extract vendors, categories, and pay types (if present) from query string
	await queryArgs.setTermsFromQuery( query )

	if ( queryArgs.hasErrors() ) {
		return res.status( 400 ).json( new ErrorResponseBody( queryArgs.getErrors() ) )
	}

	const expenses = await Expenses.getExpenses( queryArgs )

	return res.json({ expenses })
})


export default router
