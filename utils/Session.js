import Storage from './Storage'
import { signOut } from '../actions/index'
import Toast from './Toast'


const logout = (props) => {
    Storage._deleteUser()
    props.dispatch(signOut())
    props.navigation.navigate('Login')
    Toast.toast('Sessão expirada.')
}

export default { logout }