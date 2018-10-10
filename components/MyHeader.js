import React, { Component } from 'react'
import { 
  Text,
  View,
  Platform,
  StyleSheet,
} from 'react-native'
import {
  Header,
  Body,
  Title,
  Left,
  Right,
  Icon,
  Button,
} from 'native-base'
import Colors from '../constants/Colors'

export default function MyHeader (props) {

  let { buttonColor, goBack, cancel, headerAndroid, statusBarAndroid, title } = props;
  return (
    <View>
      {
        Platform.OS === 'ios'
        ?
        <Header>
          {goBack &&
          <Left>
            <Button transparent onPress={goBack}>
              <Icon style={{color: buttonColor, marginTop: -2}} name='arrow-back' />
              <Text style={{color: buttonColor}}> Voltar</Text>
            </Button>
          </Left>
          }
          <Body>
            <Title>{title}</Title>
          </Body>
          {cancel &&
          <Right>
            <Text style={{color: Colors.blue}} onPress={cancel}>Cancelar</Text>
          </Right>
          }
        </Header>
        :
        <Header  androidStatusBarColor={ Colors.lighterPurple } style={{backgroundColor: Colors.purple, elevation: 7, marginBottom: 10}}>
          {goBack &&
          <Left>
            <Button transparent onPress={goBack}>
              <Icon name='arrow-back'/>
            </Button>
          </Left>
          }
          <Body>
            <Title>{title}</Title>
          </Body>
          {cancel &&
          <Right>
            <Button transparent onPress={cancel}>
              <Icon type="MaterialIcons" name="clear" />
            </Button>
          </Right>
          }
        </Header>
      }
    </View>
  )
}
