// react component all need package
import React, { PureComponent } from 'react';
// import component from react-native
import { View } from 'react-native';
// import react bind library connect
import { connect } from 'react-redux';
// import presentation component
import { TabOneScreenOne } from '../components/TabOne/views/';
// import actions constants
import { 
  GET_NEWS,
  GET_EVENTS,
} from '../constants/';
// import Header from common
import { Header } from '../components/common/';
import px2dp from '../util/index';


class TabOneScreenOneContainer extends PureComponent {
  componentDidMount() {
    // get the dispatch from the connect
    const { dispatch, navigation } = this.props;

    // dispatch GET_NEWS && GET_ATTEND_EVENTS , get news and event
    dispatch({ type: GET_NEWS, payload: { active: false } });
    dispatch({ type: GET_EVENTS, payload: { active: false } });
  }

  render() {
    // definitely give out all need pass data in one place
    const { news, events, navigation } = this.props;
    
    return (
      <TabOneScreenOne
        events={events}
        news={news}
        navigation={navigation}
      />
    );
  }
}

// define the header for this component
TabOneScreenOneContainer.navigationOptions = ({ navigation }) => ({
  headerTitle: (
    <View style={{ height: px2dp(90) }}>
        <Header 
          headerText="党国风采"
          navigation={navigation}
        />
    </View>
  ),
});

export default connect(
  // mapStateToProps
  state => {
    // get the singleEvent from the state tree
    const { events } = state.events.events;
    // get the singleNews from the state tree
    const { news } = state.news.news;
    return {
      events,
      news,
    };
  },
)(TabOneScreenOneContainer);