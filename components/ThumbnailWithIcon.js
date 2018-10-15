import React from 'react'
import { Image, View, StyleSheet, Platform } from 'react-native'
import { Icon, Button } from 'native-base'
import Colors from '../constants/Colors';

export default function ThumbnailWithIcon(props) {
  const { uri } = props
  return (
    <View>
      <Image 
        source={{ uri }} style={styles.thumbnail} />
      <Button 
        transparent
        onPress={ () => props.remove(uri) }
        style = {styles.removeButton}>
        <Icon 
          ios="ios-close-circle" 
          android="md-close-circle"
          style={styles.imageIcon} 
          style={styles.removeIcon} 
        />
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  thumbnail: {
    width: 100,
    height: 75,
    margin: 3,
  },
  removeButton:{
    position: 'absolute',
    right: 0,
    top: 0,
  },
  removeIcon:{
    fontSize: Platform.OS === 'ios' ? 24 : 24,
    fontWeight: Platform.OS === 'ios' ? '700' : '400',
    color: Platform.OS === 'ios' ? 'white' : 'white',
  },
})