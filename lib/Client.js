const snekfetch = require('snekfetch');
const HTTPError = require('./Structures/Error');
const Collection = require('./Structures/Collection');
const Statistics = require('./Structures/Statistics');
const Bot = require('./Structures/Bot');
const Upvote = require('./Structures/Upvote');
const User = require('./Structures/User');

const isObject = (obj) => !Array.isArray(obj) && obj === Object(obj);

/**
 * Creates a new client.
 * @class Client
 */
class Client {
	/**
	 * @param {object} options An object with client options.
	 * @param {string} options.id The ID of the bot.
	 * @param {string} options.botToken The token provided from the bots's token page.
	 */
	constructor(options) {
		if (!isObject(options)) throw new TypeError('Options must be an object');
		if (typeof options.id !== 'string') throw new TypeError('ID in options object must be a string');
		if (typeof options.botToken !== 'string') throw new TypeError('Bot token in options object must be a string');

		this._baseURL = 'https://api.botlist.space/v1';
		this._options = options;
	}

	/**
	 * Gets basic information about the site.
	 * @memberof Client
	 * @returns {Promise<Statistics|HTTPError>}
	 */
	getStatistics() {
		return new Promise((resolve, reject) => {
			snekfetch
				.get(this._baseURL + '/statistics')
				.then(result => {
					resolve(new Statistics(result.body));
				})
				.catch(error => {
					reject(error, new HTTPError(error));
				});
		});
	}

	/**
	 * Retrieves all bots from the site.
	 * @memberof Client
	 * @returns {Promise<Collection|HTTPError>}
	 */
	getAllBots() {
		return new Promise((resolve, reject) => {
			snekfetch
				.get(this._baseURL + '/bots')
				.then(result => {
					const bots = new Collection();

					for (let i = 0; i < result.body.length; i++) {
						bots.set(result.body[i].id, new Bot(result.body[i]));
					}

					resolve(bots);
				})
				.catch(error => {
					reject(new HTTPError(error));
				});
		});
	}

	/**
	 * Retrieves information about a specific bot.
	 * @memberof Client
	 * @returns {Promise<Bot|HTTPError>}
	 * @param {string} id The ID of the bot you want to get information on.
	 */
	getBot(id) {
		if (typeof id !== 'string') throw new TypeError('ID must be a string');

		return new Promise((resolve, reject) => {
			snekfetch
				.get(this._baseURL + '/bots/' + id)
				.then(result => {
					resolve(new Bot(result.body));
				})
				.catch(error => {
					reject(new HTTPError(error));
				});
		});
	}

	/**
	 * Gets all upvotes for your bot.
	 * @memberof Client
	 * @returns {Promise<Collection|HTTPError>}
	 */
	getUpvotes() {
		return new Promise((resolve, reject) => {
			snekfetch
				.get(this._baseURL + '/bots/' + this._options.id + '/upvotes')
				.set('Authorization', this._options.botToken)
				.then(result => {
					const upvotes = new Collection();

					for (let i = 0; i < result.body.length; i++) {
						upvotes.set(result.body[i].id, new Upvote(result.body[i]));
					}

					resolve(upvotes);
				})
				.catch(error => {
					reject(new HTTPError(error));
				});
		});
	}

	/**
	 * Checks if a user has upvoted your bot.
     * @memberof Client
	 * @param {string} userID The ID of the user to check for.
	 * @returns {Promise<boolean|HTTPError>}
	 */
	hasUpvoted(userID) {
		if (typeof userID !== 'string') throw new TypeError('User ID must be a string');

		return new Promise((resolve, reject) => {
			this
				.getUpvotes()
				.then((upvotes) => {
					resolve(upvotes.has(userID));
				})
				.catch(error => {
					reject(error);
				});
		});
	}

	/**
	 * Returns information about the current bot.
	 * @returns {Promise<Bot|HTTPError>}
	 * @memberof Client
	 */
	getSelfBot() {
		return this.getBot(this._options.id);
	}

	/**
	 * Posts server count to the site.
	 * @memberof Client
	 * @returns {Promise<undefined|HTTPError>}
	 * @param {number | Array<number>} count The server count, or array of server count as shards.
	 */
	postServerCount(count) {
		if (typeof count !== 'number' && !Array.isArray(count)) throw new TypeError('Server count is not a number nor shards array');

		return new Promise((resolve, reject) => {
			const data = Array.isArray(count) ? { shards: count } : { server_count: count };
			snekfetch
				.post(this._baseURL + '/bots/' + this._options.id)
				.set('Authorization', this._options.botToken)
				.send(data)
				.then(() => {
					resolve();
				})
				.catch(error => {
					reject(new HTTPError(error));
				});
		});
	}

	/**
	 * Retrieves information on a specific user.
	 * @memberof Client
	 * @returns {Promise<User|HTTPError>}
	 * @param {string} id The ID of the user you want to get information on.
	 */
	getUser(id) {
		if (typeof id !== 'string') throw new TypeError('User ID must be a string');

		return new Promise((resolve, reject) => {
			snekfetch
				.get(this._baseURL + '/users/' + id)
				.then(result => {
					resolve(new User(result.body));
				})
				.catch(error => {
					reject(new HTTPError(error));
				});
		});
	}

	/**
	 * Retrieves the bots that a user owns.
	 * @memberof Client
	 * @returns {Promise<Collection|HTTPError>}
	 * @param {string} id The ID of the user you want to get bots on.
	 */
	getUserBots(id) {
		if (typeof id !== 'string') throw new TypeError('User ID must be a string');

		return new Promise((resolve, reject) => {
			snekfetch
				.get(this._baseURL + '/users/' + id + '/bots')
				.then(result => {
					const bots = new Collection();

					for (let i = 0; i < result.body.length; i++) {
						bots.set(result.body[i].id, new Bot(result.body[i]));
					}

					resolve(bots);
				})
				.catch(error => {
					reject(new HTTPError(error));
				});
		});
	}
}

module.exports = Client;