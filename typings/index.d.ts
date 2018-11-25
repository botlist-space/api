// Type definitions for botlist.space v2.1.5
// Project: https://github.com/botlist-space/api
// Definitions by:
//   iREDMe <foodrickme@gmail.com> (https://github.com/iREDMe)
// License: MIT

declare module 'botlist.space' {

    export default class Client {
        constructor(id?: string, token?: string);

        public _baseURL: string;
        public _token?: string;
        public _id?: string;
        public getStats(): Promise<Statistics | HTTPError>;
        public getAllBots(): Promise<Collection<string, Bot> | HTTPError>;
        public getBot(id: string): Promise<Bot | HTTPError>;
        public getUpvotes(idsOnly?: boolean): Promise<Collection<string, User> | HTTPError>;
        public hasUpvoted(userID: string): Promise<boolean | HTTPError>;
        public getSelfBot(): Promise<Bot | HTTPError>;
        public postServerCount(count: number | number[]): Promise<GenericResult | HTTPError>;
        public getAllServers(): Promise<Collection<string, Server> | HTTPError>;
        public getServer(id: string): Promise<Server | HTTPError>;
        public getUser(id: string): Promise<User | HTTPError>;
    }

    export class Statistics {
        constructor(result: object);

        public bots: BotStatistics;
        public servers: number;
        public users: number;
        public getBots(): BotStatistics;
        public getServers(): number;
        public getUsers(): number;
    }
}

declare class BotStatistics {
    constructor(statistics: object);

    public total: number;
    public approved: number;
    public unapproved: number;
    public getTotal(): number;
    public getApproved(): number;
    public getUnapproved(): number;
}

declare class Bot {
    constructor(bot: object);
    
    public id: string;
    public username: string;
    public discriminator: string;
    public shortDescription: string;
    public fullDescription: string;
    public avatarURL: string;
    public invite: string;
    public avatarChildFriendly: boolean;
    public library: string;
    public prefix: string;
    public owners: Collection<string, User>;
    public vanity?: string;
    public premium: boolean;
    public featured: boolean;
    public links: {
        github: string;
        gitlab: string;
    }
    public timestamp: number;
    public getURL(): string;
    public getID(): string;
    public getUsername(): string;
    public getDiscriminator(): string;
    public getTag(): string;
    public getShortDescription(): string;
    public getFullDescription(): string;
    public getAvatarURL(): string;
    public getInvite(): string;
    public getPrefix(): string;
    public getOwners(): string;
    public getVanity(): string | null;
    public isPremium(): boolean;
    public isFeatured(): boolean;
    public isNSFW(): boolean;
    public getLinks(): { github: string, gitlab: string };
    public getTimestamp(): Date;
}

declare class Collection<K, V> extends Map<K, V> {
    public filter(func: (v: V, k: K) => boolean): Collection<K, V>;
    public map<T>(func: (v: V, k: K) => T): T[];
    public toArray(): V[];
    public toKeyArray(): K[];
    public toJSON(): string;
}

declare class HTTPError {
    constructor(error: object);
    public code: number;
    public message: string;
    public getCode(): number;
    public getMessage(): string;
}

declare class GenericResult {
    constructor(result: object);
}

declare class Server {
    constructor(server: object);
}