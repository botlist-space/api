const snekfetch = require('snekfetch');
const HTTPError = require('./Error');

/**
 * Creates a new client.
 * 
 * @class Client
 * @constructor
 * @param {String} token The token provided from the bot's token page.
 * @param {String} id The ID of the bot.
 */
class Client {
	constructor(id, token) {
		if (typeof token !== 'string') throw new TypeError('Token must be a string');
		if (typeof id !== 'string') throw new TypeError('ID must be a string');
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
			snekfetch.get(this._baseURL + '/stats').then((bots) => {
				resolve(bots.body);
			}).catch((error) => {
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
			snekfetch.get(this._baseURL + '/bots').then((bots) => {
				resolve(bots.body);
			}).catch((error) => {
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
			snekfetch.get(this._baseURL + '/bots/' + id).then((bots) => {
				resolve(bots.body);
			}).catch((error) => {
				reject(new HTTPError(error));
			});
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
	 * @param {Array | Integer} count The server count, or array of server count as shards.
	 */
	postServerCount(count) {
		if (typeof count !== 'number' && !(count instanceof Array)) throw new TypeError('Server count is not a number or shards array');
		return new Promise((resolve, reject) => {
			let data;
			if (count instanceof Array) {
				data = { shards: count };
			} else {
				data = { server_count: count };
			}
			snekfetch.post(this._baseURL + '/bots/' + this._id).send(data).then((bots) => {
				resolve(bots.body);
			}).catch((error) => {
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
			snekfetch.get(this._baseURL + '/users/' + id).then((bots) => {
				resolve(bots.body);
			}).catch((error) => {
				reject(new HTTPError(error));
			});
		});
	}

	/**
	 * Retrieves all bots from the site.
	 * @returns {Promise} The returned data.
	 * @memberof Client
	 * @returns {HTTPError}
	 */
	get HTTPError() {
		return HTTPError;
	}
}

module.exports = Client;
