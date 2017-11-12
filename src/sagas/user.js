// the effects func from redux-saga
import { call, put, take } from 'redux-saga/effects';
// import action constants
import {
  // get profile constants
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR

} from '../constants/';
// import api & request function
import {
  // api 
  base,
  userApi,

  // http request function
  request,
} from '../util/';

// create get profile worker saga
function* getProfile(action) {
  try {
    // get 
    const { id } = action.payload;
    // dispatch getProfile http request
    // { id } represent `post` request body
    const profile = yield call(request.post, base + userApi.getProfile, { id });
    // if get profile successfully, dispatch action and return profile to redux-store
    yield put({ type: GET_PROFILE_SUCCESS, payload: { profile }});
  } catch(e) {
    // if get profile error, dispatch error action & error message for better `debug`
    yield put({ type: GET_PROFILE_ERROR, errorMsg: e.msg });
  }
}

// get profile watcher saga
function* watchGetProfile() {
  while (true) {
    const action = yield take(GET_PROFILE);
    yield call(getProfile, action);
  }
}

// export all watcher saga in one place.
export {
  watchGetProfile,
}