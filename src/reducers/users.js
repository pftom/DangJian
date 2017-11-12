import { combineReducers } from 'redux';

// import all action constants in one place
import {
  REQUEST_CHANGE_PASSWD,
  REQUEST_CHANGE_PASSWD_SUCCESSFUL,
  REQUEST_CHANGE_PASSWD_FAILURE,

  // profile constants
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,
} from '../constants/';

// profile reducer initial state
const initialProfileState = {
  userProfile: null,
  isGetProfile: false,
  getProfileSuccess: false,
  getProfileError: false,
}

// profile reducer
function profile(state = initialProfileState, action) {
  switch(action.type) {

    case GET_PROFILE:
      return { 
        ...state, 
        isGetProfile: true,
        getProfileSuccess: false,
        getProfileError: false,
      };

    case GET_PROFILE_SUCCESS:
      const { profile } = action.payload;
      return {
        ...state,
        userProfile: profile,
        isGetProfile: false,
        getProfileSuccess: true,
      };

    case GET_PROFILE_ERROR:
      return {
        ...state,
        isGetProfile: false,
        getProfileError: true,
      };

    default:
      return state;
  }
}

const initialUserState = {
  isFetching: false,
  success: false,
  err: false,
}

function usersAuth (state = initialUserState, action) {
  switch (action.type) {
    case REQUEST_CHANGE_PASSWD:
      return { ...state, isFetching: true };
    case REQUEST_CHANGE_PASSWD_SUCCESSFUL:
      return { ...state, isFetching: false, success: true, err: fasle };
    case REQUEST_CHANGE_PASSWD_FAILURE:
      return { ...state, isFetching: false, success: false, err: true };
    default: return state;
  }
}

export default combineReducers({
  profile,
  usersAuth,
});