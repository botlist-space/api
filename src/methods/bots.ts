import fs from 'fs';
import path from 'path';
import superagent from 'superagent';
import assert from 'assert';
import { Bot, BotUpdateProperties } from '../models/Bot';
import { Review } from '../models/Review';
import { PaginatedResponse } from '../models/PaginatedResponse';
import { BotAnalytics } from '../models/Analytics';
import { BASE_URL } from '../constants';
import { Upvote, UserUpvoteStatus, UserUpvoteCount } from '../models/Upvote';
import { AuditLog } from '../models/AuditLog';
import { User } from '../models/User';

const version = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'package.json'), 'utf8')).version;

const allowedFilters = ['approved', 'safeAvatar'];
const discordInviteRegEx = /^https?:\/\/discord(app)?\.com(\/api)?\/oauth2\/authorize/;
const discordServerRegEx = /^(?:https?:\/\/discord\.gg\/)?([A-Za-z0-9-.]+)$/;

const getBots = (page = 1, count = 16, sortBy = 'top', sortDirection: 'ascending' | 'descending' = 'descending', query = '', filters: string[] = ['approved'], tags: string[] = []): Promise<PaginatedResponse<Bot>> => {
	assert(typeof page === 'number', `Expected 'page' to be a 'number', got '${typeof page}'`);
	assert(page >= 1, `Expected page >= 1, got ${page}`);
	assert(typeof count === 'number', `Expected 'count' to be a 'number', got '${typeof count}'`);
	assert(count >= 1, `Expected count >= 1, got ${count}`);
	assert(count <= 50, `Expected count <= 50, got ${count}`);
	assert(Number.isInteger(count), `Expected 'count' to be an integer, got ${count}`);
	assert(typeof sortBy === 'string', `Expected 'sortBy' to be a 'string', got '${typeof sortBy}'`);
	assert(sortBy.length >= 0, `Expected sortBy.length >= 0, got ${sortBy.length}`);
	assert(typeof sortDirection === 'string', `Expected 'sortDirection' to be a 'string', got '${sortDirection}'`);
	assert(sortDirection === 'ascending' || sortDirection === 'descending', `Expected 'sortDirection' to be either 'ascending' or 'descending', got ${sortDirection}`);
	assert(typeof query === 'string' || query === null || query === undefined, `Expected 'query' to be either a 'string', null, or undefined, got ${query}`);
	assert(Array.isArray(filters), `Expected 'filters' to be an array, got ${filters.constructor?.toString() ?? filters.toString()}`);
	assert(!filters.find((filter) => !allowedFilters.includes(filter)), `Expected 'filters' to only contain allowed values, found ${filters.find((filter) => !allowedFilters.includes(filter))}`);
	assert(Array.isArray(tags), `Expected 'tags' to be an array, got ${tags.constructor?.toString() ?? tags.toString()}`);

	const params = new URLSearchParams();
	params.set('page', page.toString());
	params.set('count', count.toString());
	params.set('sortBy', sortBy);
	params.set('sortDirection', sortDirection);
	if (query.length > 0) params.set('query', query);
	if (filters.length > 0) params.set('filters', filters.join(','));
	if (tags.length > 0) params.set('tags', tags.join(','));

	return superagent
		.get(`${BASE_URL}/bots?${params.toString()}`)
		.set('User-Agent', `discordlist.space Library v${version}`)
		.then((result) => result.body);
};

const getBot = (id: string): Promise<Bot | null> => {
	assert(typeof id === 'string', `Expected 'id' to be a 'string', got '${typeof id}'`);
	assert(id.length > 0, `Expected id.length > 0, got ${id.length}`);

	return superagent
		.get(`${BASE_URL}/bots/${id}`)
		.set('User-Agent', `discordlist.space Library v${version}`)
		.then((result) => result.body);
};

