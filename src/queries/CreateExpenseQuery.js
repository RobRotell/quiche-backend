import { log } from 'console'
import { Query } from './Query'


export class CreateExpenseQuery extends Query {


	/**
	 * Create instance
	 *
	 * @param {Object} args
	 */
	constructor( args ) {
		super()

		// eslint-disable-next-line object-curly-newline
		const { date, year, month, amount, description, vendorId, categoryId, payTypeId } = args

		const query = {
			data: {
				date: new Date( date ).toISOString(),
				year,
				month,
				amount,
				description,
				vendorId,
				categoryId,
				payTypeId,
			},
		}

		this.query = query
	}

}
