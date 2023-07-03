import { DbClient } from './DbClient'


export class Taxonomy {


	static schemaName = null

	static dbClient = null


	/**
	 * Get Prisma client
	 *
	 * @return {Object} Prisma client
	 */
	static getDbClient() {
		if ( null === this.dbClient ) {
			this.dbClient = DbClient.getClient()
		}

		return this.dbClient
	}


	/**
	 * Get all terms, sorted ascending by ID
	 *
	 * @return {Promise<array>} resolves to array of terms
	 */
	static getAll() {
		const client = this.getDbClient()

		return client[this.schemaName].findMany({
			orderBy: [
				{
					id: 'asc',
				},
			],
		})
	}


	/**
	 * Validate that argument is a valid term ID
	 *
	 * @param {mixed} arg
	 * @return {int|false} Term ID, if valid; otherwise, false
	 */
	static async validateId( arg ) {
		const argInt = parseInt( arg, 10 )

		if ( Number.isNaN( argInt ) ) {
			return false
		}

		const client = this.getDbClient()

		const match = await client[this.schemaName].findFirst({
			where: {
				id: argInt,
			},
		})

		return match ? argInt : false
	}


	/**
	 * Get term by name
	 *
	 * @param {string} arg
	 * @return {Object} Object with id/name if match; otherwise, false
	 */
	static async getByName( arg ) {
		if ( 'string' !== typeof arg ) {
			return false
		}

		const client = this.getDbClient()

		const match = await client[this.schemaName].findFirst({
			where: {
				name: arg,
			},
		})

		return match || false
	}


	/**
	 * Create new term
	 *
	 * @throws {Error} Invalid name (e.g. not a string)
	 *
	 * @param {string} name
	 * @return {Object} Object with id/name
	 */
	static async create( name ) {
		if ( 'string' !== typeof name ) {
			throw new Error( 'Term name must be a string.' )
		}

		// check that a term doesn't already exist for name
		const match = await this.getByName( name )

		if ( match ) {
			return match
		}

		const client = this.getDbClient()

		// will return an id/name object
		const payType = await client[this.schemaName].create({
			data: {
				name,
			},
		})

		return payType
	}


	/**
	 * Delete term by ID
	 *
	 * @throws {Error} Invalid ID (e.g. not an integer)
	 *
	 * @param {int} id
	 * @return {bool} Always true
	 */
	static async deleteById( id ) {
		if ( Number.isNaN( id ) ) {
			return new Error( 'Term ID must be an integer.' )
		}

		const client = this.getDbClient()

		/**
		 * Using deleteMany vs delete to avoid "Record to delete does not exist" errors (at least until Prisma comes
		 * out with a "delete if exists" option)
		 */
		await client[this.schemaName].deleteMany({
			where: {
				id,
			},
		})

		return true
	}

}


export default Taxonomy
