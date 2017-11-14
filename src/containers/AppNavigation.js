import React from 'react';
import { Platform } from 'react-native';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';

import TabBarNavigation from '../components/TabBarNavigation';
import LoginScreen from './Login';
import MessageBox from '../components/common/MessageBox';
import Learning from '../components/TabTwo/views/Learning';
import DetailThree from '../components/TabTwo/views/DetailThree';
import DetailFour from '../components/TabTwo/views/DetailFour';
import PersonData from '../components/TabThree/views/PersonData';
import Setting from '../components/TabThree/views/Setting';
import Feedback from '../components/common/Feedback';
import ModifyPassword from '../components/common/ModifyPassword';
// import ActivityBoxContainer
import ActivityBoxContainer from './ActivityBoxContainer';
// here TabOneScreenTwo
import TabOneScreenTwoContainer from './TabOneScreenTwoContainer';

export const AppNavigation = StackNavigator(
  {
    TabBarNavigation: { screen: TabBarNavigation },
    Login: { screen: LoginScreen },
    TabOneScreenTwo: { screen: TabOneScreenTwoContainer },
    MessageBox: { screen: MessageBox },
    Learning: { screen: Learning },
    DetailThree: { screen: DetailThree },
    DetailFour: { screen: DetailFour },
    ActivityBox: { screen: ActivityBoxContainer },
    PersonData: { screen: PersonData },
    Setting: { screen: Setting },
    Feedback: { screen: Feedback },
    ModifyPassword: { screen: ModifyPassword },
  },
  {
    navigationOptions: {
      headerLeft: null,
      headerStyle: Platform.OS === 'ios' ? { height: 90 } : { height: 88 },
    },
    initialRouteName: 'TabBarNavigation'
  }
);


const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigation navigation={addNavigationHelpers({ dispatch, state: nav })} />
)

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);