const updateBot = (id: string, token: string, form: Partial<BotUpdateProperties>): Promise<{ success: true }> => {
	assert(typeof id === 'string', `Expected 'id' to be a 'string', got '${typeof id}'`);
	assert(id.length > 0, `Expected id.length > 0, got ${id.length}`);
	assert(typeof token === 'string', `Expected 'token' to be a 'string', got '${typeof token}'`);
	assert(token.length > 0, `Expected token.length > 0, got ${token.length}`);
	assert(typeof form === 'object', `Expected 'form' to be an 'object', got '${typeof form}'`);
	assert(Object.keys(form).length > 0, 'Expected \'form\' to have at least one property, got none');

	if (Object.prototype.hasOwnProperty.call(form, 'shortDescription')) {
		assert(typeof form.shortDescription === 'string', `Expected 'form.shortDescription' to be a 'string', got '${typeof form.shortDescription}'`);
		assert(form.shortDescription.length > 0, `Expected form.shortDescription.length > 0, got ${form.shortDescription.length}`);
	}

	if (Object.prototype.hasOwnProperty.call(form, 'fullDescription')) {
		assert(typeof form.fullDescription === 'string', `Expected 'form.fullDescription' to be a 'string', got '${typeof form.fullDescription}'`);
		assert(form.fullDescription.length >= 0, `Expected form.fullDescription.length >= 0, got ${form.fullDescription.length}`);
	}

	if (Object.prototype.hasOwnProperty.call(form, 'inviteURL')) {
		assert(typeof form.inviteURL === 'string', `Expected 'form.inviteURL' to be a 'string', got '${typeof form.inviteURL}'`);
		assert(form.inviteURL.length > 0, `Expected form.inviteURL.length > 0, got ${form.inviteURL.length}`);
		assert(discordInviteRegEx.test(form.inviteURL), '\'form.inviteURL\' did not match the Discord invite RegEx');
	}

	if (Object.prototype.hasOwnProperty.call(form, 'prefix')) {
		assert(typeof form.prefix === 'string', `Expected 'form.prefix' to be a 'string', got '${typeof form.prefix}'`);
		assert(form.prefix.length > 0, `Expected form.prefix.length > 0, got ${form.prefix.length}`);
		assert(form.prefix.length <= 16, `Expected form.prefix.length <= 16, got ${form.prefix.length}`);
	}

	if (Object.prototype.hasOwnProperty.call(form, 'safeAvatar')) {
		assert(typeof form.safeAvatar === 'boolean', `Expected 'form.safeAvatar' to be a 'boolean', got '${typeof form.safeAvatar}'`);
	}

	if (Object.prototype.hasOwnProperty.call(form, 'supportServer')) {
		assert(typeof form.supportServer === 'string' || form.supportServer === null, `Expected 'form.supportServer' to be a 'string' or null, got '${typeof form.supportServer}'`);

		if (form.supportServer !== null) {
			assert(form.supportServer.length > 0, `Expected form.supportServer.length > 0, got ${form.supportServer.length}`);
			assert(form.supportServer.length <= 32, `Expected form.supportServer.length <= 32, got ${form.supportServer.length}`);
			assert(discordServerRegEx.test(form.supportServer), '\'form.supportServer\' did not match the Discord server invite RegEx');
		}
	}

	if (Object.prototype.hasOwnProperty.call(form, 'tags')) {
		assert(Array.isArray(form.tags), `Expected 'form.tags' to be an 'array', got ${typeof form.tags}`);
	}

	if (Object.prototype.hasOwnProperty.call(form, 'languages')) {
		assert(Array.isArray(form.languages), `Expected 'form.languages' to be an 'array', got ${typeof form.languages}`);
	}

	if (Object.prototype.hasOwnProperty.call(form, 'vanity')) {
		assert(typeof form.vanity === 'string' || form.vanity === null, `Expected 'form.vanity' to be a 'string' or null, got ${typeof form.vanity}`);

		if (form.vanity !== null) {
			assert(form.vanity.length > 0, `Expected form.vanity.length > 0, got ${form.vanity.length}`);
		}
	}

	if (Object.prototype.hasOwnProperty.call(form, 'websiteURL')) {
		assert(typeof form.websiteURL === 'string' || form.websiteURL === null, `Expected 'form.websiteURL' to be a 'string' or null, got ${typeof form.websiteURL}`);

		if (form.websiteURL !== null) {
			assert(form.websiteURL.length > 0, `Expected form.websiteURL.length > 0, got ${form.websiteURL.length}`);
		}
	}

	if (Object.prototype.hasOwnProperty.call(form, 'serverCount')) {
		assert(typeof form.serverCount === 'number' || form.serverCount === null, `Expected 'form.serverCount' to be a 'number' or null, got ${typeof form.serverCount}`);

		if (form.serverCount !== null) {
			assert(form.serverCount >= 0, `Expected form.serverCount >= 0, got ${form.serverCount}`);
			assert(Number.isInteger(form.serverCount), `Expected 'form.serverCount' to be an integer, got ${form.serverCount}`);
		}
	}

	if (Object.prototype.hasOwnProperty.call(form, 'active')) {
		assert(typeof form.active === 'boolean', `Expected 'form.active' to be a 'boolean', got ${typeof form.active}`);
	}

	return superagent
		.post(`${BASE_URL}/bots/${id}`)
		.set('Authorization', token)
		.set('Content-Type', 'application/json')
		.set('User-Agent', `discordlist.space Library v${version}`)
		.send(form)
		.then((result) => result.body);
};

