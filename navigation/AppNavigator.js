import { createStackNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import DashBoardScreen from '../screens/DashboardScreen';
import CpfScreen from '../screens/SignUp/CpfScreen';
import PersonalDataScreen from '../screens/SignUp/PersonalDataScreen';
import AddressScreen from '../screens/SignUp/AddressScreen';
import PhoneScreen from '../screens/SignUp/PhoneScreen';
import CredentialsScreen from '../screens/SignUp/CredentialsScreen';
import CreateDonationScreen from '../screens/Donation/CreateDonationScreen';
import CreateNeedScreen from '../screens/Donation/CreateNeedScreen';

export default createStackNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Login: LoginScreen,
  Dashboard: DashBoardScreen,
  CreateDonation: CreateDonationScreen,
  CreateNeed: CreateNeedScreen,
  SignUpCPF: CpfScreen,
  SignUpPersonal: PersonalDataScreen,
  SignUpAddress: AddressScreen,
  SignUpPhone: PhoneScreen,
  SignUpCredentials: CredentialsScreen,
});