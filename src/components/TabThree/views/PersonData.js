import React, { Component } from 'react';
import { View,  StyleSheet,  ScrollView } from 'react-native';
import SinglePicker from 'mkp-react-native-picker';

import Header from '../../common/Header';
import PersonDataItem from './DataItem';

// import base url for present image
import { base } from '../../../util/';

// construct all need data in this function
const constructData = (data) => {
  const constructedData = [];

  // get all keys of this data
  const dataKeys = Object.keys(data);

  const mapKeyToTitle = {
    'avatar': '头像',
    'name': '姓名',
    'sex': '性别',
    'identity': '身份',
    'college': '学院',
    'major': '专业',
    'studentId': '学号',
  };

  dataKeys.map((item, key) => {
    const filterKeys = Object.keys(mapKeyToTitle);

    if (filterKeys.includes(item)) {
      constructedData.push({
        id: key,
        title: mapKeyToTitle[item],
        content: data[item],
      });
    }
  });

  console.log('constructedData', constructedData);

  return constructedData;
}

class PersonData extends Component {

  
  render() {
    const { profile } = this.props.navigation.state.params;
    let itemOne = [];
    let itemTwo = [];
    return (
      <ScrollView style={styles.container}>
        <View style={styles.itemContainer}>{itemOne}</View>
        <View style={styles.itemContainer}>{itemTwo}</View>
      </ScrollView>
    )
  }
}

PersonData.navigationOptions = ({ navigation }) => ({
  headerTitle: (
    <View style={styles.headerTitle}>
      <Header 
        logoLeft={require('../../TabOne/img/back.png')}
        headerText="个人档案"
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
    backgroundColor: '#f5f6f7',
  },
  itemContainer: {
    shadowOffset: { x: 0, y: 5 },
    shadowColor: '#C7C7C7',
    shadowRadius: 40,
    shadowOpacity: 0.32,
    backgroundColor: '#FFF',
    marginTop: 20,
    overflow: 'hidden',
  },
  singlePicker: {
    backgroundColor: '#f5f6f7',
  }
})

export default PersonData;