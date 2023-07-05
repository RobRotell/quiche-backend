// eslint-disable-next-line object-curly-newline
import { sanitizeDateFormat, sanitizeMonth, sanitizeYear, validateStartDateBeforeEndDate } from '../util/dates'
import { isNumeric } from '../util/numbers'
import { Vendors } from '../controllers/Vendors'
import { Categories } from '../controllers/Categories'
import { PayTypes } from '../controllers/PayTypes'
import { QueryArgs } from './QueryArgs'


export class GetExpensesQueryArgs extends QueryArgs {


	id = null

	year = null

	month = null

	date = null

	startDate = null

	endDate = null

	vendorIds = []

	categoryIds = []

	payTypeIds = []


	/**
	 * Create instance
	 *
	 * @param {Object} args Base query args
	 * @return {obj}
	 */
	parseArgs() {

		console.log( this )

		// eslint-disable-next-line object-curly-newline
		let { id, year, month, date, startDate, endDate } = this.args

		if ( id ) {
			id = parseInt( id, 10 )

			if ( Number.isNaN( id ) ) {
				this.errors.push( 'Expense ID must be a numerical value.' )
			} else {
				this.id = id
			}
		}

		if ( year ) {
			year = sanitizeYear( year )

			if ( !year ) {
				this.errors.push( 'Year must be a numerical value between 2014 and 9999.' )
			} else {
				this.year = year
			}
		}

		if ( month ) {
			month = sanitizeMonth( month )

			if ( !month ) {
				this.errors.push( 'Month must be a numerical value between 1 and 12.' )
			} else {
				this.month = month
			}
		}

		if ( date ) {
			date = sanitizeDateFormat( date )

			if ( !date ) {
				this.errors.push( 'Date must be in a "YYYY-MM-DD" format.' )
			} else {
				this.date = date
			}
		}

		if ( startDate ) {
			startDate = sanitizeDateFormat( startDate )

			if ( !startDate ) {
				this.errors.push( 'Start date must be in a "YYYY-MM-DD" format.' )
			} else {
				this.startDate = startDate
			}
		}

		if ( endDate ) {
			endDate = sanitizeDateFormat( endDate )

			if ( !endDate ) {
				this.errors.push( 'End date must be in a "YYYY-MM-DD" format.' )
			} else {
				this.endDate = endDate
			}
		}

		// if query has start date and end date, check that start date is before end date
		if ( this.startDate || this.endDate ) {
			if ( !validateStartDateBeforeEndDate( this.startDate, this.endDate ) ) {
				this.errors.push( 'Start date must be before end date.' )

				this.startDate = null
				this.endDate = null
			}
		}
	}


	/**
	 * Set taxonomy terms (e.g. vendors, categories, pay types) from object
	 *
	 * @todo Refactor to be more easily readable/DRY
	 *
	 * @param {Object} terms
	 * @return {void}
	 */
	async setTermsFromQuery( terms ) {
		let { vendors, categories, paytypes } = terms

		if ( vendors ) {
			vendors = vendors.split( ',' )

			await Promise.all( vendors.map( async vendor => {

				// is value an ID?
				if ( isNumeric( vendor ) ) {
					const vendorId = parseInt( vendor, 10 )
					const isValidVendorId = await Vendors.validateId( vendorId )

					if ( isValidVendorId ) {
						this.vendorIds.push( vendorId )
					} else {
						this.errors.push( `Vendor ID: "${vendorId}" does not match any vendor.` )
					}

				// else, see if it's a string
				} else {
					const vendorObj = await Vendors.getByName( vendor )

					if ( vendorObj ) {
						this.vendorIds.push( vendorObj.id )
					} else {
						this.errors.push( `Vendor name: "${vendor}" does not match any vendor.` )
					}
				}
			}) )
		}

		if ( categories ) {
			categories = categories.split( ',' )

			await Promise.all( categories.map( async category => {

				// is value an ID?
				if ( isNumeric( category ) ) {
					const categoryId = parseInt( category, 10 )
					const isValidCategoryId = await Categories.validateId( categoryId )

					if ( isValidCategoryId ) {
						this.categoryIds.push( categoryId )
					} else {
						this.errors.push( `Category ID: "${categoryId}" does not match any category.` )
					}

				// else, see if it's a string
				} else {
					const vendorObj = await Categories.getByName( category )

					if ( vendorObj ) {
						this.categoryIds.push( vendorObj.id )
					} else {
						this.errors.push( `Category name: "${category}" does not match any category.` )
					}
				}
			}) )
		}

		if ( paytypes ) {
			paytypes = paytypes.split( ',' )

			await Promise.all( paytypes.map( async paytype => {

				// is value an ID?
				if ( isNumeric( paytype ) ) {
					const paytypeId = parseInt( paytype, 10 )
					const isValidPayTypeId = await PayTypes.validateId( paytypeId )

					if ( isValidPayTypeId ) {
						this.payTypeIds.push( paytypeId )
					} else {
						this.errors.push( `Pay type ID: "${paytypeId}" does not match any pay type.` )
					}

				// else, see if it's a string
				} else {
					const vendorObj = await PayTypes.getByName( paytype )

					if ( vendorObj ) {
						this.payTypeIds.push( vendorObj.id )
					} else {
						this.errors.push( `Pay type name: "${paytype}" does not match any pay type.` )
					}
				}
			}) )
		}
	}

}
