import { createSwitchNavigator } from 'react-navigation'

import LoginScreen from '../screens/LoginScreen'
import DashboardTabNavigator from './DashboardTabNavigator'
import SignUpStackNavigator from './SignUpStackNavigator'

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Login: LoginScreen,
  Home: DashboardTabNavigator,
  SignUp: SignUpStackNavigator,
})