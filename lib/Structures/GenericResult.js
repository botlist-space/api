/**
 * A generic response from the API. All raw values are mapped into class properties.
 * @constructor
 */
class GenericResult {
	/**
	 * @param {Object} result Any properties in this object will be mapped into a class.
	 * @memberof GenericResult
	 */
	constructor(result) {
		const properties = Object.getOwnPropertyNames(result);

		for (const item of properties) {
			this[item] = result[item];
		}
	}
}

module.exports = GenericResult;