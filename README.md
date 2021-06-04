# discordlist.space API
The official Node.js library to interact with the discordlist.space API.

## Getting Started
Simply install by navigating to your project directory then running `npm i discordlist.space`.

## API Example
```typescript
const api = require('discordlist.space');

// GET /v2/statistics
api.getStatistics();

// GET /v2/languages?page=1&count=16&sortBy=name&sortDirection=ascending
api.getLanguages(page = 1, count = 16, sortBy = 'name', sortDirection: 'ascending' | 'descending' = 'ascending');

// GET /v2/tags?type=all&page=1&count=16&sortBy=name&sortDirection=ascending
api.getTags(type: 'all' | 'bot' | 'server' = 'all', page = 1, count = 16, sortBy = 'name', sortDirection: 'ascending' | 'descending' = 'ascending');

// GET /v2/bots?page=1&count=16&sortBy=top&sortDirection=descending
api.getBots(page = 1, count = 16, sortBy = 'top', sortDirection: 'ascending' | 'descending' = 'descending', query = '', filters: string[] = ['approved'], tags: string[] = []);

// GET /v2/bots/:id
api.getBot(id: string);

// POST /v2/bots/:id
api.updateBot(id: string, token: string, form: BotUpdateProperties);

// GET /v2/bots/:id/reviews?page=1&count=16&sortBy=top&sortDirection=descending
api.getBotReviews(id: string, token: string, page = 1, count = 16, sortBy = 'top', sortDirection: 'ascending' | 'descending' = 'descending');

// GET /v2/bots/:id/analytics?from=<1 week ago>&to=<now>
api.getBotAnalytics(id: string, token: string, from = Date.now() - 1000 * 60 * 60 * 24 * 7, to = Date.now());

// GET /v2/bots/:id/upvotes
api.getBotUpvotes(id: string, token: string, page = 1, count = 16, sortBy = 'timestamp', sortDirection: 'ascending' | 'descending' = 'ascending');

// GET /v2/bots/:botID/upvotes/status/:userID
api.getBotUserUpvoteStatus(botID: string, userID: string, token: string);

// GET /v2/bots/:id/upvotes/leaderboard?page=1&count=16&sortBy=count&sortDirection=descending
api.getBotUpvoteLeaderboard(id: string, token: string, page = 1, count = 16, sortBy = 'count', sortDirection: 'ascending' | 'descending' = 'descending');

// GET /v2/bots/:id/audit?page=1&count=16&sortBy=timestamp&sortDirection=descending
api.getBotAuditLog(id: string, token: string, page = 1, count = 16, sortBy = 'timestamp', sortDirection: 'ascending' | 'descending' = 'descending');

// GET /v2/bots/:id/owners?page=16&count=16&sortBy=id&sortDirection=ascending
api.getBotOwners(id: string, page = 1, count = 16, sortBy = 'id', sortDirection: 'ascending' | 'descending' = 'ascending');

// GET /v2/servers?page=1&count=16&sortBy=top&sortDirection=descending
api.getServers(page = 1, count = 16, sortBy = 'top', sortDirection: 'ascending' | 'descending' = 'descending', query = '', filters: string[] = ['approved'], tags: string[] = []);

// GET /v2/servers/:id
api.getServer(id: string);

// POST /v2/servers/:id
api.updateServer(id: string, token: string, form: ServerUpdateProperties);

// GET /v2/servers/:id/reviews?page=1&count=16&sortBy=top&sortDirection=descending
api.getServerReviews(id: string, token: string, page = 1, count = 16, sortBy = 'top', sortDirection: 'ascending' | 'descending' = 'descending');

// GET /v2/servers/:id/analytics?from=<1 week ago>&to=<now>
api.getServerAnalytics(id: string, token: string, from = Date.now() - 1000 * 60 * 60 * 24 * 7, to = Date.now());

// GET /v2/servers/:id/upvotes
api.getServerUpvotes(id: string, token: string, page = 1, count = 16, sortBy = 'timestamp', sortDirection: 'ascending' | 'descending' = 'ascending');

// GET /v2/bots/:botID/upvotes/status/:userID
api.getServerUserUpvoteStatus(botID: string, userID: string, token: string);

// GET /v2/servers/:id/upvotes/leaderboard?page=1&count=16&sortBy=count&sortDirection=descending
api.getServerUpvoteLeaderboard(id: string, token: string, page = 1, count = 16, sortBy = 'count', sortDirection: 'ascending' | 'descending' = 'descending');

// GET /v2/servers/:id/audit?page=1&count=16&sortBy=timestamp&sortDirection=descending
api.getServerAuditLog(id: string, token: string, page = 1, count = 16, sortBy = 'timestamp', sortDirection: 'ascending' | 'descending' = 'descending');

// GET /v2/servers/:id/owners?page=16&count=16&sortBy=id&sortDirection=ascending
api.getServerOwners(id: string, page = 1, count = 16, sortBy = 'id', sortDirection: 'ascending' | 'descending' = 'ascending');

// GET /v2/users/:id
api.getUser(id: string);

// GET /v2/users/:id/bots?page=1&count=16&sortBy=username&sortDirection=ascending
api.getUserBots(id: string, token: string | null = null, page = 1, count = 16, sortBy = 'username', sortDirection: 'ascending' | 'descending' = 'ascending');

// GET /v2/users/:id/servers?page=1&count=16&sortBy=name&sortDirection=ascending
api.getUserServers(id: string, token: string | null = null, page = 1, count = 16, sortBy = 'name', sortDirection: 'ascending' | 'descending' = 'ascending');
```

## API Documentation
[https://docs.discordlist.space](https://docs.discordlist.space)

## License
[MIT](https://github.com/discordlist-space/api/blob/master/LICENSE)