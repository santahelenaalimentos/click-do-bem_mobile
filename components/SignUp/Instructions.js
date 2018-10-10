import React from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Colors from '../../constants/Colors'


export default (props) => {
  const { colors } = props;
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.subtitle}>{props.subtitle}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  titleContainer: {
    paddingTop: 25,
    paddingBottom: 25,
  },
  title: {
    fontSize: 32,
    color: Colors.purple,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 32,
    fontWeight: '700',
    marginTop: -10,
    color: Colors.blue,
  },
});