export default SIGN_IN = 'SIGN_IN'
export default SIGN_OUT = 'SIGN_OUT'

export function signIn(token){
    return {
        type: SIGN_IN,
        token 
    }
}

export function signOut(){
    return {
        type: SIGN_OUT,
    }
}