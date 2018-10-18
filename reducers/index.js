import { SIGN_IN, SIGN_OUT } from '../actions/index'

function authReducer(state = {}, action) {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        ...action.token,
      }
    case SIGN_OUT:
      return {
        ...state,
        token:'',
      }
    default:
      return state;
  }
}

export default authReducer