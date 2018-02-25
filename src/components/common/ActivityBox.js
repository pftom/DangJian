import React, { Component } from 'react';
import { 
  Text, 
  Image, 
  Dimensions, 
  RefreshControl, 
  ActivityIndicator,  
  View, 
  TouchableOpacity, 
  ListView, 
  StyleSheet, 
  TouchableWithoutFeedback, 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

import RefreshListView from './RefreshListView';
import Header from './Header';
import ModalActivity from './ModalActivity';
import { handleTime } from '../../util/index';
import ModalMessage from './ModalMessage';
import { Modal, Toast, ActivityIndicator as AntActivityIndicator } from 'antd-mobile';

const alert = Modal.alert;

const { width, height } = Dimensions.get('window');
// import base for presentation image
import { base } from '../../util/';
import px2dp from '../../util/';

// import action constants
import {
  GET_SINGLE_EVENT,
  GET_SINGLE_NEWS,
} from '../../constants/';


class ActivityItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: false,
      showModal: false,
    }

    this.changeStatus = this.changeStatus.bind(this);
    this.dispatchAttend = this.dispatchAttend.bind(this);
  }

  changeStatus() {
    this.setState({
      showModal: true,
    });

    const that = this;
    this.timer1 = setTimeout(() => {
      that.setState({
        status: true,
        showModal: false,
        showSuccess: true,
      });

      Toast.success(
         <Text>签到成功</Text>, 
      2);
    }, 1700);
  }

  showAlert = () => {

  }

  dispatchAttend() {
    const { dispatch, token, id } = this.props;
    this.changeStatus();
    // dispatch(fetchAttend(id, token));
  }

  componentWillUnmount() {
    clearTimeout(this.timer1);
  }

  render() {
    const completedColor = ['#9B9B9B', '#9B9B9B'];
    const unCompletedColor = ['#FF0467', '#FC7437'];

    const { rowData } = this.props;

    console.log('props', this.props);

    const renderStatus = (
      <LinearGradient
        start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
        colors={this.state.status ? completedColor : unCompletedColor}
        style={styles.gradient}
      >
        <Text style={styles.gradientText}>
          {
            !this.state.status 
            ? "签到"
            : "已签到"
          }
        </Text>
      </LinearGradient>
    );
    return (
      <TouchableWithoutFeedback onPress={() => 
        this.props.navigation.navigate(
          "TabOneScreenTwo", 
          { /* explicit type for better understand */
            data: { type: GET_SINGLE_EVENT, id: rowData.id }, 
            title: '校园活动' 
          })
        }>
        <View style={styles.containerItem} >
          <Modal
            visible={this.state.showModal}
            transparent
            maskClosable={false}
            footer={null}
          >
            <View>
              <AntActivityIndicator size="large" />
              <Text style={styles.signText}>签到中...</Text>
            </View>
          </Modal>
          <Image source={{ uri: rowData.photo }} style={styles.pic} />
          <LinearGradient
            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.6)']}
            style={styles.picBox}
          />
          <View><Text style={styles.title}>{rowData.title}</Text></View>
          <View style={styles.statusBox}>
            <Text style={styles.time}>{ rowData.attendees.length }</Text>
            <Text style={styles.time}>{rowData.created}</Text>
          </View>
          <View style={styles.btnBox}>
            {
              !this.state.status 
              ? (
                <TouchableOpacity onPress={this.dispatchAttend}>
                  {renderStatus}
                </TouchableOpacity>
              )
              : renderStatus
            }
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

class ActivityBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
    }
  }

  componentDidMount() {
    this._onRefresh('INIT');
  }

  waitRefreshing() {
    const that = this;
    this.timers = setTimeout(() => {
      that.setState({
        isRefreshing: false,
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timers);
  }

  _renderNoMore() {
    return (
      <View style={styles.loadingMore}>
        <Text style={styles.loadingMoreText}>没有更多了</Text>
      </View>
    )
  }

  _renderFooter() {
    let { activeEvents } = this.props;
    if (activeEvents && !activeEvents.next) {
        return this._renderNoMore();
      } else {
        return <ActivityIndicator style={styles.loadingMore} />
      }
  }

  _onRefresh = (type) => {
    let that = this;
    if (type === 'INIT') {
        that.setState({
          isRefreshing: true,
        });
        this.waitRefreshing();
      // this.props.dispatch(fetchEventsActive());
    } else {
      that.setState({
        isRefreshing: true,
      });
      this.waitRefreshing();
      let { activeEvents } = this.props;
      if (!activeEvents.next) {
        return;
      }
      
      // this.props.dispatch(fetchEventsActive(activeEvents.next[activeEvents.next.length - 1]));
    }
    
  }

  ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
  });
  
  render() {
    const { navigation, needAttendEvents, isFetching, dispatch  } = this.props;
    let dataSource = this.ds.cloneWithRows(needAttendEvents ? needAttendEvents.results : []);
    return (
      <View style={styles.container}>
        <ListView
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={() => this._onRefresh()}
            />
          }
          enableEmptySections={true}
          renderFooter={() => this._renderFooter()}
          onEndReached={this._onRefresh}
          dataSource={dataSource}
          onEndReachedThreshold={10}
          showsVerticalScrollIndicator={false}
          renderRow={(rowData) => {
            return <ActivityItem rowData={rowData} key={rowData.id} navigation={navigation} />
          }}
        />
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: px2dp(20),
  },
  listView: {
    alignItems: 'center',
    flex: 1,
  },
  containerItem: {
    paddingBottom: 20,
    marginBottom: 9.75,
    marginTop: 15.5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#C1C1C1',
  },
  title: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 20,
    color: '#000000',
    marginTop: 17,
    width: 313,
  },
  time: {
    fontFamily: 'PingFangSC-Light',
    fontSize: 14,
    color: 'rgba(152,152,152,0.80)',
  },
  already: {
    fontFamily: 'PingFangSC-Thin',
    fontSize: 14,
    color: '#000000',
  },
  statusBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 15,
  },
  pic: {
    width: 313,
    height: 176,
    borderRadius: 5,
  },
  detailBox: {
    width: 150,
    height: 42,
    backgroundColor: '#4990E2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 2,
  },
  detail: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 20,
    color: '#FFFFFF',
  },
  btnBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gradient: {
    width: 313,
    height: 42,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  gradientText: {
    backgroundColor: 'transparent',
    fontFamily: 'PingFangSC-Regular',
    fontSize: 20,
    color: '#FFFFFF',
  },
  picBox: {
    width: 313,
    height: 176,
    borderRadius: 5,
    position: 'absolute',
  },
  loadingMore: {
    marginBottom: 10,
  },
  loadingMoreText: {
    color: '#777',
    textAlign: 'center',
  },
  signText: {
    textAlign: 'center',
    marginTop: px2dp(10),
  },
});

const mapStateToProps = (state) => ({
  activeEvents: state.home.events.activeEvents,
  isFetching: state.home.events.isFetching,
  token: state.auth.token,
  attend: state.content.attend,
});

export default connect(mapStateToProps)(ActivityBox);