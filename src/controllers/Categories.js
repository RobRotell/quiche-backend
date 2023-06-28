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


class Categories {

	/**
	 * Get all categories, sorted ascending by ID
	 *
	 * @return {Promise} resolves to array of categories
	 */
	static getCategories() {
		return prisma.category.findMany( baseQueryArgs )
	}


	/**
	 * Validate that argument is a valid category ID
	 *
	 * @param {mixed} arg
	 * @return {Integer|false} Category ID, if valid; otherwise, false
	 */
	static async validateId( arg ) {
		const argInt = parseInt( arg, 10 )

		if ( Number.isNaN( argInt ) ) {
			return false
		}

		const match = await prisma.category.findFirst({
			where: {
				id: argInt,
			},
		})

		return match ? argInt : false
	}

}


export default Categories
