import { AsyncStorage } from 'react-native';

_storeUser = async (user, token) => {
    try {
        await AsyncStorage.setItem('storedUserData', JSON.stringify({ ...user, token }));
    } catch (error) {
        console.log(error.message);
    }
}

const _recoverData = async (name) => {
    try {
        let data = await AsyncStorage.getItem(name)
        return data
    } catch (error) {
        console.log(error.message)
    }
}

const _deleteUser = async () => {
    try {
        await AsyncStorage.removeItem('storedUserData')
    } catch (error) {
        console.log(error.message)
    }
}

export default { _storeUser, _recoverData, _deleteUser }