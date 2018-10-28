/**
 * An extended version of Map, including methods that are Array-like.
 * @extends Map
 * @constructor
 */
class Collection extends Map {
	/**
	 * @param {*} args Options to pass to Map when extending from the class.
	 * @memberof Collection
	 */
	constructor(args) {
		super(args);
	}

	/**
	 * Takes all values in the array, and calls the callback for each value and returns an array of filtered values.
	 * @param {Function} func The array that is used to filter values.
	 * @returns {Array} The result of filtered values.
	 * @memberof Collection
	 */
	filter(func) {
		const result = [];
		const values = this.toArray();
		for (const item of values) {
			if (func(item)) result.push(item);
		}
		return result;
	}

	/**
	 * Takes each value, calls the function with the value and returns an array of the output of the callback.
	 * @param {Function} func
	 * @returns {Array} The result of the mapped values.
	 * @memberof Collection
	 */
	map(func) {
		const values = this.toArray();
		const result = [];
		for (const item of values) {
			result.push(func(item));
		}
		return result;
	}

	/**
	 * Converts the values in the collection to an array.
	 * @returns {Array} The collection converted to an array.
	 * @memberof Collection
	 */
	toArray() {
		return [ ...this.values() ];
	}

	/**
	 * Converts the values in the collection into a string version of an array.
	 * @returns {String} An array converted into string format.
	 * @memberof Collection
	 */
	toJSON() {
		return JSON.stringify(this.toArray());
	}
}

module.exports = Collection;