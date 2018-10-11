// react component all need package
import React, { PureComponent } from "react";
// import component from react-native
import { View } from "react-native";
// import react bind library connect
import { connect } from "react-redux";
// import presentation component
import { TabOneScreenTwo } from "../components/TabOne/views/";
// import Header from common
import { Header } from "../components/common/";

// import action constants
import { GET_SINGLE_EVENT, GET_SINGLE_NEWS } from "../constants/";

class TabOneScreenTwoContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false
    };
  }

  componentDidMount() {
    // get the dispatch from the connect
    const { dispatch, navigation } = this.props;
    const { data } = navigation.state.params;

    // get the action type and id from the data
    const { type, id } = data;

    // fake refresh for better experience
    this.setState({
      isRefreshing: true
    });

    // dispatch GET_SINGLE_EVENT || GET_SINGLE_NEWS , get single news or event
    dispatch({ type, payload: { id } });
  }

  render() {
    // definitely give out all need pass data in one place
    // singleEvent, singleNews,
    const { navigation, singleEvent, singleNews } = this.props;
    const { type } = navigation.state.params.data;
    console.log("type", type);

    return (
      <TabOneScreenTwo
        data={{
          image: require("../components/TabOne/img/carousel@3x.png"),
          title: "第五届“唱支山歌给党听”合唱比赛开幕",
          createdAt: "2017年3月1日",
          body: `
            <p>不负伟大时代，传承红色经典。中央电视台音乐频道七一特别奉献《唱支山歌给党听》主题歌会，节目用人民之歌、青春之歌、时代之歌，全面回顾党的光辉历程，讴歌党和人民在新时代中取得的卓越成就，于七月一日当天在央视综合频道、音乐频道播出。 
本次七一晚会贯穿全年轻态的制作理念，青年歌手、演员数量大幅增加，节目力邀杨紫、胡夏、BEJ48等优秀青年偶像，同时还有来自北京大学、中国传媒大学、大连艺术学院等十余所高校的学生们倾情加盟，除了观众耳熟能详的经典红歌之外，节目组还从网络和热歌榜上大量选取《中国很赞》《我和2035有个约》等正能量歌曲。</p>
          `
        }}
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
        logoLeft={require("../components/TabOne/img/back.png")}
        navigation={navigation}
      />
    </View>
  ),
  headerLeft: null,
  tabBarVisible: false
});

export default connect(
  // mapStateToProps
  state => {
    // get the singleEvent from the state tree
    const { singleEvent } = state.events.singleEvent;
    // get the singleNews from the state tree
    const { singleNews } = state.news.singleNews;
    return {
      singleEvent,
      singleNews
    };
  }
)(TabOneScreenTwoContainer);
