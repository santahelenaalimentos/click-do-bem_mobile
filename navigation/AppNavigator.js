import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import DashBoardScreen from '../screens/DashboardScreen';

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Login: LoginScreen,
  Dashboard: {screen: DashBoardScreen},
});