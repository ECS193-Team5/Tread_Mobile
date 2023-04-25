import { NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import {Image} from 'react-native'

import Login from '../../pages/loginPage';
import Signup from '../../pages/signupPage';
import Challenge from '../../pages/ChallengesPage';
import LeaguesPage from '../../pages/leaguesPage';
import AddPage from '../../pages/addPage';
import SearchPage from '../../pages/searchPage';
import ProfilePage from '../../pages/profilePage';
import IncomingChallengesPage from '../../pages/incomingChallengesPage'

const Tab = createBottomTabNavigator();
 
const Stack = createNativeStackNavigator();

const TopTab = createMaterialTopTabNavigator();

import {styles} from '../../css/navigation/Style';
import IncomingLeaguesPage from '../../pages/incomingLeaguesPage';
import LeagueDetails from '../../pages/leagueDetails';

function ChallengesSwipeStack() {
  return (
    <TopTab.Navigator
      tabBarPosition='bottom'
    >
      <TopTab.Screen name = "Challenges" component= {Challenge}/>
      <TopTab.Screen name = "Incoming Challenges" component = {IncomingChallengesPage}/>
    </TopTab.Navigator>
  )
}

function LeaguesSwipeStack() {
  return (
    <TopTab.Navigator
      tabBarPosition='bottom'
    >
      <TopTab.Screen name = "Leagues" component= {LeaguesPage}/>
      <TopTab.Screen name = "Incoming Leagues" component = {IncomingLeaguesPage}/>
    </TopTab.Navigator>
  )
}

function ChallengesStack(){
  return (
  <Stack.Navigator>
    <Stack.Screen name = "Challenges" component={ChallengesSwipeStack} options={{ headerShown: false }}/>
    <Stack.Screen name = "Incoming Challenges" component={IncomingChallengesPage} options={{ headerShown: false }}/>
  </Stack.Navigator>
  )
}

function LeaguesStack(){
  return (
  <Stack.Navigator>
    <Stack.Screen name = "Leagues" component={LeaguesSwipeStack} options={{ headerShown: false }}/>
    <Stack.Screen name = "Incoming Leagues" component={IncomingLeaguesPage} options={{ headerShown: false }}/>
    <Stack.Screen name = "League Details" component={LeagueDetails} options={{headerShown: false ,
                                                                              animationTypeForReplace: 'push',
                                                                              animation:'slide_from_right'}}/>
  </Stack.Navigator>
  )
}

function AddStack(){
  return (
  <Stack.Navigator>
    <Stack.Screen name = "Add" component={AddPage} options={{ headerShown: false }}/>
  </Stack.Navigator>
  )
}

function SearchStack(){
  return (
  <Stack.Navigator>
    <Stack.Screen name = "Search" component={SearchPage} options={{ headerShown: false }}/>
  </Stack.Navigator>
  )
}

function ProfileStack(){
  return (
  <Stack.Navigator>
    <Stack.Screen name = "Profile" component={ProfilePage} options={{ headerShown: false }}/>
  </Stack.Navigator>
  )
}

function ShowTabs(){
  return (
  <Tab.Navigator 
    screenOptions={({route}) => ({
      tabBarIcon:({focused, color, size}) => {
        let iconName;
        
        if (route.name === 'Challenges') {
          iconName = focused
          ? "https://imgur.com/FTvnYD3.png"
          : "https://imgur.com/yo7tEEr.png"
        } else if (route.name === 'Leagues') {
          iconName = focused
          ? "https://imgur.com/fMqLrA2.png"
          : "https://imgur.com/PZgaF7K.png"
        } else if (route.name === 'Add') {
          iconName = focused
          ? "https://imgur.com/0MHiWup.png"
          : "https://imgur.com/iWwOCAG.png"
        } else if (route.name === 'Search') {
          iconName = focused
          ? "https://imgur.com/yUUEUim.png"
          : "https://imgur.com/NUVX70E.png"
        } else if (route.name === 'Profile') {
          iconName = focused
          ? "https://imgur.com/zZnCC7M.png"
          : "https://imgur.com/R5bFbb3.png"
        }

       return <Image style ={{width : 30, height : 30}} source={{uri: iconName}}/>
      },
      tabBarActiveTintColor: '#F9A800',
      tabBarInactiveTintColor: '#9B9595',
      tabBarStyle : styles.navBarStyle,
    })
  }
  > 
    <Tab.Screen name="Challenges" component={ChallengesStack} options={{ headerShown: false }}/>
    <Tab.Screen name="Leagues" component={LeaguesStack} options={{ headerShown: false }}/>
    <Tab.Screen name="Add" component={AddStack} options={{headerShown: false}}/>
    <Tab.Screen name="Search" component={SearchPage} options={{ headerShown: false }}/>
    <Tab.Screen name="Profile" component={ProfilePage} options={{ headerShown: false }}/>
  </Tab.Navigator>
  )
}

function Navigator(){
  return (
		<NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "Login" component = {Login} options={{ headerShown: false }}/>
        <Stack.Screen name = "Signup" component={Signup} options={{ headerShown: false }}/>
        <Stack.Screen name = "Challenge" component={ShowTabs} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator