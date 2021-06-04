interface LocationStatistics {
    country: string,
    views: number
}

interface ReferralStatistics {
    source: string | null,
    views: number
}

interface Analytics {
    id: string,
    timestamp: number,
    impressions: number,
    upvotes: number,
    views: number,
    locationStatistics: LocationStatistics[],
    referralStatistics: ReferralStatistics[]
}

interface BotAnalytics extends Analytics {
    invites: number
}

interface ServerAnalytics extends Analytics {
    joins: number
}

export { BotAnalytics, ServerAnalytics };