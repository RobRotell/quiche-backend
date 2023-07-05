import express from 'express'
import { Expenses } from '../controllers/Expenses'
import { ErrorResponseBody } from '../models/ErrorResponse'
import { GetExpensesQueryArgs } from '../arguments/GetExpensesQueryArgs'
import { CreateExpenseQueryArgs } from '../arguments/CreateExpenseQueryArgs'
import { ResponseBody } from '../models/ResponseBody'


const router = express.Router()


// get all expenses
// todo -- for testing only; delete before going into production
router.get( '/', async ( req, res ) => {
	const { query } = req
	const queryArgs = new GetExpensesQueryArgs()

	queryArgs.parseArgs()

	// extract vendors, categories, and pay types (if present) from query string
	await queryArgs.setTermsFromQuery( query )

	if ( queryArgs.hasErrors() ) {
		return res.status( 400 ).json( new ErrorResponseBody( queryArgs.getErrors() ) )
	}

	const expenses = await Expenses.getExpenses( queryArgs )

	return res.json( new ResponseBody({ expenses }) )
})


// get expense by ID
router.get( '/:id', async ( req, res ) => {
	const { id } = req.params
	const queryArgs = new GetExpensesQueryArgs({ id })

	queryArgs.parseArgs()

	if ( queryArgs.hasErrors() ) {
		return res.status( 400 ).json( new ErrorResponseBody( queryArgs.getErrors() ) )
	}

	const expense = await Expenses.getExpenses( queryArgs )

	return res.json( new ResponseBody({ expense }) )
})


// get expenses by year
router.get( '/year/:year', async ( req, res ) => {
	const { params, query } = req
	const { year } = params

	const queryArgs = new GetExpensesQueryArgs({ year })

	queryArgs.parseArgs()

	// extract vendors, categories, and pay types (if present) from query string
	await queryArgs.setTermsFromQuery( query )

	if ( queryArgs.hasErrors() ) {
		return res.status( 400 ).json( new ErrorResponseBody( queryArgs.getErrors() ) )
	}

	const expenses = await Expenses.getExpenses( queryArgs )

	return res.json( new ResponseBody({ expenses }) )
})


// get expenses by year and month
router.get( '/year/:year/month/:month', async ( req, res ) => {
	const { params, query } = req
	const { year, month } = params

	const queryArgs = new GetExpensesQueryArgs({ year, month })

	await queryArgs.parseArgs()

	// extract vendors, categories, and pay types (if present) from query string
	await queryArgs.setTermsFromQuery( query )

	if ( queryArgs.hasErrors() ) {
		return res.status( 400 ).json( new ErrorResponseBody( queryArgs.getErrors() ) )
	}

	const expenses = await Expenses.getExpenses( queryArgs )

	return res.json( new ResponseBody({ expenses }) )
})


// get expenses for a specific date
router.get( '/date/:date', async ( req, res ) => {
	const { params, query } = req
	const { date } = params

	const queryArgs = new GetExpensesQueryArgs({ date })

	queryArgs.parseArgs()

	// extract vendors, categories, and pay types (if present) from query string
	await queryArgs.setTermsFromQuery( query )

	if ( queryArgs.hasErrors() ) {
		return res.status( 400 ).json( new ErrorResponseBody( queryArgs.getErrors() ) )
	}

	const expenses = await Expenses.getExpenses( queryArgs )

	return res.json( new ResponseBody({ expenses }) )
})


// get expenses between start and end date
router.get( '/start/:start/end/:end', async ( req, res ) => {
	const { params, query } = req
	const { start: startDate, end: endDate } = params

	const queryArgs = new GetExpensesQueryArgs({ startDate, endDate })

	await queryArgs.parseArgs()

	// extract vendors, categories, and pay types (if present) from query string
	await queryArgs.setTermsFromQuery( query )

	if ( queryArgs.hasErrors() ) {
		return res.status( 400 ).json( new ErrorResponseBody( queryArgs.getErrors() ) )
	}

	const expenses = await Expenses.getExpenses( queryArgs )

	return res.json({ expenses })
})


// add new expense
router.post( '/', async ( req, res ) => {
	const { body } = req
	const queryArgs = new CreateExpenseQueryArgs( body )

	await queryArgs.parseArgs()

	if ( queryArgs.hasErrors() ) {
		return res.status( 400 ).json( new ErrorResponseBody( queryArgs.getErrors() ) )
	}

	const expense = await Expenses.createExpense( queryArgs )

	return res.json( new ResponseBody({
		added: true,
		expense,
	}) )
})


// update expense


// delete expense


export default router
