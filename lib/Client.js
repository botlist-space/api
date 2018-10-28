const snekfetch = require('snekfetch');

const BotStatistics = require('./Structures/Statistics/Bots');
const HTTPError = require('./Structures/Error');
const Collection = require('./Structures/Collection');
const Statistics = require('./Structures/Statistics');
const Bot = require('./Structures/Bot');
const Upvote = require('./Structures/Upvote');
const User = require('./Structures/User');
const GenericResult = require('./Structures/GenericResult');
const Server = require('./Structures/Server');

/**
 * Creates a new client.
 * @class Client
 * @constructor
 */
class Client {
	/**
	 * @param {String} id The ID of the bot.
	 * @param {String} [token] The token provided from the bot's token page.
	 */
	constructor(id, token) {
		if (typeof id !== 'string') throw new TypeError('ID must be defined as a string');
		if (token && typeof token !== 'string') throw new TypeError('Token must be a string if it is supplied.');

		this._baseURL = 'https://botlist.space/api';
		this._token = token;
		this._id = id;
	}

	/**
	 * Gets basic information about the site.
	 * @memberof Client
	 * @returns {Promise<Statistics|HTTPError>}
	 */
	getStats() {
		return new Promise((resolve, reject) => {
			snekfetch
				.get(`${this._baseURL}/stats`)
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
				.get(`${this._baseURL}/bots`)
				.then(result => {
					const collection = new Collection();

					for (const item of result.body) {
						collection.set(item.id, new Bot(item));
					}

					resolve(collection);
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
	 * @param {String} id The ID of the bot you want to get information on.
	 */
	getBot(id) {
		if (typeof id !== 'string') throw new TypeError('Bot ID must be a string');
		return new Promise((resolve, reject) => {
			snekfetch
				.get(`${this._baseURL}/bots/${id}`)
				.then(result => {
					resolve(new Bot(result.body));
				})
				.catch(error => {
					reject(new HTTPError(error));
				});
		});
	}

	/**
	 * Retrieves information about a specific bot.
	 * @memberof Client
	 * @returns {Promise<Collection|HTTPError>}
	 * @param {Boolean} [idsOnly=false] Use true if you only want to return IDs of users who upvoted in the last 24 hours. False for all user data.
	 */
	getUpvotes(idsOnly = false) {
		if (!this.token) throw new Error('getUpvotes() was invoked but no token was provided in the client constructor');
		if (typeof id !== 'string') throw new TypeError('Bot ID must be a string');
		return new Promise((resolve, reject) => {
			const collection = new Collection();
			snekfetch
				.get(`${this._baseURL}/bots/${this._id}/upvotes?ids=${idsOnly ? 'true' : 'false'}`)
				.then(body => {
					for (const item of body.body) {
						collection.set(item.id, item);
					}
					resolve(collection);
				})
				.catch(error => reject(new HTTPError(error)));
		});
	}

	/**
	 * Checks if a user has upvoted your bot.
	 * @param {String} userID The ID of the user to check for.
	 * @returns {Promise<Boolean|HTTPError>}
	 */
	hasUpvoted(userID) {
		if (!this.token) throw new Error('hasUpvoted() was invoked but no token was provided in the client constructor');
		if (typeof userID !== 'string') throw new TypeError('User ID must be a string');
		return new Promise((resolve, reject) => {
			this.getUpvotes(true).then((users) => {
				resolve(users.includes(userID));
			}).catch(error => {
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
	 * @returns {Promise<GenericResult|HTTPError>}
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
				.then(result => {
					resolve(new GenericResult(result.body));
				})
				.catch(error => {
					reject(new HTTPError(error));
				});
		});
	}

	/**
	 * Retrieves all servers from the site.
	 * @memberof Client
	 * @returns {Promise<Collection|HTTPError>}
	 */
	getAllServers() {
		return new Promise((resolve, reject) => {
			snekfetch
				.get(`${this._baseURL}/servers`)
				.then(result => {
					const collection = new Collection();
					for (const item of result.body) {
						collection.set(item.id, new Server(item));
					}

					resolve(collection);
				})
				.catch(error => {
					reject(new HTTPError(error));
				});
		});
	}

	/**
	 * Retrieves information about a specific server.
	 * @memberof Client
	 * @returns {Promise<Server|HTTPError>}
	 * @param {String} id The ID of the server you want to get information on.
	 */
	getServer(id) {
		if (typeof id !== 'string') throw new TypeError('Server ID must be a string');
		return new Promise((resolve, reject) => {
			snekfetch
				.get(`${this._baseURL}/servers/${id}`)
				.then(result => {
					resolve(new Server(result.body));
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
	 * @param {String} id The ID of the user you want to get information on.
	 */
	getUser(id) {
		if (typeof id !== 'string') throw new TypeError('User ID is not a string');
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
}

module.exports = Client;

module.exports.Statistics = Statistics;
module.exports.Statistics.Bots = BotStatistics;
module.exports.Bot = Bot;
module.exports.Collection = Collection;
module.exports.Error = HTTPError;
module.exports.Upvote = Upvote;
module.exports.User = User;
module.exports.GenericResult = GenericResult;
module.exports.Server = Server;