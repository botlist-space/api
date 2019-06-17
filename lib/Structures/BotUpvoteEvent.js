const User = require('./Structures/User');

/**
 * The class that is used for bot upvotes.
 * @class
 * @param {object} data The raw payload data that was sent from the server.
 * @property {string} bot The ID of the bot that was viewed.
 * @property {User} user The class that holds information on who upvoted the bot.
 */
class BotUpvoteEvent {
	constructor(data) {
		this.bot = data.bot;
		this.user = new User(data.user);
	}
}

module.exports = BotUpvoteEvent;