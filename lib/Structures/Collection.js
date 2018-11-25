/**
 * An extended version of Map, including methods that are Array-like.
 * @extends Map
 * @constructor
 */
class Collection extends Map {
	/**
	 * @param {*} [iterable] An iterable something to be made into key-value pairs.
	 * @memberof Collection
	 */
	constructor(iterable) {
		super(iterable);
	}

	/**
	 * Takes all values in the array, and calls the callback for each value and returns an array of filtered values.
	 * @param {Function} func The array that is used to filter values.
	 * @returns {Array} The result of filtered values.
	 * @memberof Collection
	 */
	filter(func) {
		const result = [];
		const keys = this.toKeyArray();
		const values = this.toArray();
		for (let i = 0; i < values.length; i++) {
			if (func(values[i], keys[i])) result.push(values[i]);
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
		const keys = this.toKeyArray();
		const values = this.toArray();
		const result = [];
		for (let i = 0; i < values.length; i++) {
			result.push(func(values[i], keys[i]));
		}
		return result;
	}

	/**
	 * Converts the values in the collection to an array.
	 * @returns {Array} The collection converted to an array.
	 * @memberof Collection
	 */
	toArray() {
		return [...this.values()];
	}

	/**
	 * Converts the keys in this collection to an array.
	 * @returns {Array} The collection converted to an array.
	 * @memberof Collection
	 */
	toKeyArray() {
		return [...this.keys()];
	}

	/**
	 * Converts the values in the collection into a string version of an array.
	 * @returns {string} An array converted into string format.
	 * @memberof Collection
	 */
	toJSON() {
		return JSON.stringify(this.toArray());
	}
}

module.exports = Collection;