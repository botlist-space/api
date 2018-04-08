const Client = require('../lib/Client');

const client = new Client('307994108792799244', 'xxx');

client.getStats().then(stats => {
	console.log('The site has ' + stats.approvedBots + ' approved bots and ' + stats.unapprovedBots + ' unapproved bots.');
}).catch((e) => {
	console.error('Failed to get all bots. ' + e.code);
});

client.getAllBots().then(bots => {
	console.log('The site has a total of ' + bots.length + ' bots.');
}).catch((e) => {
	console.error('Failed to get all bots. ' + e.code);
});

client.getBot('228537642583588864').then(bot => {
	console.log('Vexera has ' + bot.count + ' servers.');
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