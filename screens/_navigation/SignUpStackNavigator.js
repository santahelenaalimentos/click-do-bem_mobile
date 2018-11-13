import { createStackNavigator } from 'react-navigation'

import CpfScreen from '../sign_up/CpfScreen'
import PersonalDataScreen from '../sign_up/PersonalDataScreen'
import AddressScreen from '../sign_up/AddressScreen'
import PhoneScreen from '../sign_up/PhoneScreen'
import CredentialsScreen from '../sign_up/CredentialsScreen'

export default createStackNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  SignUpCPF: CpfScreen,
  SignUpPersonal: PersonalDataScreen,
  SignUpAddress: AddressScreen,
  SignUpPhone: PhoneScreen,
  SignUpCredentials: CredentialsScreen,

})