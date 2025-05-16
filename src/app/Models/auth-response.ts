export interface AuthResponse {
    idToken: string;
    refreshToken: string;
    email: string;
    expiresIn: string;
    localId: string;
}

export enum commonLoginErrors {
    INVALID_LOGIN_CREDENTIALS = 'INVALID_LOGIN_CREDENTIALS',
    EMAIL_EXISTS = 'EMAIL_EXISTS',
    OPERATION_NOT_ALLOWED = 'OPERATION_NOT_ALLOWED',
    TOO_MANY_ATTEMPTS_TRY_LATER = 'TOO_MANY_ATTEMPTS_TRY_LATER'
}
