// import redux-saga effect function
import { all } from 'redux-saga/effects';

// import all watcher saga and run them parallel
import {
  watchGetProfile,
  watchLogin,
} from './user';

import {
  watchGetEvents,
  watchGetSingleEvent,
  watchGetActiveEvents,
} from './events';

import {
  watchGetNews,
  watchGetSingleNews,
} from './news';

// create & export root saga for run them parallel
export default function* rootSaga() {
  yield all([
    // run the profile watch saga
    watchGetProfile(),
    watchLogin(),

    // run the event watcher saga 
    watchGetEvents(),
    watchGetSingleEvent(),
    watchGetActiveEvents(),

    // run the news watcher saga
    watchGetNews(),
    watchGetSingleNews(),
  ]);
}