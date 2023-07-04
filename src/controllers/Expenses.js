import ExpenseModel from '../models/Expense'
import { DbClient } from './DbClient'
import { GetExpensesQueryArgs } from '../arguments/GetExpensesQueryArgs'
import { GetExpensesQuery } from '../queries/GetExpensesQuery'


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
		if ( !( queryArgs instanceof GetExpensesQueryArgs ) ) {
			throw new Error( 'Argument must be an instance of GetExpensesQuery class.' )
		}

		if ( queryArgs.getErrors().length ) {
			throw new Error( 'Argument has errors and cannot be used to query expenses.' )
		}

		// build query from args
		const queryObj = new GetExpensesQuery( queryArgs )

		// connection to DB through Prisma
		const client = DbClient.getClient()

		const expenses = await client.expense.findMany( queryObj.getQuery() )

		return expenses.map( expense => new ExpenseModel( expense ).package() )
	}

}
