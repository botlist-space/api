/**
 * Used to hold information about how many bots are listed on the site.
 * @constructor
 */
class BotStatistics {
	/**
	 * @param {object} statistics 
	 * @property {number} total The total number of bots that are listed on the site.
	 * @property {number} approved The number of approved bots that are listed.
	 * @property {number} unapproved The number of unapproved bots that are listed.
	 * @memberof BotStatistics
	 */
	constructor(statistics) {
		this.total = statistics.total;
		this.approved = statistics.approved;
		this.unapproved = statistics.unapproved;
	}

	/**
	 * Returns the total number of bots that are listed on the site.
	 * @returns {number} The total number of bots that are listed on the site.
	 * @memberof BotStatistics
	 */
	getTotal() {
		return this.total;
	}

	/**
	 * Returns the number of approved bots that are listed.
	 * @returns {number} The number of approved bots that are listed.
	 * @memberof BotStatistics
	 */
	getApproved() {
		return this.approved;
	}

	/**
	 * Returns the number of unapproved bots that are listed.
	 * @returns {number} The number of unapproved bots that are listed.
	 * @memberof BotStatistics
	 */
	getUnapproved() {
		return this.unapproved;
	}
}

module.exports = BotStatistics;