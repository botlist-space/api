interface User {
    id: string,
    username: string,
    discriminator: string,
    avatar: string | null,
    shortDescription: string,
    banned: boolean,
    admin: boolean,
    donator: boolean,
    createdAt: number,
    updatedAt: number
}

export { User };