import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class Button extends Component {
  render() {
    return (
      <Button style={styles.signInButton} onPress={this.onPressSignIn} block >
        <Text style={styles.signInText}>Entrar</Text>
      </Button>
    )
  }
}