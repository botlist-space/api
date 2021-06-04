import fs from 'fs';
import path from 'path';
import assert from 'assert';
import superagent from 'superagent';
import { Statistics } from '../models/Statistics';
import { BASE_URL } from '../constants';
import { PaginatedResponse } from '../models/PaginatedResponse';
import { Language } from '../models/Language';
import { Tag } from '../models/Tag';

const version = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'package.json'), 'utf8')).version;

const allowedTagTypes = ['all', 'bot', 'server'];

const getStatistics = (): Promise<Statistics> => {
	return superagent
		.get(`${BASE_URL}/statistics`)
		.set('User-Agent', `discordlist.space Library v${version}`)
		.then((result) => result.body);
};

const getLanguages = (page = 1, count = 16, sortBy = 'name', sortDirection: 'ascending' | 'descending' = 'ascending'): Promise<PaginatedResponse<Language>> => {
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
		.get(`${BASE_URL}/languages?${params.toString()}`)
		.set('User-Agent', `discordlist.space Library v${version}`)
		.then((result) => result.body);
};

const getTags = (type: 'all' | 'bot' | 'server' = 'all', page = 1, count = 16, sortBy = 'name', sortDirection: 'ascending' | 'descending' = 'ascending'): Promise<PaginatedResponse<Tag>> => {
	assert(typeof type === 'string', `Expected 'type' to be a 'string', got '${typeof type}'`);
	assert(allowedTagTypes.includes(type), `Expected 'type' to be one of the allowed tag types, got '${type}'`);
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
	params.set('type', type);
	params.set('page', page.toString());
	params.set('count', count.toString());
	params.set('sortBy', sortBy);
	params.set('sortDirection', sortDirection);

	return superagent
		.get(`${BASE_URL}/tags?${params.toString()}`)
		.set('User-Agent', `discordlist.space Library v${version}`)
		.then((result) => result.body);
};

export { getStatistics, getLanguages, getTags };