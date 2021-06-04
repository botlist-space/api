import { User } from './User';
import { Tag } from './Tag';
import { Language } from './Language';

interface Bot {
    id: string,
    username: string,
    discriminator: string,
    avatar: string | null,
    shortDescription: string,
    fullDescription: string,
    active: boolean,
    inviteURL: string,
    supportServer: string | null,
    safeAvatar: boolean,
    owner: User,
    secondaryOwners: User[],
    serverCount: number | null,
    vanity: string | null,
    websiteURL: string | null,
    tags: Tag[],
    languages: Language[],
    prefix: string,
    upvoteCount: number,
    reviews: {
        count: number,
        averageRating: number
    },
    createdAt: number,
    updatedAt: number
}

interface BotUpdateProperties {
    shortDescription: string,
    fullDescription: string,
    inviteURL: string,
    prefix: string,
    safeAvatar: boolean,
    supportServer: string | null,
    tags: string[],
    languages: string[],
    vanity: string | null,
    websiteURL: string | null,
    serverCount: number | null,
    active: boolean
}

export { Bot, BotUpdateProperties };