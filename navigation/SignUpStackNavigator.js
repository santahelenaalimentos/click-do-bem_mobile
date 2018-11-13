import { createStackNavigator } from 'react-navigation'

import CpfScreen from '../screens/sign_up/CpfScreen'
import PersonalDataScreen from '../screens/sign_up/PersonalDataScreen'
import AddressScreen from '../screens/sign_up/AddressScreen'
import PhoneScreen from '../screens/sign_up/PhoneScreen'
import CredentialsScreen from '../screens/sign_up/CredentialsScreen'

export default createStackNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  SignUpCPF: CpfScreen,
  SignUpPersonal: PersonalDataScreen,
  SignUpAddress: AddressScreen,
  SignUpPhone: PhoneScreen,
  SignUpCredentials: CredentialsScreen,

})