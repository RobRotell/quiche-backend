import ExpenseModel from '../models/Expense'
import { DbClient } from './DbClient'
import { GetExpensesQueryArgs } from '../arguments/GetExpensesQueryArgs'
import { GetExpensesQuery } from '../queries/GetExpensesQuery'
import { CreateExpenseQueryArgs } from '../arguments/CreateExpenseQueryArgs'
import { CreateExpenseQuery } from '../queries/CreateExpenseQuery'
import { Vendors } from './Vendors'
import { Categories } from './Categories'
import { PayTypes } from './PayTypes'


export class Expenses {

	/**
	 * Get all expenses, sorted descending by date
	 *
	 * @throws {Error} Argument isn't a GetExpensesQueryArgs instance
	 * @throws {Error} Query args has errors
	 *
	 * @param {GetExpensesQueryArgs} queryArgs
	 * @return {Array}
	 */
	static async getExpenses( queryArgs ) {
		if ( !( queryArgs instanceof GetExpensesQueryArgs ) ) {
			throw new Error( 'Argument must be an instance of GetExpensesQueryArgs class.' )
		}

		if ( queryArgs.hasErrors() ) {
			throw new Error( 'Argument has errors and cannot be used to query expenses.' )
		}

		// build query from args
		const queryObj = new GetExpensesQuery( queryArgs )

		// connection to DB through Prisma
		const client = DbClient.getClient()

		const expenses = await client.expense.findMany( queryObj.getQuery() )

		return expenses.map( expense => new ExpenseModel( expense ).package() )
	}


	/**
	 * Create expense
	 *
	 * @throws {Error} Argument isn't a CreateExpenseQueryArgs instance
	 * @throws {Error} Query args has errors
	 *
	 * @param {CreateExpenseQueryArgs} queryArgs
	 * @return {Object}
	 */
	static async createExpense( queryArgs ) {
		if ( !( queryArgs instanceof CreateExpenseQueryArgs ) ) {
			throw new Error( 'Argument must be an instance of CreateExpenseQueryArgs class.' )
		}

		if ( queryArgs.hasErrors() ) {
			throw new Error( 'Argument has errors and cannot be used to create an expense.' )
		}

		// build query for Prisma from args
		const queryObj = new CreateExpenseQuery( queryArgs )

		// connection to DB through Prisma
		const client = DbClient.getClient()

		const expense = await client.expense.create( queryObj.getQuery() )

		// get term objects to help create expense model
		expense.vendor = await Vendors.getById( expense.vendorId )
		expense.category = await Categories.getById( expense.categoryId )
		expense.payType = await PayTypes.getById( expense.payTypeId )

		return new ExpenseModel( expense ).package()
	}

}
