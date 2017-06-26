import {
  REQUEST_NEWS,
  REQUEST_NEWS_SUCCESSFUL,
  REQUEST_NEWS_FAILURE,
  REQUEST_EVENTS,
  REQUEST_EVENTS_SUCCESSFUL,
  REQUEST_EVENTS_FAILURE,
  REQUEST_EVENTS_HEADLINE_SUCCESSFUL,
  REQUEST_EVENTS_ACTIVE_SUCCESSFUL,
} from '../constants';

import request from '../util/request';
import { commonApi, header } from '../util/config';

const requstNews = () => ({
  type: REQUEST_NEWS,
});

const requestNewsSuccessful = (data) => ({
  type: REQUEST_NEWS_SUCCESSFUL,
  data: data,
});

const requestNewsFailure = (err) => ({
  type: REQUEST_NEWS_FAILURE,
  err: err,
});


export const fetchNews = (page) => dispatch => {
  dispatch(requstNews());
  return request.get(commonApi.base + commonApi.news, {
    page: page
  })
  .then(data => dispatch(requestNewsSuccessful(data)))
  .catch(err => dispatch(requestNewsFailure(err)));
}

const requestEvents = () => ({
  type: REQUEST_EVENTS,
});

const requestEventsSuccessful = (data) => ({
  type: REQUEST_EVENTS_SUCCESSFUL,
  data: data,
});

const requestEventsHeadlineSuccessful = (data) => ({
  type: REQUEST_EVENTS_HEADLINE_SUCCESSFUL,
  data: data.results,
});

const requestEventsFailure = (err) => ({
  type: REQUEST_EVENTS_FAILURE,
  err: err,
});

export const fetchEventHeadline = () => dispatch => {
  dispatch(requestEvents());
  return request.get(commonApi.base + commonApi.events, {
    headline: true,
  })
  .then(data => dispatch(requestEventsHeadlineSuccessful(data)))
  .catch(err => dispatch(requestEventsFailure(err)));
}


export const fetchEvents = (page, headline) => dispatch => {
  dispatch(requestEvents());
  return request.get(commonApi.base + commonApi.events, {
    page: page,
  })
  .then(data => dispatch(requestEventsSuccessful(data)))
  .catch(err => dispatch(requestEventsFailure(err)));
}

const requestEventsActiveSuccessful = (data) => ({
  type: REQUEST_EVENTS_ACTIVE_SUCCESSFUL,
  data: data,
})

export const fetchEventsActive = (page) => dispatch => {
  dispatch(requestEvents());
  return request.get(commonApi.base + commonApi.events, {
    active: true,
    page: page,
  })
  .then(data => dispatch(requestEventsActiveSuccessful(data)))
  .catch(err => dispatch(requestEventsFailure(err)));
}