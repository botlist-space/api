/**
 * A generic user returned from anywhere in the API.
 * @constructor
 */
class User {
	/**
	 * @param {Object} user The raw user object that was sent from the API.
	 * @property {String} id The ID of the user.
	 * @property {String} avatarURL The absolute path of the avatar for the user.
	 * @property {String} username The username of the user.
	 * @property {String} discriminator The discriminator of the user.
	 * @property {String} shortDescription The short description of the user.
	 * @property {Object} links An object containing social links for the user.
	 * @memberof User
	 */
	constructor(user) {
		this.id = user.id;
		this.avatarURL = user.avatar;
		this.username = user.username;
		this.discriminator = user.discriminator;
		this.shortDescription = user.short_description;
		this.links = user.links;
	}

	/**
	 * Gets the absolute URL for the user's profile.
	 * @returns {String} The absolute URL for the user's profile.
	 * @memberof User
	 */
	getURL() {
		return `https://botlist.space/user/${this.getID()}`;
	}

	/**
	 * Gets the ID of the user.
	 * @returns {String} The ID of the user.
	 * @memberof User
	 */
	getID() {
		return this.id;
	}

	/**
	 * Gets the username of the user.
	 * @returns {String} The username of the user.
	 * @memberof User
	 */
	getUsername() {
		return this.username;
	}

	/**
	 * Gets the discriminator of the user.
	 * @returns {String} The discriminator of the user.
	 * @memberof User
	 */
	getDiscriminator() {
		return this.discriminator;
	}

	/**
	 * Gets the full username and discriminator of the user added together using a #.
	 * @returns {String} The full username and discriminator of the user added together using a #.
	 * @memberof User
	 */
	getTag() {
		return `${this.getUsername()}#${this.getDiscriminator}`;
	}

	/**
	 * Gets the full avatar URL of the user.
	 * @returns {String} The full avatar URL of the user.
	 * @memberof User
	 */
	getAvatarURL() {
		return this.avatarURL;
	}

	/**
	 * Gets the short description of the user.
	 * @returns {String} The short description of the user.
	 * @memberof Use
	 */
	getShortDescription() {
		return this.shortDescription;
	}

	/**
	 * Gets the object containing social links for the user.
	 * @returns {Object} An object containing social links for the user.
	 * @memberof User
	 */
	getLinks() {
		return this.links;
	}
}

module.exports = User;