import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import nav from './nav';
import auth from './auth';
import storage from './storage';
import home from './home';
import content from './content';
// add improvement for the reducer
import users from './users';
import events from './events';

const AppReducers = combineReducers({
  nav,
  auth,
  home,
  content,
  storage,
  
  users,
  events,
  form: formReducer,
});

export default AppReducers;