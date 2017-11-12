'use strict';

import { Dimensions } from 'react-native';

// import all file in one place

export * from './api';
export { default as request } from './request';

const deviceH = Dimensions.get('window').height;
const deviceW = Dimensions.get('window').width;

const basePx = 375;

export default function px2dp(px) {
  return px * deviceW / basePx;
}

export const handleTime = (time) => {
  let afterTime = '';
  afterTime += time.slice(0, 10);
  afterTime += ' ';
  afterTime += time.slice(11, 19);
  return afterTime;
}