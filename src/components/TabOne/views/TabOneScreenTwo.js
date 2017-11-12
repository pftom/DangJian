import React, { PureComponent } from 'react';
import { 
  Text, 
  View, 
  Image, 
  ScrollView, 
  StyleSheet, 
  Dimensions,
  RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import HTMLView from 'react-native-html-render';

import Header from '../../common/Header';
import px2dp from '../../../util/index';
import {
  REQUEST_SINGLE_NEWS,
  REQUEST_EVENT,
} from '../../../constants';

const { width, height } = Dimensions.get('window');

const ACTIONS = [
  REQUEST_EVENT, 
  REQUEST_SINGLE_NEWS,
];
import { handleTime } from '../../../util/index';

class TabOneScreenTwo extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
    }
  }


  componentDidMount() {
    // let { state, dispatch } = this.props.navigation;
    // let { data } = state.params;
    // this.setState({
    //   isRefreshing: true,
    // })
    // if (ACTIONS[data.type] === REQUEST_EVENT) {
    //   dispatch(fetchEvent(data.id));
    // } else if (ACTIONS[data.type] === REQUEST_SINGLE_NEWS) {
    //   dispatch(fetchNew(data.id));
    // }
  }

  waitRefreshing() {
    const that = this;
    setTimeout(() => {
      that.setState({
        isRefreshing: false,
      });
    }, 500);
  }

  render() {
    let { event, single_news, navigation } = this.props;
    let { data } = navigation.state.params;
    let res = data.type == 0 ? event.event : single_news.new;
    let time = handleTime(res.created || '');
    let isFetching = data.type == 0 ? event.isFetching : single_news.isFetching;
    if (isFetching) {
      this.waitRefreshing();
    }

    return (
      <View style={styles.containerBox}>
          <ScrollView
            showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={styles.header}>
              {!!res.photo && <Image source={{ uri: res.photo }} style={styles.pic} />}
              {!!data.pic && <View style={styles.picBox}><Image source={data.pic} style={styles.avatar} /></View>}
              <Text style={[ styles.title, data.title && styles.head]}>{res.title || data.title}</Text>
              {!!res.created && <Text style={styles.time}>{time}</Text>}
            </View>
            <View style={styles.content}>
              <HTMLView
                value={res.body || data.content}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

TabOneScreenTwo.navigationOptions = ({ navigation }) => ({
  headerTitle: (
    <View style={styles.headerTitle}>
      <Header 
        headerText={navigation.state.params.title}
        logoLeft={require('../img/back.png')}
        navigation={navigation}
      />
    </View>
  ),
})

const styles = StyleSheet.create({
  container: {
    top: 28,
    alignItems: 'center',
  },
  containerBox: {
    width: width,
    height: height - px2dp(90),
  },
  pic: {
    width: 296,
    height: 166,
    borderRadius: 5,
  },
  head: {
    fontSize: 30,
  },
  picBox: {
    marginLeft: px2dp(60)
  },
  header: {
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#C1C1C1',
    marginBottom: 17,
  },
  title: {
    fontFamily: 'PingFangSC-Semibold',
    fontSize: 20,
    color: '#000000',
    width: 283,
    alignItems: 'center',
    marginTop: 21,
  },
  time: {
    fontFamily: 'PingFangSC-Light',
    fontSize: 14,
    color: 'rgba(152,152,152,0.80)',
    marginTop: 8,
  },
  content: {
    width: 306,
    marginBottom: 50,
  },
  contentText: {
    fontFamily: 'PingFangSC-Light',
    fontSize: 18,
    color: '#000000',
  },
  headerTitle: {
    top: -10,
  },
})

const htmlStyles = StyleSheet.create({
  strong: {
    fontFamily: 'PingFangSC-Light',
    fontSize: 18,
    color: '#000000',
  },
  p: {
    fontFamily: 'PingFangSC-Light',
    fontSize: 18,
    color: '#000000',
  }
})

const mapStateToProps = (state) => ({
  event: state.content.event,
  single_news: state.content.single_news,
})

export default connect(mapStateToProps)(TabOneScreenTwo);