const getBotReviews = (id: string, token: string, page = 1, count = 16, sortBy = 'top', sortDirection: 'ascending' | 'descending' = 'descending'): Promise<PaginatedResponse<Review>> => {
	assert(typeof id === 'string', `Expected 'id' to be a 'string', got '${typeof id}'`);
	assert(id.length > 0, `Expected id.length > 0, got ${id.length}`);
	assert(typeof page === 'number', `Expected 'page' to be a 'number', got '${typeof page}'`);
	assert(page >= 1, `Expected page >= 1, got ${page}`);
	assert(typeof count === 'number', `Expected 'count' to be a 'number', got '${typeof count}'`);
	assert(count >= 1, `Expected count >= 1, got ${count}`);
	assert(count <= 50, `Expected count <= 50, got ${count}`);
	assert(Number.isInteger(count), `Expected 'count' to be an integer, got ${count}`);
	assert(typeof sortBy === 'string', `Expected 'sortBy' to be a 'string', got '${typeof sortBy}'`);
	assert(sortBy.length >= 0, `Expected sortBy.length >= 0, got ${sortBy.length}`);
	assert(typeof sortDirection === 'string', `Expected 'sortDirection' to be a 'string', got '${sortDirection}'`);
	assert(sortDirection === 'ascending' || sortDirection === 'descending', `Expected 'sortDirection' to be either 'ascending' or 'descending', got ${sortDirection}`);

	const params = new URLSearchParams();
	params.set('page', page.toString());
	params.set('count', count.toString());
	params.set('sortBy', sortBy);
	params.set('sortDirection', sortDirection);

	return superagent
		.get(`${BASE_URL}/bots/${id}/reviews?${params.toString()}`)
		.set('User-Agent', `discordlist.space Library v${version}`)
		.then((result) => result.body);
};

const getBotAnalytics = (id: string, token: string, from = Date.now() - 1000 * 60 * 60 * 24 * 7, to = Date.now()): Promise<PaginatedResponse<BotAnalytics>> => {
	assert(typeof id === 'string', `Expected 'id' to be a 'string', got '${typeof id}'`);
	assert(id.length > 0, `Expected id.length > 0, got ${id.length}`);
	assert(typeof token === 'string', `Expected 'token' to be a 'string', got '${typeof token}'`);
	assert(token.length > 0, `Expected token.length > 0, got ${token.length}`);
	assert(typeof from === 'number', `Expected 'from' to be a 'number', got '${typeof from}'`);
	assert(from >= 0, `Expected from >= 0, got ${from}`);
	assert(Number.isInteger(from), `Expected 'from' to be an integer, got ${from}`);
	assert(from < to, `Expected from < to, got ${from} < ${to}`);
	assert(typeof to === 'number', `Expected 'to' to be a 'number', got '${typeof to}'`);
	assert(to >= 0, `Expected to >= 0, got ${to}`);
	assert(Number.isInteger(to), `Expected 'to' to be an integer, got ${to}`);
	assert(to <= Date.now(), `Expected to < ${Date.now()}, got ${to}`);

	const params = new URLSearchParams();
	params.set('from', from.toString());
	params.set('to', to.toString());

	return superagent
		.get(`${BASE_URL}/bots/${id}/analytics?${params.toString()}`)
		.set('User-Agent', `discordlist.space Library v${version}`)
		.set('Authorization', token)
		.then((result) => result.body);
};

