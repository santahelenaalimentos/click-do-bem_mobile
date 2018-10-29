import {
  Toast
} from 'native-base';
import Colors from '../constants/Colors'

toast = (msg, margin = 100, duration = 2000, color = Colors.blue) =>
  Toast.show({
    text: msg,
    buttonText: 'OK',
    style: {
      marginBottom: margin,
      backgroundColor: color,
    },
    duration: duration,
  })

toastTop = (msg, margin = 10, duration = 2000, color = Colors.blue) =>
  Toast.show({
    text: msg,
    buttonText: 'OK',
    position: 'top',
    style: {
      marginTop: margin,
      backgroundColor: color,
    },
    duration: duration,
  })




export default { toast, toastTop };



