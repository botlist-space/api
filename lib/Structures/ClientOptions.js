/**
 * @typedef {object} ClientOptions Options when instantiating the Client.
 * @property {string} [id] A bot ID.
 * @property {string} [botToken] A bot token from the site. This and/or userToken must be present.
 * @property {string} [userToken] A user token from the site. This and/or botToken must be present.
 */
module.exports = {
	id: null,
	botToken: null,
	userToken: null,
};