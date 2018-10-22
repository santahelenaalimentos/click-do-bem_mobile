export const SIGN_IN = 'SIGN_IN'
export const SIGN_OUT = 'SIGN_OUT'

export function signIn(token, usuario){
    return {
        type: SIGN_IN,
        token,
        user: usuario
    }
}

export function signOut(){
    return {
        type: SIGN_OUT,
    }
}