const getBotUpvotes = (id: string, token: string, page = 1, count = 16, sortBy = 'timestamp', sortDirection: 'ascending' | 'descending' = 'ascending'): Promise<PaginatedResponse<Upvote>> => {
	assert(typeof id === 'string', `Expected 'id' to be a 'string', got '${typeof id}'`);
	assert(id.length > 0, `Expected id.length > 0, got ${id.length}`);
	assert(typeof token === 'string', `Expected 'token' to be a 'string', got '${typeof token}'`);
	assert(token.length > 0, `Expected token.length > 0, got ${token.length}`);
	assert(typeof page === 'number', `Expected 'page' to be a 'number', got '${typeof page}'`);
	assert(page >= 1, `Expected page >= 1, got ${page}`);
	assert(typeof count === 'number', `Expected 'count' to be a 'number', got '${typeof count}'`);
	assert(count >= 1, `Expected count >= 1, got ${count}`);
	assert(count <= 50, `Expected count <= 50, got ${count}`);
	assert(Number.isInteger(count), `Expected 'count' to be an integer, got ${count}`);
	assert(typeof sortBy === 'string', `Expected 'sortBy' to be a 'string', got '${typeof sortBy}'`);
	assert(sortBy.length >= 0, `Expected sortBy.length >= 0, got ${sortBy.length}`);
	assert(typeof sortDirection === 'string', `Expected 'sortDirection' to be a 'string', got '${sortDirection}'`);
	assert(sortDirection === 'ascending' || sortDirection === 'descending', `Expected 'sortDirection' to be either 'ascending' or 'descending', got ${sortDirection}`);

	const params = new URLSearchParams();
	params.set('page', page.toString());
	params.set('count', count.toString());
	params.set('sortBy', sortBy.toString());
	params.set('sortDirection', sortDirection.toString());

	return superagent
		.get(`${BASE_URL}/bots/${id}/upvotes?${params.toString()}`)
		.set('User-Agent', `discordlist.space Library v${version}`)
		.set('Authorization', token)
		.then((result) => result.body);
};

const getBotUserUpvoteStatus = (botID: string, userID: string, token: string): Promise<UserUpvoteStatus> => {
	assert(typeof botID === 'string', `Expected 'botID' to be a 'string', got '${typeof botID}'`);
	assert(botID.length > 0, `Expected botID.length > 0, got ${botID.length}`);
	assert(typeof userID === 'string', `Expected 'userID' to be a 'string', got '${typeof userID}'`);
	assert(userID.length > 0, `Expected userID.length > 0, got ${userID.length}`);
	assert(typeof token === 'string', `Expected 'token' to be a 'string', got '${typeof token}'`);
	assert(token.length > 0, `Expected token.length > 0, got ${token.length}`);

	return superagent
		.get(`${BASE_URL}/bots/${botID}/upvotes/status/${userID}`)
		.set('User-Agent', `discordlist.space Library v${version}`)
		.set('Authorization', token)
		.then((result) => result.body);
};

const getBotUpvoteLeaderboard = (id: string, token: string, page = 1, count = 16, sortBy = 'count', sortDirection: 'ascending' | 'descending' = 'descending'): Promise<PaginatedResponse<UserUpvoteCount>> => {
	assert(typeof id === 'string', `Expected 'id' to be a 'string', got '${typeof id}'`);
	assert(id.length > 0, `Expected id.length > 0, got ${id.length}`);
	assert(typeof token === 'string', `Expected 'token' to be a 'string', got '${typeof token}'`);
	assert(token.length > 0, `Expected token.length > 0, got ${token.length}`);
	assert(typeof page === 'number', `Expected 'page' to be a 'number', got '${typeof page}'`);
	assert(page >= 1, `Expected page >= 1, got ${page}`);
	assert(typeof count === 'number', `Expected 'count' to be a 'number', got '${typeof count}'`);
	assert(count >= 1, `Expected count >= 1, got ${count}`);
	assert(count <= 50, `Expected count <= 50, got ${count}`);
	assert(Number.isInteger(count), `Expected 'count' to be an integer, got ${count}`);
	assert(typeof sortBy === 'string', `Expected 'sortBy' to be a 'string', got '${typeof sortBy}'`);
	assert(sortBy.length >= 0, `Expected sortBy.length >= 0, got ${sortBy.length}`);
	assert(typeof sortDirection === 'string', `Expected 'sortDirection' to be a 'string', got '${sortDirection}'`);
	assert(sortDirection === 'ascending' || sortDirection === 'descending', `Expected 'sortDirection' to be either 'ascending' or 'descending', got ${sortDirection}`);

	const params = new URLSearchParams();
	params.set('page', page.toString());
	params.set('count', count.toString());
	params.set('sortBy', sortBy);
	params.set('sortDirection', sortDirection);

	return superagent
		.get(`${BASE_URL}/bots/${id}/upvotes/leaderboard?${params.toString()}`)
		.set('User-Agent', `discordlist.space Library v${version}`)
		.set('Authorization', token)
		.then((result) => result.body);
};

