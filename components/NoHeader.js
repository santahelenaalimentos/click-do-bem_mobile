import React, { Component } from 'react'
import { Text, View, Platform } from 'react-native'
import { Header } from 'native-base'
import Colors from '../constants/Colors'

export default class NoHeader extends Component {
  render() {
    return (
      <View>
        {Platform.OS === 'android' && <Header androidStatusBarColor={Colors.purple} style={{display: 'none'}}></Header>}      
      </View>
    )
  }
}