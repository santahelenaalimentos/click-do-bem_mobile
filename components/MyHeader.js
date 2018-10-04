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

export default function MyHeader (props) {

  let { buttonColor, goBack, cancel } = props;
  return (
    <View>
      {
        Platform.OS === 'ios'
        &&
        <Header>
          <Left>
            <Button transparent onPress={goBack}>
              <Icon style={{color: buttonColor, marginTop: -2}} name='arrow-back' />
              <Text style={{color: buttonColor}}> Voltar</Text>
            </Button>
          </Left>
          <Body>
            <Title>Cadastro</Title>
          </Body>
          <Right>
            <Text style={{color: buttonColor}} onPress={cancel}>Cancelar</Text>
          </Right>
        </Header>
      }
    </View>
  )
}