const getBotAuditLog = (id: string, token: string, page = 1, count = 16, sortBy = 'timestamp', sortDirection: 'ascending' | 'descending' = 'descending'): Promise<PaginatedResponse<AuditLog>> => {
	assert(typeof id === 'string', `Expected 'id' to be a 'string', got '${typeof id}'`);
	assert(id.length > 0, `Expected id.length > 0, got ${id.length}`);
	assert(typeof token === 'string', `Expected 'token' to be a 'string', got '${typeof token}'`);
	assert(token.length > 0, `Expected token.length > 0, got ${token.length}`);
	assert(typeof page === 'number', `Expected 'page' to be a 'number', got '${typeof page}'`);
	assert(page >= 1, `Expected page >= 1, got ${page}`);
	assert(typeof count === 'number', `Expected 'count' to be a 'number', got '${typeof count}'`);
	assert(count >= 1, `Expected count >= 1, got ${count}`);
	assert(count <= 50, `Expected count <= 50, got ${count}`);
	assert(Number.isInteger(count), `Expected 'count' to be an integer, got ${count}`);
	assert(typeof sortBy === 'string', `Expected 'sortBy' to be a 'string', got '${typeof sortBy}'`);
	assert(sortBy.length >= 0, `Expected sortBy.length >= 0, got ${sortBy.length}`);
	assert(typeof sortDirection === 'string', `Expected 'sortDirection' to be a 'string', got '${sortDirection}'`);
	assert(sortDirection === 'ascending' || sortDirection === 'descending', `Expected 'sortDirection' to be either 'ascending' or 'descending', got ${sortDirection}`);

	const params = new URLSearchParams();
	params.set('page', page.toString());
	params.set('count', count.toString());
	params.set('sortBy', sortBy);
	params.set('sortDirection', sortDirection);

	return superagent
		.get(`${BASE_URL}/bots/${id}/audit?${params.toString()}`)
		.set('User-Agent', `discordlist.space Library v${version}`)
		.set('Authorization', token)
		.then((result) => result.body);
};

const getBotOwners = (id: string, page = 1, count = 16, sortBy = 'id', sortDirection: 'ascending' | 'descending' = 'ascending'): Promise<PaginatedResponse<User>> => {
	assert(typeof id === 'string', `Expected 'id' to be a 'string', got '${typeof id}'`);
	assert(id.length > 0, `Expected id.length > 0, got ${id.length}`);
	assert(typeof page === 'number', `Expected 'page' to be a 'number', got '${typeof page}'`);
	assert(page >= 1, `Expected page >= 1, got ${page}`);
	assert(typeof count === 'number', `Expected 'count' to be a 'number', got '${typeof count}'`);
	assert(count >= 1, `Expected count >= 1, got ${count}`);
	assert(count <= 50, `Expected count <= 50, got ${count}`);
	assert(Number.isInteger(count), `Expected 'count' to be an integer, got ${count}`);
	assert(typeof sortBy === 'string', `Expected 'sortBy' to be a 'string', got '${typeof sortBy}'`);
	assert(sortBy.length >= 0, `Expected sortBy.length >= 0, got ${sortBy.length}`);
	assert(typeof sortDirection === 'string', `Expected 'sortDirection' to be a 'string', got '${sortDirection}'`);
	assert(sortDirection === 'ascending' || sortDirection === 'descending', `Expected 'sortDirection' to be either 'ascending' or 'descending', got ${sortDirection}`);

	const params = new URLSearchParams();
	params.set('page', page.toString());
	params.set('count', count.toString());
	params.set('sortBy', sortBy);
	params.set('sortDirection', sortDirection);

	return superagent
		.get(`${BASE_URL}/bots/${id}/owners`)
		.set('User-Agent', `discordlist.space Library v${version}`)
		.then((result) => result.body);
};

export { getBots, getBot, updateBot, getBotReviews, getBotAnalytics, getBotUpvotes, getBotUserUpvoteStatus, getBotUpvoteLeaderboard, getBotAuditLog, getBotOwners };