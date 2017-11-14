// react component all need package
import React, { PureComponent } from 'react';
// import component from react-native
import { View } from 'react-native';
// import react bind library connect
import { connect } from 'react-redux';
// import presentation component
import { TabOneScreenTwo } from '../components/TabOne/views/';
// import Header from common
import { Header } from '../components/common/';


class TabOneScreenTwoContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
    }
  }

  componentDidMount() {
    // get the dispatch from the connect
    const { dispatch, navigation } = this.props;
    const { data } = navigation.state.params;

    // get the action type and id from the data
    const { type, id } = data;

    // fake refresh for better experience
    this.setState({
      isRefreshing: true,
    });
    // dispatch GET_SINGLE_EVENT || GET_SINGLE_NEWS , get single news or event
    dispatch({ type, payload: { id } });
  }

  render() {
    // definitely give out all need pass data in one place
    const { singleEvent, singleNews, navigation } = this.props;
    const type = navigation.state.params.type;
    
    return (
      <TabOneScreenTwo
        data={type === GET_SINGLE_NEWS ? singleNews : singleEvent}
        navigation={navigation}
      />
    );
  }
}

// define the header for this component
TabOneScreenTwoContainer.navigationOptions = ({ navigation }) => ({
  headerTitle: (
    <View style={{ top: -10 }}>
      <Header 
        headerText={navigation.state.params.title}
        logoLeft={require('../components/TabOne/img/back.png')}
        navigation={navigation}
      />
    </View>
  ),
})

export default connect(
  // mapStateToProps
  state => {
    // get the singleEvent from the state tree
    const { singleEvent } = state.events.singleEvent;
    // get the singleNews from the state tree
    const { singleNews } = state.news.singleNews;
    return {
      singleEvent,
      singleNews,
    };
  },
)(TabOneScreenTwoContainer);