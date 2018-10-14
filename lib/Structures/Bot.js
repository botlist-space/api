const Collection = require('./Collection');
const User = require('./User');

/**
 * A class which represents a bot that is listed on the site.
 * @constructor
 */
class Bot {
	/**
	 * @param {Object} bot Contains the bot information returned raw from the site.
	 * @property {String} id The ID of the bot.
	 * @property {String} username The username of the bot.
	 * @property {String} discriminator The discriminator number of the bot.
	 * @property {String} shortDescription A short description of the purpose of the bot.
	 * @property {String} fullDescription A detailed description of the bot. Contains Markdown, may be blank.
	 * @property {String} avatarURL The URL for the avatar of the bot. Not guaranteed to be available from Discord.
	 * @property {String} invite The invite URL for the bot provided by the owner.
	 * @property {Boolean} avatarChildFriendly A boolean stating if the avatar should be considered child friendly.
	 * @property {String} library The name of the library which powers the back-end of the bot.
	 * @property {String} prefix A short prefix which is required to use the bot's commands.
	 * @property {Collection<User>} owners A collection of User classes which hold listed owner's information.
	 * @property {?String} vanity A string containing the vanity of the bot. May be null.
	 * @property {Boolean} premium A boolean stating if the owner has purchased premium for the bot.
	 * @property {Boolean} featured A boolean stating if the bot is featured on the front page.
	 * @property {Object} links An object that contains social links.
	 * @property {Number} timestamp A timestamp in milliseconds since the bot was added to the site.
	 * @memberof Bot
	 */
	constructor(bot) {
		this.id = bot.id;
		this.username = bot.username;
		this.discriminator = bot.discriminator;
		this.shortDescription = bot.short_description;
		this.fullDescription = bot.full_description;
		this.avatarURL = bot.avatar;
		this.invite = bot.invite;
		this.avatarChildFriendly = bot.avatarChildFriendly;
		this.library = bot.library;
		this.prefix = bot.prefix;
		this.owners = new Collection();
		for (let i = 0; i < bot.owners.length; i++) {
			this.owners.set(bot.owners[i].id, new User(bot.owners[i]));
		}
		this.vanity = bot.vanity;
		this.premium = bot.premium;
		this.featured = bot.featured;
		this.links = bot.links;
		this.timestamp = bot.timestamp;
	}

	/**
	 * Returns an absolute path to view the bot on the site.
	 * @returns {String} The ID of the bot.
	 * @memberof Bot
	 */
	getURL() {
		return 'https://botlist.space/bot/' + this.getID();
	}

	/**
	 * Gets the ID of the bot.
	 * @returns {String}
	 * @memberof Bot
	 */
	getID() {
		return this.id;
	}

	/**
	 * Gets the username of the bot.
	 * @returns {String} The username of the bot.
	 * @memberof Bot
	 */
	getUsername() {
		return this.username;
	}

	/**
	 * Gets the discriminator number of the bot.
	 * @returns {String} The discriminator number of the bot.
	 * @memberof Bot
	 */
	getDiscriminator() {
		return this.discriminator;
	}

	/**
	 * Gets the full username and discriminator combined together using a #.
	 * @returns {String} The full username and discriminator combined together using a #.
	 * @memberof Bot
	 */
	getTag() {
		return this.getUsername() + '#' + this.getDiscriminator();
	}

	/**
	 * Gets the short description of the purpose of the bot.
	 * @returns {String} A short description of the purpose of the bot.
	 * @memberof Bot
	 */
	getShortDescription() {
		return this.shortDescription;
	}

	/**
	 * Gets the detailed description of the bot. Contains Markdown, may be blank.
	 * @returns {String} A detailed description of the bot. Contains Markdown, may be blank.
	 * @memberof Bot
	 */
	getFullDescription() {
		return this.fullDescription;
	}

	/**
	 * Gets the URL for the avatar of the bot. Not guaranteed to be available from Discord.
	 * @returns {String} The URL for the avatar of the bot. Not guaranteed to be available from Discord.
	 * @memberof Bot
	 */
	getAvatarURL() {
		return this.avatarURL;
	}

	/**
	 * Gets the invite URL for the bot provided by the owner.
	 * @returns {String} The invite URL for the bot provided by the owner.
	 * @memberof Bot
	 */
	getInvite() {
		return this.invite;
	}

	/**
	 * Gets the short prefix which is required to use the bot's commands.
	 * @returns {String} A short prefix which is required to use the bot's commands.
	 * @memberof Bot
	 */
	getPrefix() {
		return this.prefix;
	}

	/**
	 * Gets the collection of User classes which hold listed owner's information.
	 * @returns {Collection<User>} A collection of User classes which hold listed owner's information.
	 * @memberof Bot
	 */
	getOwners() {
		return this.owners;
	}

	/**
	 * Gets the string containing the vanity of the bot. May be null.
	 * @returns {?String} A string containing the vanity of the bot. May be null.
	 * @memberof Bot
	 */
	getVanity() {
		return this.vanity;
	}

	/**
	 * Gets the boolean stating if the owner has purchased premium for the bot.
	 * @returns {Boolean} A boolean stating if the owner has purchased premium for the bot.
	 * @memberof Bot
	 */
	isPremium() {
		return this.premium;
	}

	/**
	 * Gets the boolean stating if the bot is featured on the front page.
	 * @returns {Boolean} A boolean stating if the bot is featured on the front page.
	 * @memberof Bot
	 */
	isFeatured() {
		return this.featured;
	}

	/**
	 * Gets the boolean stating if the avatar is not considered child friendly.
	 * @returns {Boolean} A boolean stating if the avatar is not considered child friendly.
	 * @memberof Bot
	 */
	isNSFW() {
		return !this.avatarChildFriendly;
	}

	/**
	 * Gets an object that contains social links.
	 * @returns {Object} An object that contains social links.
	 * @memberof Bot
	 */
	getLinks() {
		return this.links;
	}

	/**
	 * Gets the date since the bot was added to the site.
	 * @returns {Date} A date since the bot was added to the site.
	 * @memberof Bot
	 */
	getTimestamp() {
		return new Date(this.timestamp);
	}
}

module.exports = Bot;