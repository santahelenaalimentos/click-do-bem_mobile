import React from 'react'
import {
  Platform,
} from 'react-native'
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import DonationsScreen from '../screens/Items/DonationsScreen'
import NeedsScreen from '../screens/Items/NeedsScreen'
import CreateDonationScreen from '../screens/Items/CreateDonationScreen'
import CreateNeedScreen from '../screens/Items/CreateNeedScreen'
import DashboardScreen from '../screens/DashboardScreen'
import ItemDetailsScreen from '../screens/Items/ItemDetailsScreen'
import EditItemScreen from '../screens/Items/EditItemScreen'
import Colors from '../constants/Colors'

const DashboardStack = createStackNavigator({
  Dashboard: DashboardScreen,
  CreateNeed: CreateNeedScreen,
  CreateDonation: CreateDonationScreen,
})

DashboardStack.navigationOptions = {
  tabBarLabel: 'Dashboard',
  tabBarIcon: ({ focused }) => (
    <MaterialCommunityIcons
      name="plus-circle"
      size={24}
      color={focused ? Colors.purple : Colors.grey}
    />
  ),
}

const NeedsStack = createStackNavigator({
  Needs: NeedsScreen,
  ItemDetails: ItemDetailsScreen,
  EditNeed: EditItemScreen,
})

NeedsStack.navigationOptions = {
  tabBarLabel: 'Necesidades',
  tabBarIcon: ({ focused }) => (
    <MaterialCommunityIcons
      name="emoticon-happy"
      size={24}
      color={focused ? Colors.purple : Colors.grey}
    />
  ),
}

const DonationsStack = createStackNavigator({
  Donations: DonationsScreen,
  ItemDetails: ItemDetailsScreen,
  EditDonation: EditItemScreen,
})

DonationsStack.navigationOptions = {
  tabBarLabel: 'Doações',
  tabBarIcon: ({ focused }) => (
    <MaterialCommunityIcons
      name="emoticon"
      size={24}
      color={focused ? Colors.purple : Colors.grey}
    />
  ),
}

const showTabBar = (navigation) => {
  const { routes } = navigation.state
  let show = true
  routes.forEach((route) => {
    if (route.routeName === 'ItemDetails')
      show = false
  })
  return show
}

export default createBottomTabNavigator({
  DonationsStack,
  DashboardStack,
  NeedsStack,
},
{
  initialRouteName: 'DonationsStack',
  order: ['DonationsStack', 'DashboardStack', 'NeedsStack'],
  tabBarOptions: {
    activeTintColor: Colors.purple,
    inactiveTintColor: Colors.grey,
  },
  navigationOptions: ({ navigation }) => ({ tabBarVisible: showTabBar(navigation) })
})
