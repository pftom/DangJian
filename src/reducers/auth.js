import { REHYDRATE } from 'redux-persist/constants';

import { 
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,

  LOGOUT,
  SUBMIT_CONFIRM,
  SET_TOKEN,
} from '../constants';


export const initialAuthState = {
  isLogin: false,
  loginSuccess: false,
  loginError: false,
  token: '',
  username: '',
}

function auth(state = initialAuthState, action) {
  switch (action.type) {
    case REHYDRATE: 
      return { ...state, authenticated: true };
    case LOGIN: {
      return { 
        ...state, 
        isLogin: true,
        loginSuccess: false,
        loginError: false,
      };
    }
    case LOGIN_SUCCESS: {
      const { loginBody } = action.payload;
      const { token, username } = loginBody;
      return {
        ...state,
        isLogin: false,
        loginSuccess: true,
        token,
        username,
      }
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        isLogin: false,
        loginError: true,
      };
    }
    default:
      return state;
  }
}

export default auth;
