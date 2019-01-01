const Collection = require('./Collection');

/**
 * A generic paginated endpoint.
 * @constructor
 * @extends Collection
 */
class Pagination extends Collection {
	/**
	 * @param {object} result The result of the paginated endpoint.
	 * @property {number} id The page number.
	 * @property {number} avatarURL The page count.
	 * @memberof Pagination
	 */
	constructor(result) {
		super();
		this.page = result.page;
		this.pages = result.page_count;
	}

	/**
	 * Gets the page number.
	 * @returns {number} The page number.
	 * @memberof Pagination
	 */
	getPage() {
		return this.page;
	}

	/**
	 * Gets the page count.
	 * @returns {number} The page count.
	 * @memberof Pagination
	 */
	getPages() {
		return this.pages;
	}
}

module.exports = Pagination;