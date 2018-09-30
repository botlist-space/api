const Client = require('../lib/Client');

const client = new Client('307994108792799244', 'xxx');

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