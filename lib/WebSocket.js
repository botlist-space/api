const ws = require('ws');
const EventEmitter = require('events').EventEmitter;
const BotInviteEvent = require('./Structures/BotInviteEvent');
const BotViewEvent = require('./Structures/BotViewEvent');
const BotUpvoteEvent = require('./Structures/BotUpvoteEvent');
const CloseEvent = require('./Structures/CloseEvent');

const isObject = (obj) => !Array.isArray(obj) && obj === Object(obj);

/**
 * Creates a new gateway client.
 * @extends EventEmitter
 * @class
 */
class WebSocket extends EventEmitter {
	/**
	 * @param {object} options An object with options for the gateway.
	 * @param {array<string>} options.tokens An array of bot tokens, used as authentication.
	 * @param {boolean} [options.reconnect] Tells the websocket to reconnect after a disconnect. Always reconnects after a 4006 error.
	 * @param {number} [options.heartbeatInterval] The amount of seconds between heartbeats. Must be below or equal to 55.
	 */
	constructor(options) {
		super();

		if (!isObject(options)) throw new TypeError('Options must be an object');
		if (!Array.isArray(options.tokens) || !options.tokens.every((token) => typeof token === 'string')) throw new TypeError('\'tokens\' must be an array of strings');
		if ('heartbeatInterval' in options && typeof options.heartbeatInterval !== 'number') throw new TypeError('\'heartbeatInterval\' must be a number when provided');
		if ('heartbeatInterval' in options && options.heartbeatInterval > 55) throw new TypeError('\'heartbeatInterval\' must be less than or equal to 55');
		if ('reconnect' in options && typeof options.reconnect !== 'boolean') throw new TypeError('\'reconnect\' must be a boolean when provided');

		this._socket = new ws('wss://gateway.botlist.space');

		this._socket.on('open', this._onOpen.bind(this));
		this._socket.on('message', this._onMessage.bind(this));
		this._socket.on('close', this._onClose.bind(this));
		this._socket.on('error', this._onError.bind(this));

		this._heartbeat = null;

		this._options = {
			heartbeatInterval: options.heartbeatInterval || 45,
			reconnect: options.reconnect || true,
			tokens: options.tokens
		};
	}

	/**
	 * Called when the socket opens.
	 * @private
	 * @extends WebSocket
	 */
	_onOpen() {
		this.emit('connected');

		this._send(0, {
			tokens: this._options.tokens
		});

		this._heartbeat = setInterval(() => {
			if (this._socket.readyState === this._socket.OPEN) {
				this._sendHeartbeat();
			} else {
				clearInterval(this._heartbeat);

				this._heartbeat = null;
			}
		}, 1000 * this._options.heartbeatInterval);

		this._heartbeat.unref();
	}

	/**
	 * Called when the socket sends a message.
	 * @private
	 * @extends WebSocket
	 */
	_onMessage(payload) {
		try {
			payload = JSON.parse(payload);

			if (payload.op === 2) {
				this.emit('view', new BotViewEvent(payload.d));
			} else if (payload.op === 3) {
				this.emit('invite', new BotInviteEvent(payload.d));
			} else if (payload.op === 4) {
				this.emit('upvote', new BotUpvoteEvent(payload.d));

			}
		} catch (e) {
			this.emit('error', e);
		}
	}

	/**
	 * Called when the socket closes.
	 * @private
	 * @extends WebSocket
	 */
	_onClose(code, message) {
		clearInterval(this._heartbeat);
		this._heartbeat = null;

		if (this._options.reconnect || code === 4006) {
			delete this._socket;

			this._socket = new ws('wss://gateway.botlist.space');
			this._socket.on('open', this._onOpen.bind(this));
			this._socket.on('message', this._onMessage.bind(this));
			this._socket.on('close', this._onClose.bind(this));
			this._socket.on('error', this._onError.bind(this));
		}

		if (code !== 4006) this.emit('disconnected', new CloseEvent(code, message));
	}

	/**
	 * Called when the socket errors.
	 * @private
	 * @extends WebSocket
	 */
	_onError(...errors) {
		this.emit('error', ...errors);
	}

	/**
	 * Used to send a heartbeat to the server.
	 * @private
	 * @extends WebSocket
	 */
	_sendHeartbeat() {
		this._send(1, {});

		this.emit('heartbeat', Date.now());
	}

	/**
	 * Sends a payload to the server.
	 * @private
	 * @extends WebSocket
	 */
	_send(op, d) {
		this._socket.send(JSON.stringify({ op, t: Date.now(), d }));
	}
}

module.exports = WebSocket;