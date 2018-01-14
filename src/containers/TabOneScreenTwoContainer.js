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

// import action constants
import {
  GET_SINGLE_EVENT,
  GET_SINGLE_NEWS,
} from '../constants/';


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
    // singleEvent, singleNews,
    const {  navigation } = this.props;
    const type = navigation.state.params.type;
    const singleNews = {
        image: require('../components/TabOne/img/test.jpeg'),
        title: '习近平提出京津冀协同发展战略',
        createdAt: '2017年5月20日',
        content: `   为深入推动“大众创业、万众创新”，配合国家“十三五”规划提出的“支持港澳中小微企业和青年人在内地发展创业”和“支持内地与港澳开展创新及科技合作”，由香港中国商会牵头，经纬集团发起并联合多家香港和海内外华侨华人相关商协会成立“紫荆谷发展中心”，得到了香港各界和国家有关部门的大力支持以及包括上海交通大学在内的国家11所顶尖高等院校的全方位合作。由经纬集团捐资，在“紫荆谷发展中心”的统筹下与国家11所著名高等院校合作，依托高校各自的学科优势，在11所高校设立“紫荆谷创新创业发展辅导中心”，为港澳台青年、海外华人华侨青年，包括内地的部分“创二代”提供一个学习、交流、合作的平台；邀请专家学者和企业家包括政府官员，对他们进行针对性的免费辅导。`
    };

    const singleEvent = singleNews;
    
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
    <View>
      <Header 
        headerText={navigation.state.params.title}
        logoLeft={require('../components/TabOne/img/back.png')}
        navigation={navigation}
      />
    </View>
  ),
  headerLeft: null,
  tabBarVisible: false,
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