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
    const { filtered } = this.props;
    return (
      <View style={{ height: 40, paddingHorizontal: '4%', justifyContent: 'center' }}>
        {
          filtered
          ?
          <Button
            style={{ backgroundColor: Colors.purple, height: 25, alignSelf: 'flex-start' }}
            onPress={() => this.props.open()}>
            <Text style={{ color: Colors.white, fontSize: 12, fontWeight: '400', paddingHorizontal: 5 }}>Filtros ··· </Text>
          </Button>
          :
          <Button
            transparent
            style={{ borderWidth: .5, borderColor: Colors.purple, height: 25, alignSelf: 'flex-start' }}
            onPress={() => this.props.open()}>
            <Text style={{ color: Colors.purple, fontSize: 12, fontWeight: '400', paddingHorizontal: 5 }}>Filtros</Text>
          </Button>

        }
      </View>
    )
  }
}