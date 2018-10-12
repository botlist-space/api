/* eslint-disable no-console */

const Client = require('../lib/Client');

const client = new Client('307994108792799244', 'xxx');

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