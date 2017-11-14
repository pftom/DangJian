// import redux-saga effect function
import { all } from 'redux-saga/effects';

// import all watcher saga and run them parallel
import {
  watchGetProfile,
} from './user';
import {
  watchGetNeedAttendEvents,
  watchGetSingleNeedAttendEvents,
} from './events';

// create & export root saga for run them parallel
export default function* rootSaga() {
  yield all([
    // run the profile watch saga
    watchGetProfile(),

    // run the event watcher saga 
    watchGetNeedAttendEvents(),
    watchGetSingleNeedAttendEvents(),
  ]);
}