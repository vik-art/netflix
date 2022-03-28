export interface User {
    id?: string,
    email: string,
    password: string,
    returnSecureToken?: boolean
}

export interface DbUser {
    name?: string,
    email?: string,
}