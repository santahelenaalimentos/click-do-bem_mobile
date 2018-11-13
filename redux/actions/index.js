export const SIGN_IN = 'SIGN_IN'
export const SIGN_OUT = 'SIGN_OUT'
export const UPDATE_USER = 'UPDATE_USER'

export function signIn(token, user){
    return {
        type: SIGN_IN,
        token,
        user
    }
}

export function updateUser(user){
    return {
        type: UPDATE_USER,
        user
    }
}

export function signOut(){
    return {
        type: SIGN_OUT,
    }
}