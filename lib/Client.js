const snekfetch = require('snekfetch');
const HTTPError = require('./Structures/Error');

/**
 * Creates a new client.
 * @class Client
 * @constructor
 * @param {String} token The token provided from the bot's token page.
 * @param {String} id The ID of the bot.
 */
class Client {
	constructor(id, token) {
		if (typeof id !== 'string') throw new TypeError('ID must be a string');
		if (typeof token !== 'string') throw new TypeError('Token must be a string');

		this._baseURL = 'https://botlist.space/api';
		this._token = token;
		this._id = id;
	}

	/**
	 * Gets basic information about the site.
	 * @returns {Promise} The returned data.
	 * @memberof Client
	 */
	getStats() {
		return new Promise((resolve, reject) => {
			snekfetch
				.get(this._baseURL + '/stats')
				.then(bots => {
					resolve(bots.body);
				})
				.catch(error => {
					reject(new HTTPError(error));
				});
		});
	}

	/**
	 * Retrieves all bots from the site.
	 * @returns {Promise} The returned data.
	 * @memberof Client
	 */
	getAllBots() {
		return new Promise((resolve, reject) => {
			snekfetch
				.get(this._baseURL + '/bots')
				.then(bots => {
					resolve(bots.body);
				})
				.catch(error => {
					reject(new HTTPError(error));
				});
		});
	}

	/**
	 * Retrieves information about a specific bot.
	 * @returns {Promise} The returned data.
	 * @memberof Client
	 * @param {String} id The ID of the bot you want to get information on.
	 */
	getBot(id) {
		if (typeof id !== 'string') throw new TypeError('Bot ID must be a string');
		return new Promise((resolve, reject) => {
			snekfetch
				.get(this._baseURL + '/bots/' + id)
				.then(bot => {
					resolve(bot.body);
				})
				.catch(error => {
					reject(new HTTPError(error));
				});
		});
	}

	/**
	 * Retrieves information about a specific bot.
	 * @returns {Promise} The returned data.
	 * @memberof Client
	 * @param {Boolean} idsOnly Use true if you only want to return IDs of users who upvoted in the last 24 hours. False for all user data.
	 */
	getUpvotes(idsOnly) {
		if (typeof id !== 'string') throw new TypeError('Bot ID must be a string');
		return new Promise((resolve, reject) => {
			if (idsOnly) {
				snekfetch
					.get(this._baseURL + '/bots/' + this._id + '/upvotes?ids=true')
					.then(upvotes => {
						resolve(upvotes.body);
					})
					.catch(error => {
						reject(new HTTPError(error));
					});
			} else {
				snekfetch
					.get(this._baseURL + '/bots/' + this._id + '/upvotes')
					.then(upvotes => {
						resolve(upvotes.body);
					})
					.catch(error => {
						reject(new HTTPError(error));
					});
			}
		});
	}

	/**
	 * Returns information about the current bot.
	 * @returns {Promise} The returned data.
	 * @memberof Client
	 */
	getSelfBot() {
		return this.getBot(this._id);
	}

	/**
	 * Posts server count to the site.
	 * @returns {Promise} The returned data.
	 * @memberof Client
	 * @param {Array | Number} count The server count, or array of server count as shards.
	 */
	postServerCount(count) {
		if (typeof count !== 'number' && !(count instanceof Array)) throw new TypeError('Server count is not a number or shards array');
		return new Promise((resolve, reject) => {
			const data = count instanceof Array ? { shards: count } : { server_count: count };
			snekfetch
				.post(this._baseURL + '/bots/' + this._id)
				.set('Authorization', this._token)
				.send(data)
				.then(bots => {
					resolve(bots.body);
				})
				.catch(error => {
					reject(new HTTPError(error));
				});
		});
	}

	/**
	 * Retrieves all servers from the site.
	 * @returns {Promise} The returned data.
	 * @memberof Client
	 */
	getAllServers() {
		return new Promise((resolve, reject) => {
			snekfetch
				.get(this._baseURL + '/servers')
				.then(servers => {
					resolve(servers.body);
				})
				.catch(error => {
					reject(new HTTPError(error));
				});
		});
	}

	/**
	 * Retrieves information about a specific server.
	 * @returns {Promise} The returned data.
	 * @memberof Client
	 * @param {String} id The ID of the server you want to get information on.
	 */
	getServer(id) {
		if (typeof id !== 'string') throw new TypeError('Server ID must be a string');
		return new Promise((resolve, reject) => {
			snekfetch
				.get(this._baseURL + '/server/' + id)
				.then(server => {
					resolve(server.body);
				})
				.catch(error => {
					reject(new HTTPError(error));
				});
		});
	}

	/**
	 * Get a user's info
	 * @memberof Client
	 * @returns {Promise} Returned data
	 * @param {id} id User id.
	 */

	getUser(id) {
		if (typeof id !== 'string') throw new TypeError('User ID is not a string');
		return new Promise((resolve, reject) => {
			snekfetch
				.get(this._baseURL + '/users/' + id)
				.then(bots => {
					resolve(bots.body);
				})
				.catch(error => {
					reject(new HTTPError(error));
				});
		});
	}
}

module.exports = Client;
module.exports.Enum = {};
module.exports.Enum.HTTPError = HTTPError;
