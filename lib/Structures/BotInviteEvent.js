/**
 * The class that is used for bot invites.
 * @class
 * @param {object} data The raw payload data that was sent from the server.
 * @property {string} bot The ID of the bot that was viewed.
 */
class BotInviteEvent {
	constructor(data) {
		this.bot = data.bot;
	}
}

module.exports = BotInviteEvent;