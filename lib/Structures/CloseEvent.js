/**
 * The class that holds information on close events.
 * @class
 * @param {number} code The close code.
 * @param {?string} message The close message.
 * @property {number} code The close code.
 * @property {?string} message The close message.
 */
class CloseEvent {
	constructor(code, message) {
		this.code = code;
		this.message = message;
	}
}

module.exports = CloseEvent;