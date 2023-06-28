import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()


const baseQueryArgs = {
	select: {
		id: true,
		name: true,
	},
	orderBy: [
		{
			id: 'asc',
		},
	],
}


class PayTypes {

	/**
	 * Get all pay types, sorted ascending by ID
	 *
	 * @return {Promise} resolves to array of pay types
	 */
	static getPayTypes() {
		return prisma.payType.findMany( baseQueryArgs )
	}


	/**
	 * Validate that argument is a valid pay type ID
	 *
	 * @param {mixed} arg
	 * @return {Integer|false} Pay type ID, if valid; otherwise, false
	 */
	static async validateId( arg ) {
		const argInt = parseInt( arg, 10 )

		if ( Number.isNaN( argInt ) ) {
			return false
		}

		const match = await prisma.payType.findFirst({
			where: {
				id: argInt,
			},
		})

		return match ? argInt : false
	}

}


export default PayTypes
