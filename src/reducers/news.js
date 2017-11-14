import { combineReducers } from 'redux';

// import action constants in one place
import {
  // all news
  GET_NEWS,
  GET_NEWS_SUCCESS,
  GET_NEWS_ERROR,
  // single news
  GET_SINGLE_NEWS,
  GET_SINGLE_NEWS_SUCCESS,
  GET_SINGLE_NEWS_ERROR,
} from '../constants/';

// construct initial need attend events state
const initialNewsState = {
  isGettingNews: false,
  getNewsuccess: false,
  getNewsError: false,
  News: [],
  errorMsg: null,
};

const News = (state = initialNewsState, action) => {
  switch (action.type) {
    case GET_SINGLE_NEWS:
      return {
        ...state,
        isGettingEvents: true,
        getEventsSuccess: false,
        getEventsError: false,
      };

    case GET_SINGLE_NEWS_SUCCESS:
      // if get events success, merge the res into the state tree
      const { needAttendEvents } = action.payload;

      return {
        ...state,
        needAttendEvents,
        isGettingEvents: false,
        getEventsSuccess: true,
      };

    case GET_ATTEND_EVENTS_ERROR:
      // if get events error, merge error message into the state tree
      const { errorMsg } = action;
      return {
        ...state,
        errorMsg,
        isGettingEvents: false,
        getEventsError: true,
      };

    default:
      // if dissatisfy other circumstance, return the origin state
      return state;
  }
};


// construct initial need attend events state
const initialSingleNeedAttendEventsState = {
  isGettingEvent: false,
  getEventSuccess: false,
  getEventError: false,
  singleEvent: null,
  errorMsg: null,
};

const singleEvent = (state = initialSingleNeedAttendEventsState, action) => {
  switch (action.type) {
    case GET_SINGLE_ATTEND_EVENT:
      return {
        ...state,
        isGettingEvent: true,
        getEventSuccess: false,
        getEventError: false,
      };

    case GET_SINGLE_ATTEND_EVENT_SUCCESS:
      // if get events success, merge the res into the state tree
      const { singleEvent } = action.payload;

      return {
        ...state,
        singleEvent,
        isGettingEvent: false,
        getEventSuccess: true,
      };

    case GET_SINGLE_ATTEND_EVENT_ERROR:
      // if get events error, merge error message into the state tree
      const { errorMsg } = action;
      return {
        ...state,
        errorMsg,
        isGettingEvent: false,
        getEventError: true,
      };

    default:
      // if dissatisfy other circumstance, return the origin state
      return state;
  }
};

export default combineReducers({
  needAttendEvents,
  singleEvent,
});