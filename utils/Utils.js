import {
  Toast
} from 'native-base';
import Colors from '../constants/Colors'

toast = (msg, margin = 100, duration = 1000, color = Colors.blue) => 
  Toast.show({
    text: msg,
    buttonText: 'OK',
    style: {
      marginBottom: margin,
      backgroundColor: color,
    },
    duration: duration,
  })



  
export default { toast };



