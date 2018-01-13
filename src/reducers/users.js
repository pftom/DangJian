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

const mapKeyToTitle = {
  'avatar': '头像',
  'name': '姓名',
  'sex': '性别',
  'identity': '身份',
  'college': '学院',
  'major': '专业',
  'studentId': '学号',
};

// profile reducer initial state
const initialProfileState = {
  userProfile: {
    avatar: require('../components/img/cstLogo.png'),
    name: '黄大侠',
    sex: 'M',
    identity: '团员',
    college: '计算机学院',
    major: '软件工程1402',
    studentId: '140150115'
  },
  isGetProfile: false,
  getProfileSuccess: false,
  getProfileError: false,
  errorMsg: null,
};

// profile reducer
function profile(state = initialProfileState, action) {
  switch(action.type) {

    case GET_PROFILE:
      // if start get profile, update the status for better UI presentation
      return { 
        ...state, 
        isGetProfile: true,
        getProfileSuccess: false,
        getProfileError: false,
      };

    case GET_PROFILE_SUCCESS:
      // if get profile success, merge profile into the state tree
      const { profile } = action.payload;
      return {
        ...state,
        userProfile: profile,
        isGetProfile: false,
        getProfileSuccess: true,
      };

    case GET_PROFILE_ERROR:
      // if get profile error, merge errorMsg for better debug
      const { errorMsg } = action;
      return {
        ...state,
        errorMsg,
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