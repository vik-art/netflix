export interface User {
    id?: string,
    email: string,
    password: string,
    returnSecureToken?: boolean
}

export interface DbUser {
    id?: string,
    email?: string,
}