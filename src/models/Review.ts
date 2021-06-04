import { User } from './User';
import { Bot } from './Bot';
import { Server } from './Server';

interface Review {
    id: string,
    title: string,
    comment: string,
    rating: number,
    upvoted: boolean,
    upvoteCount: number,
    bot: Bot | null,
    server: Server | null,
    user: User,
    createdAt: number
}

export { Review };