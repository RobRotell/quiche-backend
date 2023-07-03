import { Categories } from './Categories'
import ExpenseModel from '../models/Expense'
import { PayTypes } from './PayTypes'
import { Vendors } from './Vendors'
import { DbClient } from './DbClient'
import { ExpenseQueryArgs } from '../models/ExpenseQueryArgs'


export class Expenses {

	/**
	 * Get all expenses, sorted descending by date
	 *
	 * @throws {Error} Argument isn't a QueryArgument instance
	 * @throws {Error} QueryArgument has errors
	 *
	 * @param {QueryArguments} queryArgs
	 * @return {Array}
	 */
	static async getExpenses( queryArgs ) {
		if ( !( queryArgs instanceof ExpenseQueryArgs ) ) {
			throw new Error( 'Argument must be an instance of ExpenseQueryArgs class.' )
		}

		if ( queryArgs.getErrors().length ) {
			throw new Error( 'Argument has errors and cannot be used to query expenses.' )
		}

		const query = this.buildDbQuery( queryArgs )
		const client = DbClient.getClient()
		const expenses = await client.expense.findMany( query )

		return expenses.map( expense => new ExpenseModel( expense ).package() )
	}


	/**
	 * Build Prisma-compatible query object from query args
	 *
	 * @param {Object} queryArgs
	 * @return {Object}
	 */
	static buildDbQuery( queryArgs ) {
		const query = {
			select: {
				id: true,
				year: true,
				month: true,
				date: true,
				description: true,
				amount: true,
				vendor: true,
				category: true,
				payType: true,
			},
			where: {},
			orderBy: [
				{
					date: 'desc',
				},
				{
					id: 'desc',
				},
			],
		}

		if ( queryArgs.id ) {
			query.where.id = queryArgs.id
		}

		if ( queryArgs.year ) {
			query.where.year = queryArgs.year
		}

		if ( queryArgs.month ) {
			query.where.month = queryArgs.month
		}

		if ( queryArgs.date ) {
			query.where.date = queryArgs.date
		}

		if ( queryArgs.startDate && queryArgs.endDate ) {
			query.where.date = {
				lte: queryArgs.endDate,
				gte: queryArgs.startDate,
			}
		}

		return query
	}


	/**
	 * Get all expenses, sorted descending by date
	 *
	 * @param {int} id
	 * @return {Object} Object with expense data if match; otherwise, null
	 */
	static async getExpenseById( id ) {
		const queryArgs = structuredClone( baseQueryArgs )

		queryArgs.where = {
			id,
		}

		const expense = await prisma.expense.findFirst( queryArgs )

		return !expense ? null : new ExpenseModel( expense ).package()
	}


	/**
	 * Get all expenses for a given year, sorted descending by date
	 *
	 * @param {int} year
	 * @param {Object} filters Vendor, category, and pay type IDs
	 *
	 * @return {Promise} resolves to array of expenses
	 */
	static async getExpensesByYear( year, filters ) {
		baseQueryArgs.where = {
			year,
		}

		return prisma.expense.findMany( baseQueryArgs )
	}


	/**
	 * Get all expenses for a given month in a given year, sorted descending by date
	 *
	 * @param {int} year
	 * @param {int} month
	 *
	 * @return {Promise} resolves to array of expenses
	 */
	static async getExpensesByYearAndMonth( year, month ) {
		baseQueryArgs.where = {
			year,
			month,
		}

		return prisma.expense.findMany( baseQueryArgs )
	}


	/**
	 * Validate args to be used in querying expenses
	 *
	 * @param {Object} args
	 * @return {true|Array} True, if valid args. Otherwise, array of error messages
	 */
	static async validateArgs( args ) {
		const errors = []

		// eslint-disable-next-line object-curly-newline
		const { year, month, vendorId, categoryId, paytypeId } = args

		if ( year ) {
			if ( !validateYear( year ) ) {
				errors.push( 'Year must be a numerical value between 2010 and 9999.' )
			}
		}

		if ( month ) {
			if ( !validateMonth( month ) ) {
				errors.push( 'Month must be a numerical value between 1 and 12.' )
			}
		}

		// verify vendor value is a vendor ID
		if ( vendorId ) {
			const vendor = await Vendors.validateId( vendorId )

			if ( !vendor ) {
				errors.push( 'Vendor argument must be a valid vendor ID.' )
			}
		}

		// verify category value is a category ID
		if ( categoryId ) {
			const category = await Categories.validateId( categoryId )

			if ( !category ) {
				errors.push( 'Category argument must be a valid category ID.' )
			}
		}

		// verify pay type value is a pay type ID
		if ( paytypeId ) {
			const payType = await PayTypes.validateId( paytypeId )

			if ( !payType ) {
				errors.push( 'Pay type argument must be a valid pay type ID.' )
			}
		}

		return errors.length ? errors : true
	}

}
