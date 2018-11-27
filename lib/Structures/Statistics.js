const BotStatistics = require('./Statistics/Bots');

/**
 * Contains basic statistics of the site, including bot, server and user count.
 * @constructor
 */
class Statistics {
	/**
	 * @param {Object} result The raw result returned from the API.
	 * @property {BotStatistics} bots The class containing list bot statistics.
	 * @property {number} servers The number of servers listed.
	 * @property {number} users The number of users logged into the site.
	 * @memberof Statistics
	 */
	constructor(result) {
		this.bots = new BotStatistics(result.bots);
		this.servers = result.servers;
		this.users = result.users;
	}

	static get Bots() {
		return BotStatistics;
	}

	/**
	 * Gets the class containing list bot statistics.
	 * @returns {BotStatistics} The class containing list bot statistics.
	 * @memberof Statistics
	 */
	getBots() {
		return this.bots;
	}

	/**
	 * Gets the number of servers listed.
	 * @returns {number} The number of servers listed.
	 * @memberof Statistics
	 */
	getServers() {
		return this.servers;
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