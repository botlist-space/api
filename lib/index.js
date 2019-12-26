const Client = require('./Client');

/**
 * @param {object} options An object with client options.
 * @param {string} options.id The ID of the bot.
 * @param {string} options.botToken The token provided from the bots's token page.
 */
function BotList(options) {
  return new Client(options);
}

BotList.Client = Client;
BotList.WebSocket = require('./WebSocket');
BotList.Bot = require('./Structures/Bot');
BotList.Collection = require('./Structures/Collection');
BotList.Error = require('./Structures/Error');
BotList.Statistics = require('./Structures/Statistics');
BotList.Upvote = require('./Structures/Upvote');
BotList.User = require('./Structures/User');
BotList.BotInviteEvent = require('./Structures/BotInviteEvent');
BotList.BotUpvoteEvent = require('./Structures/BotUpvoteEvent');
BotList.BotViewEvent = require('./Structures/BotViewEvent');
BotList.CloseEvent = require('./Structures/CloseEvent');

module.exports = BotList;