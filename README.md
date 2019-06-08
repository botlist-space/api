# botlist.space API
A simple library for connecting with the botlist.space API.

## Getting Started
Simply install by navigating to your project directory then running `npm i botlist.space`.

## API Example
```js
const BotList = require('botlist.space');

const client = new BotList.Client({ id: '12345678900000000', botToken: 'xxx' });

client.getStatistics().then((stats) => /* ... */).catch((error) => /* ... */);
client.getAllBots().then((bots) => /* ... */).catch((error) => /* ... */);
client.getBot('12345678900000001').then((bot) => /* ... */).catch((error) => /* ... */);
client.getUpvotes().then((upvotes) => /* ... */).catch((error) => /* ... */);
client.hasUpvoted('12345678900000002').then((hasUpvoted) => /* ... */).catch((error) => /* ... */);
client.getSelfBot().then((bot) => /* ... */).catch((error) => /* ... */);
client.postServerCount(12345).then((bot) => /* ... */).catch((error) => /* ... */); // Server count
client.postServerCount([ 1250, 1250, 1250 ]).then((bot) => /* ... */).catch((error) => /* ... */); // Shards
client.getUser('12345678900000002').then((user) => /* ... */).catch((error) => /* ... */);
client.getUserBots('12345678900000002').then((bots) => /* ... */).catch((error) => /* ... */);
```

## WebSocket Example
```js
const BotList = require('botlist.space');

const client = new BotList.WebSocket({ tokens: [ 'xxx', 'xxx', 'xxx' ], reconnect: true });

client.on('connected', () => {
    console.log('Successfully connected to the botlist.space gateway');
});

client.on('view', (event) => {
    console.log('Someone has viewed one of my bots: ' + event.bot.username);
});

client.on('invite', (event) => {
    console.log('Someone has invited one of my bots: ' + event.bot.username);
});

client.on('upvote', (event) => {
    console.log(event.user.username + 'has upvoted one of my bots: ' + event.bot.username);
});

client.on('close', (event) => {
    console.log('The gateway was closed', event);
});
```

## Documentation
[https://botlist-space.github.io/api/](https://botlist-space.github.io/api/)

## API Documentation
[https://docs.botlist.space](https://docs.botlist.space)

## License
[MIT](https://github.com/botlist-space/api/blob/master/LICENSE)