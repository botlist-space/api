const Collection = require('./Collection');
const User = require('./User');

/**
 * A class which represents a bot that is listed on the site.
 * @constructor
 */
class Bot {
	/**
	 * @param {object} bot Contains the bot information returned raw from the site.
	 * @property {string} id The ID of the bot.
	 * @property {string} username The username of the bot.
	 * @property {string} discriminator The discriminator number of the bot.
	 * @property {string} shortDescription A short description of the purpose of the bot.
	 * @property {string} fullDescription A detailed description of the bot. Contains Markdown, may be blank.
	 * @property {boolean} approved If the bot has been approved, this will be true.
	 * @property {boolean} certified If the bot is certified, this will be true.
	 * @property {string} avatar The Discord avatar hash provided from their API.
	 * @property {string} invite The invite URL for the bot provided by the owner.
	 * @property {string} [support] The support server code provided by the owner, could be null.
	 * @property {boolean} avatarChildFriendly A boolean stating if the avatar should be considered child friendly.
	 * @property {string} library The name of the library which powers the back-end of the bot.
	 * @property {string} prefix A short prefix which is required to use the bot's commands.
	 * @property {Collection<string, User>} owners A collection of User classes which hold listed owner's information.
	 * @property {Array<string>} tags An array containing tags that the bot has assigned, may be empty.
	 * @property {?string} vanity A string containing the vanity of the bot. May be null.
	 * @property {number} createdAt A timestamp in milliseconds since the bot was added to the site.
	 * @property {number} updatedAt A timestamp in milliseconds since the bot was last updated.
	 * @property {number} [serverCount] The amount of servers that this bot is in, may be null.
	 * @property {Array<number>} [shards] The shards that the bot has, each value is a server count on that shard, may be null.
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
		this.certified = bot.certified;
		this.approved = bot.approved;
		this.tags = bot.tags;
		this.avatarChildFriendly = bot.avatarChildFriendly;
		this.library = bot.library;
		this.prefix = bot.prefix;
		this.support = bot.links.support;
		this.owners = new Collection();
		for (let i = 0; i < bot.owners.length; i++) {
			this.owners.set(bot.owners[i].id, new User(bot.owners[i]));
		}
		this.vanity = bot.vanity;
		this.serverCount = bot.server_count;
		this.shards = bot.shards;
		this.createdAt = bot.created_at;
		this.updatedAt = bot.updated_at;
	}

	/**
	 * Returns an absolute path to view the bot on the site.
	 * @returns {string} The ID of the bot.
	 * @memberof Bot
	 */
	getURL() {
		return 'https://botlist.space/bot/' + this.getID();
	}

	/**
	 * Gets the ID of the bot.
	 * @returns {string}
	 * @memberof Bot
	 */
	getID() {
		return this.id;
	}

	/**
	 * Gets the username of the bot.
	 * @returns {string} The username of the bot.
	 * @memberof Bot
	 */
	getUsername() {
		return this.username;
	}

	/**
	 * Gets the discriminator number of the bot.
	 * @returns {string} The discriminator number of the bot.
	 * @memberof Bot
	 */
	getDiscriminator() {
		return this.discriminator;
	}

	/**
	 * Gets the full username and discriminator combined together using a #.
	 * @returns {string} The full username and discriminator combined together using a #.
	 * @memberof Bot
	 */
	getTag() {
		return this.getUsername() + '#' + this.getDiscriminator();
	}

	/**
	 * Gets the short description of the purpose of the bot.
	 * @returns {string} A short description of the purpose of the bot.
	 * @memberof Bot
	 */
	getShortDescription() {
		return this.shortDescription;
	}

	/**
	 * Gets the detailed description of the bot. Contains Markdown, may be blank.
	 * @returns {string} A detailed description of the bot. Contains Markdown, may be blank.
	 * @memberof Bot
	 */
	getFullDescription() {
		return this.fullDescription;
	}

	/**
	 * Gets if the bot is approved or not.
	 * @returns {boolean} If the bot is approved.
	 * @memberof Bot
	 */
	isApproved() {
		return this.approved;
	}

	/**
	 * Gets if the bot is certified or not.
	 * @returns {boolean} If the bot is certified.
	 * @memberof Bot
	 */
	isCertified() {
		return this.certified;
	}

	/**
	 * Gets the Discord avatar hash provided from their API.
	 * @returns {string} The Discord avatar hash provided from their API.
	 * @memberof Bot
	 */
	getAvatar() {
		return this.avatar;
	}

	/**
	 * Gets the avatar URL from Discord's CDN.
	 * @returns {string} The avatar URL from Discord's CDN.
	 * @memberof Bot
	 */
	getAvatarURL() {
		return this.avatar ? 'https://cdn.discordapp.com/avatars/' + this.id + '/' + this.avatar + '.' + (this.avatar.startsWith('a_') ? 'gif' : 'png') : 'https://cdn.discordapp.com/embed/avatars/1.png';
	}

	/**
	 * Gets the invite URL for the bot provided by the owner.
	 * @returns {string} The invite URL for the bot provided by the owner.
	 * @memberof Bot
	 */
	getInvite() {
		return this.invite;
	}

	/**
	 * Gets the short prefix which is required to use the bot's commands.
	 * @returns {string} A short prefix which is required to use the bot's commands.
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
	 * @returns {?string} A string containing the vanity of the bot. May be null.
	 * @memberof Bot
	 */
	getVanity() {
		return this.vanity;
	}

	/**
	 * Gets the boolean stating if the avatar is not considered child friendly.
	 * @returns {boolean} A boolean stating if the avatar is not considered child friendly.
	 * @memberof Bot
	 */
	isNSFW() {
		return !this.avatarChildFriendly;
	}


	/**
	 * Gets an array of strings that holds the tags of the bot.
	 * @returns {Array<string>} An array of strings that holds the tags of the bot.
	 * @memberof Bot
	 */
	getTags() {
		return this.tags;
	}


	/**
	 * Gets the server count of the bot, may be null.
	 * @returns {number} The server count of the bot, may be null.
	 * @memberof Bot
	 */
	getServerCount() {
		return this.serverCount;
	}


	/**
	 * Gets an array of numbers that holds the shards of the bot.
	 * @returns {Array<string>} An array of numbers that holds the shards of the bot.
	 * @memberof Bot
	 */
	getShards() {
		return this.shards;
	}

	/**
	 * Gets the date since the bot was added to the site.
	 * @returns {Date} A date since the bot was added to the site.
	 * @memberof Bot
	 */
	getCreatedAt() {
		return new Date(this.createdAt);
	}

	/**
	 * Gets the date since the bot was last updated.
	 * @returns {Date} A date since the bot was last updated.
	 * @memberof Bot
	 */
	getUpdatedAt() {
		return new Date(this.updatedAt);
	}
}

module.exports = Bot;