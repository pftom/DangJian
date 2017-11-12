// import redux-saga effect function
import { all } from 'redux-saga/effects';

// import all watcher saga and run them parallel
import {
  watchGetProfile,
} from './user';

// create & export root saga for run them parallel
export default function* rootSaga() {
  yield all([
    watchGetProfile(),
  ]);
}