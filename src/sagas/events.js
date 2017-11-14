// the effects func from redux-saga
import { call, put, take } from 'redux-saga/effects';
// import action constants
import {
  // get need attend action constants
  GET_ATTEND_EVENTS,
  GET_ATTEND_EVENTS_SUCCESS,
  GET_ATTEND_EVENTS_ERROR,

  // get single attend action constants
  GET_SINGLE_ATTEND_EVENT,
  GET_SINGLE_ATTEND_EVENT_SUCCESS,
  GET_SINGLE_ATTEND_EVENT_ERROR,
} from '../constants/';
// import api & request function
import {
  // api 
  base,
  homeApi,

  // http request function
  request,
} from '../util/';

// create get need attend worker saga
function* getNeedAttendEvents(action) {
  try {
    // dispatch getEvents http request
    // { active: true } represent the request events is the attend events
    const needAttendEvents = yield call( request.get, base + homeApi().getEvents, { active: true } );
    // if get need attend  successfully, dispatch action and return needAttendEvents to redux-store
    yield put({ type: GET_ATTEND_EVENTS_SUCCESS, payload: { needAttendEvents }});
  } catch(e) {
    // if get need attend error, dispatch error action & error message for better `debug`
    yield put({ type: GET_ATTEND_EVENTS_ERROR, errorMsg: e.msg });
  }
}

// get need attend watcher saga
function* watchGetNeedAttendEvents() {
  while (true) {
    // LISTEN GET_ATTEND
    yield take(GET_ATTEND_EVENTS);
    yield call(getNeedAttendEvents);
  }
}

// create get single need attend worker saga
function* getSingleNeedAttendEvents(action) {
  try {
    const { id } = action.payload;
    // dispatch getSingleEvent http request
    // { active: true } represent the request events is the attend events
    const singleEvent = yield call( request.get, base + homeApi(id).getSingleEvent, { active: true } );
    // if get single need attend  successfully, dispatch action and return needAttendEvents to redux-store
    yield put({ type: GET_SINGLE_ATTEND_EVENT_SUCCESS, payload: { singleEvent }});
  } catch(e) {
    console.log('e', e);
    // if get single need attend error, dispatch error action & error message for better `debug`
    yield put({ type: GET_SINGLE_ATTEND_EVENT_ERROR, errorMsg: e.msg });
  }
}

// get need attend watcher saga
function* watchGetSingleNeedAttendEvents() {
  while (true) {
    // LISTEN GET_ATTEND
    const action = yield take(GET_SINGLE_ATTEND_EVENT);
    yield call(getSingleNeedAttendEvents, action);
  }
}

// export all watcher saga in one place.
export {
  watchGetNeedAttendEvents,
  watchGetSingleNeedAttendEvents,
}