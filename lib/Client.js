const snekfetch = require('snekfetch');

const HTTPError = require('./Structures/Error');
const Collection = require('./Structures/Collection');
const Statistics = require('./Structures/Statistics');
const Bot = require('./Structures/Bot');
const Upvote = require('./Structures/Upvote');
const User = require('./Structures/User');
const Pagination = require('./Structures/Pagination');

/**
 * Creates a new client.
 * @class Client
 */
class Client {
	/**
	 * @param {object} options An object with client options.
	 * @param {string} options.id The ID of the bot.
	 * @param {string} [options.userToken] The token provided from the user's token page.
	 * @param {string} options.botToken The token provided from the bots's token page.
	 */
	constructor(options) {
		if (!(options instanceof Object)) throw new TypeError('Options must be an object');
		if (!(options.id instanceof String)) throw new TypeError('ID in options object must be a string');
		if ('userToken' in options && !(options.userToken instanceof String)) throw new TypeError('User token in options object must be a string');
		if (!(options.botToken instanceof String)) throw new TypeError('Bot token in options object must be a string');

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
	 * @param {number} [page=1] The page number.
	 * @returns {Promise<Pagination|HTTPError>}
	 */
	getAllBots(page = 1) {
		if (!(page instanceof Number)) throw new TypeError('Page must be a number');
		if (page < 1) throw new SyntaxError('Page must be a number greater than 0.');
		return new Promise((resolve, reject) => {
			snekfetch
				.get(this._baseURL + '/bots')
				.query('page', page)
				.then(result => {
					const pagination = new Pagination(result.body);

					for (let i = 0; i < result.body.bots.length; i++) {
						pagination.set(result.body[i].id, new Bot(result.body.bots[i]));
					}

					resolve(pagination);
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
		if (!(id instanceof String)) throw new TypeError('ID must be a string');
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
	 * @returns {Promise<Pagination|HTTPError>}
	 * @param {number} [page=1] The page number.
	 */
	getUpvotes(page = 1) {
		return new Promise((resolve, reject) => {
			snekfetch
				.get(this._baseURL + '/bots/' + this._id + '/upvotes')
				.query('page', page)
				.set('Authorization', this._options.botToken)
				.then(result => {
					const pagination = new Pagination(result.body);

					for (let i = 0; i < result.body.upvotes.length; i++) {
						pagination.set(result.body[i].id, new Upvote(result.body.upvotes[i]));
					}

					resolve(pagination);
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
		if (!(userID instanceof String)) throw new TypeError('User ID must be a string');
		return new Promise((resolve, reject) => {
			this
				.getUpvotes()
				.then((pagination) => {
					resolve(pagination.getData().has(userID));
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
		return this.getBot(this._id);
	}

	/**
	 * Posts server count to the site.
	 * @memberof Client
	 * @returns {Promise<undefined|HTTPError>}
	 * @param {number | number[]} count The server count, or array of server count as shards.
	 */
	postServerCount(count) {
		if (!(count instanceof Number) && !Array.isArray(count)) throw new TypeError('Server count is not a number nor shards array');
		return new Promise((resolve, reject) => {
			const data = count instanceof Array ? { shards: count } : { server_count: count };
			snekfetch
				.post(this._baseURL + '/bots/' + this._id)
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
		if (!(id instanceof String)) throw new TypeError('User ID is not a string');
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
	 * Retrieves information on a specific user.
	 * @memberof Client
	 * @returns {Promise<Pagination|HTTPError>}
	 * @param {string} id The ID of the user you want to get information on.
	 * @param {number} [page=1] The page number.
	 */
	getUserBots(id, page = 1) {
		if (!(id instanceof String)) throw new TypeError('User ID is not a string');
		if (!(page instanceof Number)) throw new TypeError('Page must be a number');
		if (page < 1) throw new SyntaxError('Page must be a number greater than 0.');
		return new Promise((resolve, reject) => {
			snekfetch
				.get(this._baseURL + '/users/' + id + '/bots')
				.query('page', page || '1')
				.then(result => {
					const pagination = new Pagination(result.body);

					for (let i = 0; i < result.body.bots.length; i++) {
						pagination.set(result.body[i].id, new Bot(result.body.bots[i]));
					}

					resolve(pagination);
				})
				.catch(error => {
					reject(new HTTPError(error));
				});
		});
	}
}

module.exports = Client;

module.exports.Statistics = Statistics;
module.exports.Bot = Bot;
module.exports.Collection = Collection;
module.exports.Error = HTTPError;
module.exports.Upvote = Upvote;
module.exports.User = User;
module.exports.Pagination = Pagination;