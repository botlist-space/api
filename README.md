# botlist.space API
A simple library for connecting with the botlist.space API.

## Getting Started
Simply install by navigating to your project directory then running `npm i botlist.space`.

## Example

```js
const Client = require('botlist.space');

const client = new Client('<bot ID>', '<bot token from botlist.space>');

client.getStats().then(stats => {
	console.log(stats);
}).catch(error => {
	console.error('Failed to get site stats', error);
});

client.getAllBots().then(bots => {
	console.log(bots);
}).catch(error => {
	console.error('Failed to get all bots', error);
});

client.getBot('123').then(bot => {
	console.log(bot);
}).catch(error => {
	console.error('Failed to get bot', error);
});

client.getSelfBot().then(bot => {
	console.log(bot);
}).catch(error => {
	console.error('Failed to get self bot', error);
});

client.postServerCount(123).then(() => {
	console.log('Successfully updated server count');
}).catch(error => {
	console.error('Failed to post server count', error);
});

client.getServer('123').then(server => {
	console.log(server);
}).catch(error => {
	console.error('Failed to get server', error);
});
```

## License
[MIT](https://github.com/botlist-space/api/blob/master/LICENSE)
