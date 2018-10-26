import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Colors from '../constants/Colors'
import MyHeader from '../components/MyHeader';

export default class MatchesScreen extends Component {
    render() {
        return (
            <View style={{flex:1}}>
                <MyHeader title='Matches' />
                <View style={{
                    flex: 1, alignItems: 'center',
                    justifyContent: 'center', backgroundColor: 'white'
                }}>
                    <Text style={{ color: Colors.purple }}> Tela de matches </Text>
                </View>
            </View>
        )
    }
}