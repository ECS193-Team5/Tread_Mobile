import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Image} from 'react-native'

import Icon from 'react-native-vector-icons'

import Login from './pages/loginPage';
import Signup from './pages/signupPage';
import Challenge from './pages/challengesPage';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import LeaguesPage from './pages/leaguesPage';
import AddPage from './pages/addPage';
import SearchPage from './pages/searchPage';
import ProfilePage from './pages/profilePage';

const Tab = createBottomTabNavigator();
 
const Stack = createNativeStackNavigator();

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
      tabBarStyle : { 
        height :90 , 
        borderRadius : 40, 
        overflow : 'hidden'},
    })
  }
  > 
    <Tab.Screen name="Challenges" component={Challenge} options={{ headerShown: false }}/>
    <Tab.Screen name="Leagues" component={LeaguesPage} options={{ headerShown: false }}/>
    <Tab.Screen name="Add" component={AddPage} options={{headerShown: false}}/>
    <Tab.Screen name="Search" component={SearchPage} options={{ headerShown: false }}/>
    <Tab.Screen name="Profile" component={ProfilePage} options={{ headerShown: false }}/>
  </Tab.Navigator>
  )
}

function App(): JSX.Element {
  return (
		<NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name = "Login" component = {Login} options={{ headerShown: false }}/>
        <Stack.Screen name = "Signup" component={Signup} options={{ headerShown: false }}/>
        <Stack.Screen name = "Challenge" component={ShowTabs} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;