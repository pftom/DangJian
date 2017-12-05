import { } from 'antd-mobile/es/button/index.native';
import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, RefreshControl ,ListView, Picker, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// the compatability for all device about px
import px2dp from '../../../util/';
// the header for all component
import Header from '../../common/Header';

const { width, height } = Dimensions.get('window');

export default class extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <View style={styles.headerTitle}>
        <Header 
          headerText={navigation.state.params.title}
          logoLeft={require('../../TabOne/img/back.png')}
          navigation={navigation}
        />
      </View>
    ),
  })

  handlePress = () => {
    const { navigation } = this.props;
    navigation.navigate('AnswerPage');
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <View style={styles.successBox}>
          <Image source={require('../img/success.png')}/>
          <Text style={styles.successText}>{params.successText}</Text>
        </View>

        <View style={styles.hintBox}>
          <Text style={styles.commonText}>
            今日已学
            <Text style={styles.nowTimeText}> 20</Text>
            <Text style={styles.symbolText}>/</Text>
            <Text style={styles.totalTimeText}>30 </Text>
            min
          </Text>
        </View>

        <View style={styles.btnBox}>
          <TouchableWithoutFeedback onPress={this.handlePress}>
            <LinearGradient
              start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
              colors={['#FF0467', '#FC7437']}
              style={styles.linearGradient}>
              <Text style={styles.btnText}>开始答题</Text>
            </LinearGradient>
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerTitle: {
    top: -10,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  successBox: {
    alignItems: 'center',
    marginTop: 44,
  },
  successText: {
    fontSize: px2dp(25),
    fontWeight: '400',
    marginTop: 31,
    fontWeight: '500',
  },

  hintBox: {
    width,
    alignItems: 'center',
    marginTop: px2dp(62),
    marginBottom: px2dp(63),
  },
  commonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  symbolText: {
    fontSize: 37,
    fontWeight: '500',
  },
  nowTimeText: {
    fontSize: 55,
    color: '#FF0467',
    fontWeight: '500',
  },
  totalTimeText: {
    fontSize: 30,
    fontWeight: '500',
  },

  btnBox: {
    width,
    alignItems: 'center',
  },
  linearGradient: {
    width: px2dp(280),
    height: px2dp(50),
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    backgroundColor: 'transparent',
    fontSize: px2dp(24),
    color: '#FFF',
  }
});