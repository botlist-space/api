/**
 * A generic user returned from anywhere in the API.
 * @constructor
 */
class User {
	/**
	 * @param {object} user The raw user object that was sent from the API.
	 * @property {string} id The ID of the user.
	 * @property {string} avatarURL The absolute path of the avatar for the user.
	 * @property {string} username The username of the user.
	 * @property {string} discriminator The discriminator of the user.
	 * @property {string} shortDescription The short description of the user.
	 * @memberof User
	 */
	constructor(user) {
		this.id = user.id;
		this.avatarURL = user.avatar;
		this.username = user.username;
		this.discriminator = user.discriminator;
		this.shortDescription = user.short_description;
	}

	/**
	 * Gets the absolute URL for the user's profile.
	 * @returns {string} The absolute URL for the user's profile.
	 * @memberof User
	 */
	getURL() {
		return 'https://botlist.space/user/' + this.getID();
	}

	/**
	 * Gets the ID of the user.
	 * @returns {string} The ID of the user.
	 * @memberof User
	 */
	getID() {
		return this.id;
	}

	/**
	 * Gets the username of the user.
	 * @returns {string} The username of the user.
	 * @memberof User
	 */
	getUsername() {
		return this.username;
	}

	/**
	 * Gets the discriminator of the user.
	 * @returns {string} The discriminator of the user.
	 * @memberof User
	 */
	getDiscriminator() {
		return this.discriminator;
	}

	/**
	 * Gets the full username and discriminator of the user added together using a #.
	 * @returns {string} The full username and discriminator of the user added together using a #.
	 * @memberof User
	 */
	getTag() {
		return this.getUsername() + '#' + this.getDiscriminator();
	}

	/**
	 * Gets the full avatar URL of the user.
	 * @returns {string} The full avatar URL of the user.
	 * @memberof User
	 */
	getAvatarURL() {
		return this.avatarURL;
	}

	/**
	 * Gets the short description of the user.
	 * @returns {string} The short description of the user.
	 * @memberof Use
	 */
	getShortDescription() {
		return this.shortDescription;
	}
}

module.exports = User;