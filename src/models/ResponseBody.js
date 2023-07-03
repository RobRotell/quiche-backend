export class ResponseBody {


	code = null

	data = {}


	/**
	 * Create instance
	 *
	 * @param {mixed} data Data to return in response
	 * @param {int} code HTTP status code
	 */
	constructor( data, code = 200 ) {
		this.code = code

		this.data = data
	}

}
