import { createSwitchNavigator } from 'react-navigation'

import LoginScreen from '../login/LoginScreen'
import DashboardTabNavigator from './DashboardTabNavigator'
import SignUpStackNavigator from './SignUpStackNavigator'
import RecoverPasswordScreen from '../password/RecoverPasswordScreen';

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Login: LoginScreen,
  RecoverPassword: RecoverPasswordScreen,
  Home: DashboardTabNavigator,
  SignUp: SignUpStackNavigator,
})