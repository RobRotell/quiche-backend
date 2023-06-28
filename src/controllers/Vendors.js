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


class Vendors {

	/**
	 * Get all vendors, sorted ascending by ID
	 *
	 * @return {Promise} resolves to array of vendors
	 */
	static getVendors() {
		return prisma.vendor.findMany( baseQueryArgs )
	}


	/**
	 * Validate that argument is a valid vendor ID
	 *
	 * @param {mixed} arg
	 * @return {Integer|false} Vendor ID, if valid; otherwise, false
	 */
	static async validateId( arg ) {
		const argInt = parseInt( arg, 10 )

		if ( Number.isNaN( argInt ) ) {
			return false
		}

		const match = await prisma.vendor.findFirst({
			where: {
				id: argInt,
			},
		})

		return match ? argInt : false
	}

}


export default Vendors
