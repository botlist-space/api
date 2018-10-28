/**
 * Returned when an error occured in a request.
 * @constructor
 */
class HTTPError {
	/**
	 * @param {Object} error The raw error returned from the snekfetch request.
	 * @property {Number} code The HTTP error code of the error.
	 * @property {String} message The message of why the error occured.
	 * @memberof HTTPError
	 */
	constructor(error) {
		this.code = error.body ? error.body.code : 500;
		this.message = error.body ? error.body.message : 500;
	}

	/**
	 * Gets the HTTP error code of the error.
	 * @returns {Number} The HTTP error code of the error.
	 * @memberof HTTPError
	 */
	getCode() {
		return this.code;
	}

	/**
	 * Gets the message of why the error occured.
	 * @returns {String} The message of why the error occured.
	 * @memberof HTTPError
	 */
	getMessage() {
		return this.message;
	}
}

module.exports = HTTPError;