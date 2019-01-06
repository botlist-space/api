/**
 * Contains basic statistics of the site, including bot, server and user count.
 * @constructor
 */
class Statistics {
	/**
	 * @param {object} result The raw result returned from the API.
	 * @property {number} total_bots The number of total bots listed on the site.
	 * @property {number} approved_bots The number of approved bots listed on the site.
	 * @property {number} unapproved_bots The number of unapproved bots listed on the site.
	 * @property {number} tags The number of tags available for use.
	 * @property {number} users The number of users logged into the site.
	 * @memberof Statistics
	 */
	constructor(result) {
		this.total_bots = result.total_bots;
		this.approved_bots = result.approved_bots;
		this.unapproved_bots = result.unapproved_bots;
		this.tags = result.tags;
		this.users = result.users;
	}

	/**
	 * Gets the number of total bots listed on the site.
	 * @returns {number} The number of total bots listed on the site.
	 * @memberof Statistics
	 */
	getTotalBots() {
		return this.total_bots;
	}

	/**
	 * Gets the number of approved bots listed on the site.
	 * @returns {number} The number of approved bots listed on the site.
	 * @memberof Statistics
	 */
	getApprovedBots() {
		return this.approved_bots;
	}

	/**
	 * Gets the number of unapproved bots listed on the site.
	 * @returns {number} The number of unapproved bots listed on the site.
	 * @memberof Statistics
	 */
	getUnapprovedBots() {
		return this.unapproved_bots;
	}

	/**
	 * Gets the number of unapproved bots listed on the site.
	 * @returns {number} The number of unapproved bots listed on the site.
	 * @memberof Statistics
	 */
	getTags() {
		return this.tags;
	}

	/**
	 * Gets the number of users logged into the site.
	 * @returns {number} The number of users logged into the site.
	 * @memberof Statistics
	 */
	getUsers() {
		return this.users;
	}
}

module.exports = Statistics;