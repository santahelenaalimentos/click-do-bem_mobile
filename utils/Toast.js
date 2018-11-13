import {
    Toast
} from 'native-base';
import Colors from '../utils/Colors'

toast = (msg, margin = 50, duration = 2000, color = Colors.evenLighterPurple) =>
    Toast.show({
        text: msg,
        buttonText: 'OK',
        style: {
            marginBottom: 60,
            backgroundColor: color,
        },
        duration: duration,
    })

toastTop = (msg, margin = 10, duration = 2000, color = Colors.evenLighterPurple) =>
    Toast.show({
        text: msg,
        buttonText: 'OK',
        position: 'top',
        style: {
            marginTop: 10,
            backgroundColor: color,
        },
        duration: duration,
    })

export default { toast, toastTop };



