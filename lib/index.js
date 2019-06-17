const Client = require('./Client');
const WebSocket = require('./WebSocket');

const Bot = require('./Bot');
const Collection = require('./Collection');
const Error = require('./Error');
const Statistics = require('./Statistics');
const Upvote = require('./Upvote');
const User = require('./User');
const BotInviteEvent = require('./BotInviteEvent');
const BotUpvoteEvent = require('./BotUpvoteEvent');
const BotViewEvent = require('./BotViewEvent');
const CloseEvent = require('./CloseEvent');

module.exports = { Client, WebSocket, Bot, Collection, Error, Statistics, Upvote, User, BotInviteEvent, BotUpvoteEvent, BotViewEvent, CloseEvent };