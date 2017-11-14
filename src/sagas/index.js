// import redux-saga effect function
import { all } from 'redux-saga/effects';

// import all watcher saga and run them parallel
import {
  watchGetProfile,
} from './user';

import {
  watchGetEvents,
  watchGetSingleEvent,
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

    // run the event watcher saga 
    watchGetEvents(),
    watchGetSingleEvent(),

    // run the news watcher saga
    watchGetNews(),
    watchGetSingleNews(),
  ]);
}