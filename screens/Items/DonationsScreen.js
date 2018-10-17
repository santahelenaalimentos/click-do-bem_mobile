import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Container } from 'native-base'

export default class DonationsScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Container>
        <Text> Donation Screen </Text>
      </Container>
    )
  }
}