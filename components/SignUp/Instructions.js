import React from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';


export default (props) => {
  const { colors } = props;
  return (
    <View style={styles.titleContainer}>
      <Text style={[styles.title, { color: colors.title }]}>{props.title}</Text>
      <Text style={[styles.subtitle, { color: colors.subtitle }]}>{props.subtitle}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  titleContainer: {
    padding: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 32,
    fontWeight: '700',
    marginTop: -10,
  },
});