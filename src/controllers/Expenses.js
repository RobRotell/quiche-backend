import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()


// exclude vendorId, categoryId, payTypeId
const baseQueryArgs = {
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
	orderBy: [
		{
			date: 'desc',
		},
	],
}


class Expenses {

	/**
	 * Get all expenses, sorted descending by date
	 *
	 * @return {Promise} resolves to array of expenses
	 */
	static getExpenses() {
		return prisma.expense.findMany( baseQueryArgs )
	}


	/**
	 * Get all expenses, sorted descending by date
	 *
	 * @param {Integer} id
	 * @return {Promise} resolves to object of expense (or null if no matches)
	 */
	static getExpenseById( id ) {
		baseQueryArgs.where = {
			id,
		}

		return prisma.expense.findFirst( baseQueryArgs )
	}


	/**
	 * Get all expenses for a given year, sorted descending by date
	 *
	 * @param {Integer} year
	 * @param {Object} filters Vendor, category, and pay type IDs
	 *
	 * @return {Promise} resolves to array of expenses
	 */
	static getExpensesByYear( year, filters ) {
		baseQueryArgs.where = {
			year,
		}

		return prisma.expense.findMany( baseQueryArgs )
	}


	/**
	 * Get all expenses for a given month in a given year, sorted descending by date
	 *
	 * @param {Integer} year
	 * @param {Integer} month
	 *
	 * @return {Promise} resolves to array of expenses
	 */
	static getExpensesByYearAndMonth( year, month ) {
		baseQueryArgs.where = {
			year,
			month,
		}

		return prisma.expense.findMany( baseQueryArgs )
	}

}


export default Expenses
