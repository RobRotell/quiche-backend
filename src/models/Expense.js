import dayjs from 'dayjs'
import { prettifyPrice } from '../util/prices'


export default class Expense {


	id = null // number

	year = null // YYYY

	month = null // MM

	day = null // DD

	date = null // YYYY-MM-DD

	description = null // string

	amount = null // number

	price = null // string ("pretty" version of amount)

	vendor = null // object containing vendor ID and vendor name

	category = null // object containing category ID and category name

	payType = null // object containing pay type ID and pay type name


	/**
	 * Creates instance
	 *
	 * @param {Object} data
	 */
	constructor( data ) {
		// eslint-disable-next-line object-curly-newline
		const { id, date, description, amount, vendor, category, payType } = data

		const dateObj = dayjs( date )

		this.id = id

		this.year = dateObj.format( 'YYYY' )
		this.month = dateObj.format( 'MM' )
		this.day = dateObj.format( 'DD' )

		this.date = dateObj.format( 'YYYY-MM-DD' )

		this.description = description

		this.amount = amount
		this.price = prettifyPrice( this.amount )

		this.vendor = vendor
		this.category = category
		this.payType = payType
	}


	/**
	 * Package data for frontend
	 *
	 * @return {Object}
	 */
	package() {
		return {
			id: this.id,

			// year: this.year,
			// month: this.month,
			// day: this.day,

			date: this.date,

			description: this.description,
			amount: this.amount,
			price: this.price,

			vendor: this.vendor,
			category: this.category,
			payType: this.payType,
		}
	}

}
