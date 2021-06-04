import { User } from './User';

type BotAuditLogTypes = 'botAdded' | 'botApproved' | 'botApprovedManual' | 'botDeclined' | 'botEdited' | 'botDeleted' | 'botTokenCreated' | 'botTokenDeleted' | 'botWebhookCreated' | 'botWebhookDeleted' | 'botSecondaryOwnerAdded' | 'botSecondaryOwnerRemoved'
type ServerAuditLogTypes = 'serverAdded' | 'serverEdited' | 'serverDeleted' | 'serverTokenCreated' | 'serverTokenDeleted' | 'serverWebhookCreated' | 'serverWebhookDeleted' | 'serverSecondaryOwnerAdded' | 'serverSecondaryOwnerRemoved'
type UserAuditLogTypes = 'userEdited'
type AllAuditLogTypes = BotAuditLogTypes | ServerAuditLogTypes | UserAuditLogTypes

interface AuditLog {
    id: string,
    type: AllAuditLogTypes,
    user: User | null,
    timestamp: number
}

export { AuditLog };