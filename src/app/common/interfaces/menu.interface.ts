export interface ImenuItem {
    label:string,
    link: string,
}

export interface User {
    email: string,
    password: string,
    returnSecureToken?: boolean
}

export interface fbAuthResponse {
    idToken?: string,
    expiresIn?: string
}

export type AlertType = 'success' | 'warning' | 'danger';

export interface Alert {
    type: AlertType,
    text: string
}