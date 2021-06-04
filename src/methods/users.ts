import fs from 'fs';
import path from 'path';
import assert from 'assert';
import superagent from 'superagent';
import { BASE_URL } from '../constants';
import { PaginatedResponse } from '../models/PaginatedResponse';
import { User } from '../models/User';
import { Bot } from '../models/Bot';

const version = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'package.json'), 'utf8')).version;

const getUser = (id: string): Promise<User> => {
	assert(typeof id === 'string', `Expected 'id' to be a 'string', got '${typeof id}'`);
	assert(id.length > 0, `Expected id.length > 0, got ${id.length}`);

	return superagent
		.get(`${BASE_URL}/users/${id}`)
		.set('User-Agent', `discordlist.space Library v${version}`)
		.then((result) => result.body);
};

const getUserBots = (id: string, token: string | null = null, page = 1, count = 16, sortBy = 'username', sortDirection: 'ascending' | 'descending' = 'ascending'): Promise<PaginatedResponse<Bot>> => {
	assert(typeof id === 'string', `Expected 'id' to be a 'string', got '${typeof id}'`);
	assert(id.length > 0, `Expected id.length > 0, got ${id.length}`);
	assert(typeof token === 'string' || token === null, `Expected 'token' to be a 'string' or null, got '${typeof token}'`);
	if (token !== null) assert(token.length > 0, `Expected token.length > 0, got ${token.length}`);
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
		.get(`${BASE_URL}/users/${id}/bots?${params.toString()}`)
		.set('User-Agent', `discordlist.space Library v${version}`)
		.set('Authorization', token || 'unauthorized')
		.then((result) => result.body);
};

const getUserServers = (id: string, token: string | null = null, page = 1, count = 16, sortBy = 'name', sortDirection: 'ascending' | 'descending' = 'ascending'): Promise<PaginatedResponse<Bot>> => {
	assert(typeof id === 'string', `Expected 'id' to be a 'string', got '${typeof id}'`);
	assert(id.length > 0, `Expected id.length > 0, got ${id.length}`);
	assert(typeof token === 'string' || token === null, `Expected 'token' to be a 'string' or null, got '${typeof token}'`);
	if (token !== null) assert(token.length > 0, `Expected token.length > 0, got ${token.length}`);
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
		.get(`${BASE_URL}/users/${id}/servers?${params.toString()}`)
		.set('User-Agent', `discordlist.space Library v${version}`)
		.set('Authorization', token || 'unauthorized')
		.then((result) => result.body);
};

export { getUser, getUserBots, getUserServers };