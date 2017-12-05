import { } from 'antd-mobile/es/button/index.native';
import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, RefreshControl ,ListView, Picker, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { PickerView, Button } from 'antd-mobile';
import px2dp from '../../../util/';

import Header from '../../common/Header';

const { width, height } = Dimensions.get('window');

// picker data
const seasons = [
  [
    {
      label: '我欲封神1',
      value: '我欲封神1',
    },
    {
      label: '我欲封神2',
      value: '我欲封神2',
    },
    {
      label: '我欲封神3',
      value: '我欲封神3',
    },
  ],
];

class TabTwoScreenOne extends Component {
  state = {
    value: null,
  };

  onChange = (value) => {
    console.log(value);
    this.setState({
      value,
    });
  }

  onScrollChange = (value) => {
    console.log('value', value);
  }

  handlePress = () => {
    const { navigation } = this.props;
    navigation.navigate('AnswerPage');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.hintBox}>
          <Text style={styles.commonText}>
            今日已学
            <Text style={styles.nowTimeText}> 20</Text>
            <Text style={styles.symbolText}>/</Text>
            <Text style={styles.totalTimeText}>30 </Text>
            min
          </Text>
        </View>

        <View style={styles.scrollBox}>
          <View style={styles.scrollInnerBox}>
            <PickerView
              onChange={this.onChange}
              onScrollChange={this.onScrollChange}
              value={this.state.value}
              data={seasons}
              cascade={false}
              itemStyle={styles.itemStyle}
            />
          </View>
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


TabTwoScreenOne.navigationOptions = ({ navigation }) => ({
  headerTitle: (
      <View style={styles.headerTitle}>
        <Header 
          headerText="在线学习"
          navigation={navigation}
        />
      </View>
    ),
})

const styles = StyleSheet.create({
  headerTitle: {
    top: -10,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  hintBox: {
    width,
    alignItems: 'center',
    marginTop: 52,
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

  scrollBox: {
    width,
    alignItems: 'center',
    marginTop: 53,
  },
  scrollInnerBox: {
    width: px2dp(200)
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
})

export default TabTwoScreenOne;