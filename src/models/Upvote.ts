import { User } from './User';

interface Upvote {
    id: string,
    user: User,
    timestamp: number
}

interface UserUpvoteStatus {
    upvoted: boolean,
    timestamp?: number
}

interface UserUpvoteCount {
    id: string,
    user: User,
    count: number
}

export { Upvote, UserUpvoteStatus, UserUpvoteCount };