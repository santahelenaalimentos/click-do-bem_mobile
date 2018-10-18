import React from 'react'
import {
  Platform,
} from 'react-native'
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation'
import DonationsScreen from '../screens/Items/DonationsScreen'
import NeedsScreen from '../screens/Items/NeedsScreen'
import CreateDonationScreen from '../screens/Items/CreateDonationScreen'
import CreateNeedScreen from '../screens/Items/CreateNeedScreen'
import DashboardScreen from '../screens/DashboardScreen'
import ItemDetailsScreen from '../screens/Items/ItemDetailsScreen'
import TabBarIcon from '../components/TabBarIcon'


const DashboardStack = createStackNavigator({
  Dashboard: DashboardScreen,
  CreateNeed: CreateNeedScreen,
  CreateDonation: CreateDonationScreen,
})

DashboardStack.navigationOptions = {
  tabBarLabel: 'Dashboard',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
}

const NeedsStack = createStackNavigator({
  Needs: NeedsScreen,
  ItemDetails: ItemDetailsScreen,
})

NeedsStack.navigationOptions = {
  tabBarLabel: 'Necesidades',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
}

const DonationsStack = createStackNavigator({
  Donations: DonationsScreen,
  ItemDetails: ItemDetailsScreen,
})

DonationsStack.navigationOptions = {
  tabBarLabel: 'Doações',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
}

export default createBottomTabNavigator({
  DonationsStack,
  DashboardStack,
  NeedsStack,
},
{
  initialRouteName: 'DonationsStack',
  order: ['DonationsStack', 'NeedsStack', 'DashboardStack'],

})