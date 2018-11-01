import { SIGN_IN, SIGN_OUT, UPDATE_USER } from '../actions/index'

function authReducer(state = {}, action) {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        token: action.token,
        user: action.user,
      }
    case UPDATE_USER:
      return {
        ...state,
        user: action.user,
      }
    case SIGN_OUT:
      return {
        ...state,
        token: null,
        user: null,
      }
    default:
      return state;
  }
}

export default authReducer