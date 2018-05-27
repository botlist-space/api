/**
 * A generic HTTP error, returned from a method's promise.
 * @constructor
 * @param {Object} error The error that is passed from a failed HTTP request.
 */
class HTTPError {
	constructor(error) {
		this.code = error.body.error.code;
		this.message = error.body.error.message;
	}
}

module.exports = HTTPError;
