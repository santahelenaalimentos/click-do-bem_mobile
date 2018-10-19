import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Colors from '../../constants/Colors';

export default class FiltersScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white'}}>
        <Text style={{fontSize: 50, color: Colors.purple}}> Filtros, MUITOS Filtros </Text>
      </View>
    )
  }
}