import React from 'react'
import {
  Platform,
} from 'react-native'
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import CreateItemsScreen from '../items/CreateItemScreen'
import ItemDetailsScreen from '../items/ItemDetailsScreen'
import EditItemScreen from '../items/EditItemScreen'
import ItemsScreen from '../items/ItemsScreen'
import ProfileScreen from '../profile/ProfileScreen'
import Colors from '../../utils/Colors'
import MatchesScreen from '../matches/MatchesScreen'
import EditInfoScreen from '../profile/EditInfoScreen'
import ChangePasswordScreen from '../password/ChangePasswordScreen'
import RankingScreen from '../ranking/RankingScreen';
import MenuScreen from '../menu/MenuScreen';
import CampaignsScreen from '../campaigns/CampaignsScreen'

const ios = Platform.OS === 'ios'


const CampaignStack = createStackNavigator({
  Campaigns: CampaignsScreen,
},
{
  navigationOptions: {header: null}
})

CampaignStack.navigationOptions = {
  tabBarLabel: 'Campanhas',
  tabBarIcon: ({ focused }) => (
    <MaterialCommunityIcons
      name= "bulletin-board"
      size={24}
      color={focused ? Colors.purple : Colors.grey}
    />
  ),
}

const ProfileStack = createStackNavigator({
  Matches: MatchesScreen,
},
{
  navigationOptions: {header: null}
})

ProfileStack.navigationOptions = {
  tabBarLabel: 'Matches',
  tabBarIcon: ({ focused }) => (
    <MaterialCommunityIcons
      name= "creation"
      size={24}
      color={focused ? Colors.purple : Colors.grey}
    />
  ),
}

const MenuStack = createStackNavigator({
  Menu: MenuScreen,
  CreateNeed: {screen: props => <CreateItemsScreen {...props} donation={false}/>},
  CreateDonation: {screen: props => <CreateItemsScreen {...props} donation={true}/>},
  ProfileScreen: ProfileScreen,
  ChangePassword: ChangePasswordScreen,
  EditInfo: EditInfoScreen,
  Ranking: RankingScreen,
},
{
  navigationOptions: {header: null}
})

MenuStack.navigationOptions = {
  tabBarLabel: 'Menu',
  tabBarIcon: ({ focused }) => (
    <MaterialCommunityIcons
      name= "menu"
      size={24}
      color={focused ? Colors.purple : Colors.grey}
    />
  ),
}

const NeedsStack = createStackNavigator({
  Needs: {screen: props => <ItemsScreen {...props} donation={false}/>},
  ItemDetails: ItemDetailsScreen,
  EditNeed: EditItemScreen,
},
{
  navigationOptions: {header: null}
})

NeedsStack.navigationOptions = {
  tabBarLabel: 'Necessidades',
  tabBarIcon: ({ focused }) => (
    <MaterialCommunityIcons
      name= "heart-half-full"
      size={24}
      color={focused ? Colors.purple : Colors.grey}
    />
  ),
}

const DonationsStack = createStackNavigator({
  Donations: {screen: props => <ItemsScreen {...props} donation={true}/>},
  ItemDetails: ItemDetailsScreen,
  EditDonation: EditItemScreen,
},
{
  navigationOptions: {header: null}
})

DonationsStack.navigationOptions = {
  tabBarLabel: 'Doações',
  tabBarIcon: ({ focused }) => (
    <MaterialCommunityIcons
      name= "heart"
      size={24}
      color={focused ? Colors.purple : Colors.grey}
    />
  ),
}

const showTabBar = (navigation) => {
  const { routes } = navigation.state
  let show = true
  routes.forEach((route) => {
    if (route.routeName === 'CreateNeed' || route.routeName === 'CreateDonation' 
        || route.routeName === 'EditNeed' || route.routeName === 'EditDonation' )
      show = false
  })
  return show
}

export default createBottomTabNavigator({
  DonationsStack,
  MenuStack,
  CampaignStack,
  NeedsStack,
  ProfileStack,
},
{
  initialRouteName: 'DonationsStack',
  order: ['DonationsStack', 'NeedsStack', 'CampaignStack', 'ProfileStack', 'MenuStack'],
  tabBarOptions: {
    activeTintColor: Colors.purple,
    inactiveTintColor: Colors.grey,
  },
  navigationOptions: ({ navigation }) => ({ tabBarVisible: showTabBar(navigation) })
})
