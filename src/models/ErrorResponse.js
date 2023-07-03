import { ResponseBody } from './ResponseBody'


export class ErrorResponseBody extends ResponseBody {


	code = null

	error = null

	data = {}


	/**
	 * Create instance
	 *
	 * @param {string|array} err String or array of error messages
	 * @param {int} code HTTP status code
	 */
	constructor( errors = '', code = 400 ) {
		super()

		this.code = code
		this.error = true

		this.data = {
			errors,
		}
	}

}
