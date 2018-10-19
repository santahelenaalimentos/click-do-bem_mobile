import React, { Component } from 'react'
import { 
  Text, 
  View,
} from 'react-native'
import {
  Button,
} from 'native-base'
import Colors from '../constants/Colors'

export default class FiltersBar extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={{ height: 40, backgroundColor: Colors.bitGrey, marginTop: -1, elevation: 3, marginBottom: 5 }}>
        <Button
          transparent
          style={{ margin: 4, borderColor: Colors.grey, borderWidth: .5, borderColor: Colors.grey, height: 25, alignSelf: 'flex-end' }}
          onPress={() => this.props.open()}>
          <Text style={{ color: Colors.grey, fontSize: 12, fontWeight: '300' }}>Filtros</Text>
        </Button>
      </View>
    )
  }
}