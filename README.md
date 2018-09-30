# botlist.space API
A simple library for connecting with the botlist.space API.

## Getting Started
Simply install by navigating to your project directory then running `npm i botlist.space`.

## Example

```js
const Client = require('botlist.space');

const client = new Client('<bot ID>', '<bot token from botlist.space>');

client.getStats().then(stats => {
	console.log('The site has ' + stats.bots.approved + ' approved bots and ' + stats.bots.unapproved + ' unapproved bots.');
}).catch(error => {
	console.error('Failed to get all bots.', error);
});

client.getAllBots().then(bots => {
	console.log('The site has a total of ' + bots.length + ' bots.');
}).catch(error => {
	console.error('Failed to get all bots.', error);
});

client.getBot('307994108792799244').then(bot => {
	console.log('Guess That Number has ' + bot.server_count + ' servers.');
}).catch(error => {
	console.error('Failed to get bot.', error);
});

client.getSelfBot().then(bot => {
	console.log('The name of the current bot is ' + bot.username + '.');
}).catch(error => {
	console.error('Failed to get self bot.', error);
});

client.postServerCount(250).then(() => {
	console.log('Set the current bot\'s server count to 250 guilds.');
}).catch(error => {
	console.error('Failed to post server count.', error);
});
```

## License
[Apache 2.0 License](https://github.com/botlist-space/api/blob/master/LICENSE)
