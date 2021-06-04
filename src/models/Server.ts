import { User } from './User';
import { Tag } from './Tag';
import { Emoji } from './Emoji';

interface Server {
    id: string,
    name: string
    icon: string | null,
    shortDescription: string,
    fullDescription: string,
    active: boolean,
    memberCount: number,
    inviteCode: string,
    owner: User,
    secondaryOwners: User[],
    tags: Tag[],
    safeAvatar: boolean,
    vanity: string | null,
    showEmojis: boolean,
    websiteURL: string | null,
    upvoteCount: number,
    reviews: {
        count: number,
        averageRating: number
    },
    emojis: Emoji[],
    createdAt: number,
    updatedAt: number
}

interface ServerUpdateProperties {
    shortDescription: string,
    fullDescription: string,
    inviteCode: string,
    safeAvatar: boolean,
    tags: string[],
    vanity: string | null,
    websiteURL: string | null,
    active: boolean
}

export { Server, ServerUpdateProperties };