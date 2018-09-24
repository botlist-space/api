# botlist.space API
A simple library for connecting with the botlist.space API.

## Getting Started
Simply install by navigating to your project directory then running `npm i botlist.space`.

## Example

```js
const Client = require('botlist.space');

const client = new Client('bot ID', 'bot token from site');

client.getStats().then(stats => {
	console.log('The site has ' + stats.bots.approved + ' approved bots and ' + stats.bots.unapproved + ' unapproved bots.');
}).catch((e) => {
	console.error('Failed to get all bots. ' + e.code);
});

client.getAllBots().then(bots => {
	console.log('The site has a total of ' + bots.length + ' bots.');
}).catch((e) => {
	console.error('Failed to get all bots. ' + e.code);
});

client.getBot('228537642583588864').then(bot => {
	console.log('Vexera has ' + bot.server_count + ' servers.');
}).catch((e) => {
	console.error('Failed to get bot. ' + e.code);
});

client.getSelfBot().then(bot => {
	console.log('The name of the current bot is ' + bot.username + '.');
}).catch((e) => {
	console.error('Failed to get self bot. ' + e.code);
});

client.postServerCount(250).then(() => {
	console.log('Set the current bot\'s server count to 250 guilds.');
}).catch((e) => {
	console.error('Failed to post server count. ' + e.code);
});
```

## License
[Apache 2.0 License](https://github.com/botlist-space/api/blob/master/LICENSE)
