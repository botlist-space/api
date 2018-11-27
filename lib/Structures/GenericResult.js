/**
 * A generic response from the API. All raw values are mapped into class properties.
 * @constructor
 */
class GenericResult {
	/**
	 * @param {object} result Any properties in this object will be mapped into a class.
	 * @memberof GenericResult
	 */
	constructor(result) {
		const properties = Object.getOwnPropertyNames(result);

		for (let i = 0; i < properties.length; i++) {
			this[properties[i]] = result[properties[i]];
		}
	}
}

module.exports = GenericResult;