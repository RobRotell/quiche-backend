export class QueryArgs {


	args = null

	errors = []


	/**
	 * Create instance
	 *
	 * @param {Object} args
	 */
	constructor( args = {}) {
		this.args = args
	}


	/**
	 * Get errors from parsing args
	 *
	 * @return {Array}
	 */
	getErrors() {
		return this.errors
	}


	/**
	 * Run into error(s) parsing args?
	 *
	 * @return {bool} True, if errors
	 */
	hasErrors() {
		return !!this.errors.length
	}

}
