/*
 *  write all api in one place
 *  
 */ 
'use strict';

// the base uri for request
const base = 'http://powerformer.com:12138';

// all home api in one place
// arrow func for yield single api
const homeApi = (id) => ({
  getNews: '/home/news/',
  getEvents: '/home/events/',
  getSingleNews: `/home/news/${id}/`,
  getSingleEvent: `/home/events/${id}/`,
});

// all user api in one place
const userApi = {
  login: '/users/login/',
  changePassword: '/users/changePassword/',
  getProfile: '/users/profile/',
  updateProfile: '/users/profile/',
};

// export all api in one place
export {
  base,
  homeApi,
  userApi,
}