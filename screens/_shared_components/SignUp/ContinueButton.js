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
import Colors from '../../../utils/Colors';

export default (props) => {
  return (
    <View style={[styles.buttonContainer, { backgroundColor: 'transparent' }]}>
      <Button
        onPress={props.handler}
        style={[styles.button, { backgroundColor: Colors.purple }]} >
        <Text style={styles.text}>
          Continuar
        </Text>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '70%',
    height: 40,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {
    fontWeight: Platform.OS === 'ios' ? '500' : '300',
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
