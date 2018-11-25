const Collection = require('./Collection');
const User = require('./User');

/**
 * A class which represents a server that is listed on the site.
 * @constructor
 */
class Server {
	/**
	 * @param {object} server The raw server object returned from the API.
	 * @property {string} id The ID of the server.
	 * @property {string} name The name of the server.
	 * @property {string} shortDescription A short description of what the server is for.
	 * @property {string} fullDescription A full description containing Markdown. May be empty.
	 * @property {number} memberCount The amount of members in the server.
	 * @property {string} iconURL The full path of the server icon.
	 * @property {boolean} premium A boolean stating if the server has premium activated.
	 * @property {boolean} featured A boolean stating if the server is featured on the front page.
	 * @property {boolean} iconChildFriendly A boolean stating if the icon is considered child friendly.
	 * @property {boolean} public A boolean stating if the manager bot is in the server, and the invite is active.
	 * @property {?string} vanity A vanity for the server. May be null.
	 * @property {number} timestamp A timestamp in milliseconds at which the server was added to the site.
	 * @property {Collection<User>} owners A collection of User classes who own the server.
	 * @memberof Server
	 */
	constructor(server) {
		this.id = server.id;
		this.name = server.name;
		this.shortDescription = server.short_description;
		this.fullDescription = server.full_description;
		this.memberCount = server.member_count;
		this.iconURL = server.icon;
		this.premium = server.premium;
		this.featured = server.featured;
		this.iconChildFriendly = server.iconChildFriendly;
		this.public = server.public;
		this.vanity = server.vanity;
		this.timestamp = server.timestamp;
		this.owners = new Collection();
		for (let i = 0; i < server.owners.length; i++) {
			this.owners.set(server.owners[i].id, new User(server.owners[i]));
		}
	}

	/**
	 * Gets the absolute path for the server on the site.
	 * @returns {string} The absolute path for the server on the site.
	 * @memberof Server
	 */
	getURL() {
		return 'https://botlist.space/server/' + this.getID();
	}

	/**
	 * Gets the ID of the server.
	 * @returns {string} The ID of the server.
	 * @memberof Server
	 */
	getID() {
		return this.id;
	}

	/**
	 * Gets the name of the server.
	 * @returns {string} The name of the server.
	 * @memberof Server
	 */
	getName() {
		return this.name;
	}

	/**
	 * Gets the short description of what the server is for.
	 * @returns {string} A short description of what the server is for.
	 * @memberof Server
	 */
	getShortDescription() {
		return this.shortDescription;
	}

	/**
	 * Gets the full description containing Markdown. May be empty.
	 * @returns {string} A full description containing Markdown. May be empty.
	 * @memberof Server
	 */
	getFullDescription() {
		return this.fullDescription;
	}

	/**
	 * Gets the amount of members in the server.
	 * @returns {number} The amount of members in the server.
	 * @memberof Server
	 */
	getMemberCount() {
		return this.memberCount;
	}

	/**
	 * Gets the full path of the server icon.
	 * @returns {string} The full path of the server icon.
	 * @memberof Server
	 */
	getIconURL() {
		return this.iconURL;
	}

	/**
	 * Gets the boolean stating if the server has premium activated.
	 * @returns {boolean} A boolean stating if the server has premium activated.
	 * @memberof Server
	 */
	isPremium() {
		return this.premium;
	}

	/**
	 * Gets the boolean stating if the server is featured on the front page.
	 * @returns {boolean} A boolean stating if the server is featured on the front page.
	 * @memberof Server
	 */
	isFeatured() {
		return this.featured;
	}

	/**
	 * Gets the boolean stating if the icon is not considered child friendly.
	 * @returns {boolean} A boolean stating if the icon is not considered child friendly.
	 * @memberof Server
	 */
	isNSFW() {
		return !this.iconChildFriendly;
	}

	/**
	 * Gets the boolean stating if the manager bot is in the server, and the invite is active.
	 * @returns {boolean} A boolean stating if the manager bot is in the server, and the invite is active.
	 * @memberof Server
	 */
	isPublic() {
		return this.public;
	}

	/**
	 * Gets the vanity for the server. May be null.
	 * @returns {?string} A vanity for the server. May be null.
	 * @memberof Server
	 */
	getVanity() {
		return this.vanity;
	}

	/**
	 * Gets the date at which the server was added to the site.
	 * @returns {Date} A date at which the server was added to the site.
	 * @memberof Server
	 */
	getTimestamp() {
		return new Date(this.timestamp);
	}

	/**
	 * Gets the collection of User classes who own the server.
	 * @returns {Collection<User>} A collection of User classes who own the server.
	 * @memberof Server
	 */
	getOwners() {
		return this.owners;
	}
}

module.exports = Server;