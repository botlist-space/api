/**
 * A generic HTTP error, returned from a method's promise.
 * @constructor
 * @param {Object} error The error that is passed from a failed HTTP request.
 */
class HTTPError {
	constructor(error) {
		this.code = error.status;
		this.message = error.statusText;
	}
}

module.exports = HTTPError;