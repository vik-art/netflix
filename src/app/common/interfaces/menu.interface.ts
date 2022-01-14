export interface ImenuItem {
    label:string,
    link: string,
}

export interface User {
    email: string,
    password: string
}

export interface fbAuthResponse {
    idToken?: string,
    expiresIn?: string
}