import { ResponseBody } from './ResponseBody'


export class ErrorResponseBody extends ResponseBody {


	error = null


	/**
	 * Create instance
	 *
	 * @param {string|array} err String or array of error messages
	 * @param {int} code HTTP status code
	 */
	constructor( errors = '', code = 400 ) {
		super({
			errors,
		}, code )

		this.error = true
	}

}
