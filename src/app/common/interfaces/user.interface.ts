export interface User {
    id?: string,
    email: string,
    password: string,
    returnSecureToken?: boolean,
    name: string
}

export interface DbUser {
    id?: string,
    email?: string,
}