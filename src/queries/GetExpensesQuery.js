import { Query } from './Query'


export class GetExpensesQuery extends Query {


	/**
	 * Create instance
	 *
	 * @param {Object} args
	 */
	constructor( args ) {
		super()

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

		if ( args.id ) {
			query.where.id = args.id
		}

		if ( args.year ) {
			query.where.year = args.year
		}

		if ( args.month ) {
			query.where.month = args.month
		}

		if ( args.date ) {
			query.where.date = new Date( args.date ).toISOString()

		// don't mix exact date and start/end date queries
		} else if ( args.startDate && args.endDate ) {
			query.where.date = {
				lte: new Date( args.endDate ).toISOString(),
				gte: new Date( args.startDate ).toISOString(),
			}
		}

		// now, let's handle the complicated taxonomy structure
		const andStatement = []

		if ( args.vendorIds.length ) {

			// no need for OR statement if just one vendor ID
			if ( 1 === args.vendorIds.length ) {
				// eslint-disable-next-line prefer-destructuring
				query.where.vendorId = args.vendorIds[0]

			} else {
				andStatement.push({
					// eslint-disable-next-line arrow-body-style
					OR: args.vendorIds.map( vendorId => {
						return {
							OR: [
								{ vendorId },
							],
						}
					}),
				})
			}
		}

		if ( args.categoryIds.length ) {

			// no need for OR statement if just one category ID
			if ( 1 === args.categoryIds.length ) {
				// eslint-disable-next-line prefer-destructuring
				query.where.categoryId = args.categoryIds[0]

			} else {
				andStatement.push({
					// eslint-disable-next-line arrow-body-style
					OR: args.categoryIds.map( categoryId => {
						return {
							OR: [
								{ categoryId },
							],
						}
					}),
				})
			}
		}

		if ( args.payTypeIds.length ) {

			// no need for OR statement if just one pay type ID
			if ( 1 === args.payTypeIds.length ) {
				// eslint-disable-next-line prefer-destructuring
				query.where.payTypeId = args.payTypeIds[0]

			} else {
				andStatement.push({
					// eslint-disable-next-line arrow-body-style
					OR: args.payTypeIds.map( payTypeId => {
						return {
							OR: [
								{ payTypeId },
							],
						}
					}),
				})
			}
		}

		if ( andStatement.length ) {
			query.where.AND = andStatement
		}

		this.query = query
	}

}
