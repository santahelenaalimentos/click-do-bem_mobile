import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import {
  Button,
} from 'native-base';
import Colors from '../../constants/Colors';

export default (props) => {
  return (
    <View style={[styles.buttonContainer, { backgroundColor: Colors.purple }]}>
      <Button
        onPress={props.handler}
        style={[styles.button, { backgroundColor: Colors.blue }]} >
        <Text style={styles.text}>
          Continuar
        </Text>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '80%',
    height: 45,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {
    fontWeight: '500',
    fontSize: 24,
    color: 'white',
  },
  buttonContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: Platform.OS === 'ios' ? 100 : 80,
    maxHeight: Platform.OS === 'ios' ? 100 : 80,
  }
})
