// eslint-disable-next-line object-curly-newline
import { extractMonth, extractYear, sanitizeDateFormat, sanitizeMonth, sanitizeYear, validateStartDateBeforeEndDate } from '../util/dates'
import { isNumeric } from '../util/numbers'
import { Vendors } from '../controllers/Vendors'
import { Categories } from '../controllers/Categories'
import { PayTypes } from '../controllers/PayTypes'
import { QueryArgs } from './QueryArgs'
import { log } from 'console'


export class CreateExpensesQueryArgs extends QueryArgs {


	year = null

	month = null

	date = null

	vendorId = null

	categoryId = null

	payTypeId = null


	/**
	 * Create instance
	 *
	 * @param {Object} args Base query args
	 * @return {obj}
	 */
	async parseArgs() {
		let { date, amount } = this.args
		const { vendor, category, paytype } = this.args

		if ( !date ) {
			this.errors.push( 'Expense must have a date.' )
		} else {
			date = sanitizeDateFormat( date )

			if ( !date ) {
				this.errors.push( 'Date must be in a "YYYY-MM-DD" format.' )
			} else {
				this.date = date
				this.year = extractYear( this.date )
				this.month = extractMonth( this.date )
			}
		}

		if ( !amount ) {
			this.errors.push( 'Expense must have an amount.' )
		} else {
			// remove "$" if it exists
			if ( amount.startsWith( '$' ) ) {
				amount = amount.slice( 1 )
			}

			amount = parseFloat( amount )

			if ( Number.isNaN( amount ) ) {
				this.errors.push( 'Expense must be an integer or float.' )
			} else {
				this.amount = amount
			}
		}

		/**
		 * While vendors, categories, and pay types are *not* required in the DB (in case the term was deleted), we're
		 * requiring them to create entries
		 */

		if ( !vendor ) {
			this.errors.push( 'Expense must have a vendor.' )
		} else {
			// is it an ID?
			// eslint-disable-next-line no-lonely-if
			if ( isNumeric( vendor ) ) {
				const vendorId = parseInt( vendor, 10 )

				if ( !Vendors.validateId( vendorId ) ) {
					this.errors.push( 'Vendor ID does not match a vendor.' )
				} else {
					this.vendorId = vendorId
				}

			// otherwise, vendor name
			} else {
				const vendorMatch = await Vendors.getByName( vendor )

				// does vendor term already exist?
				if ( vendorMatch ) {
					this.vendorId = vendorMatch.id

				// otherwise, create new vendor term
				} else {
					const newVendor = await Vendors.create( vendor )

					this.vendorId = newVendor.id
				}
			}
		}

		if ( !category ) {
			this.errors.push( 'Expense must have a category.' )
		} else {
			// is it an ID?
			// eslint-disable-next-line no-lonely-if
			if ( isNumeric( category ) ) {
				const categoryId = parseInt( category, 10 )

				if ( !Categories.validateId( categoryId ) ) {
					this.errors.push( 'Category ID does not match a category.' )
				} else {
					this.categoryId = categoryId
				}

			// otherwise, category name
			} else {
				const categoryMatch = await Categories.getByName( category )

				// does category term already exist?
				if ( categoryMatch ) {
					this.categoryId = categoryMatch.id

				// otherwise, create new category term
				} else {
					const newCategory = await Categories.create( category )

					this.categoryId = newCategory.id
				}
			}
		}

		if ( !paytype ) {
			this.errors.push( 'Expense must have a pay type.' )
		} else {
			// is it an ID?
			// eslint-disable-next-line no-lonely-if
			if ( isNumeric( paytype ) ) {
				const payTypeId = parseInt( paytype, 10 )

				if ( !PayTypes.validateId( payTypeId ) ) {
					this.errors.push( 'Pay type ID does not match a paytype.' )
				} else {
					this.payTypeId = payTypeId
				}

			// otherwise, paytype name
			} else {
				const payTypeMatch = await PayTypes.getByName( paytype )

				// does paytype term already exist?
				if ( payTypeMatch ) {
					this.payTypeId = payTypeMatch.id

				// otherwise, create new paytype term
				} else {
					const newPayType = await PayTypes.create( paytype )

					this.payTypeId = newPayType.id
				}
			}
		}
	}

}
