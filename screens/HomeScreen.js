import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Platform,
} from 'react-native'
import {
  Button
}
  from 'native-base'
import Colors from '../constants/Colors'

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.outerContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.content}> HOME SCREEN </Text>
        </View>

        <View style={styles.tabBarContainer}>
          <View style={styles.tabBar}>

          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  tabBarContainer: {
    flex: .1,
  },
  content: {
    color: Colors.purple,
    fontSize: 56,
  },
  tabBar: {
    width: '100%',
    height: Platform === 'ios' ? 100 : 120,
    borderColor: Colors.purple,
    borderTopWidth: 3,
  },
})