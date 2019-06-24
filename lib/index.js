const Client = require('./Client');
const WebSocket = require('./WebSocket');

const Bot = require('./Structures/Bot');
const Collection = require('./Structures/Collection');
const Error = require('./Structures/Error');
const Statistics = require('./Structures/Statistics');
const Upvote = require('./Structures/Upvote');
const User = require('./Structures/User');
const BotInviteEvent = require('./Structures/BotInviteEvent');
const BotUpvoteEvent = require('./Structures/BotUpvoteEvent');
const BotViewEvent = require('./Structures/BotViewEvent');
const CloseEvent = require('./Structures/CloseEvent');

module.exports = { Client, WebSocket, Bot, Collection, Error, Statistics, Upvote, User, BotInviteEvent, BotUpvoteEvent, BotViewEvent, CloseEvent };