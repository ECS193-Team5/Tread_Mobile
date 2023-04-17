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
  // screenOptions={({ route }) => ({
  //   tabBarIcon: ({ focused, color, size }) => {
  //     let iconName;

  //     // if (route.name === 'Challenges') {
  //     //   iconName = focused
  //     //     ? 'ios-information-circle'
  //     //     : 'ios-information-circle-outline';
  //     // } else if (route.name === 'Settings') {
  //     //   iconName = focused ? 'ios-list' : 'ios-list-outline';
  //     // }

  //     // // You can return any component that you like here!
  //     // return <Icon name={iconName} size={size} color={color} />;
  //     return <Image source={{ uri: 'https://i.imgur.com/qajrJEV.png'}}
  //   />
  //   },
  //   tabBarActiveTintColor: 'tomato',
  //   tabBarInactiveTintColor: 'gray',
  // })}
  
    screenOptions={({route}) => ({
      tabBarIcon:({focused, color, size}) => {
        let iconName;
        let iconColor;
        let iconGroup;
        
        iconColor = focused 
        ? "#9B9595"
        : "#F9A800"
        
        if (route.name === 'Challenges') {
          iconName = "target-2"
          iconGroup = "miscellaneous"
          console.log({iconName})
          // return <Icon name = "target-2" group = "miscellaneous" />
        } else if (route.name === 'Leagues') {
          iconName = "star"
          iconGroup = "new-year"
          console.log({iconName})
          // return <Icon name = "target-2" group = "miscellaneous" />
        } else if (route.name === 'Add') {
          iconName = "plus"
          iconGroup = "ui-interface"
          console.log({iconName})
          // return <Icon name = "target-2" group = "miscellaneous" />
        } else if (route.name === 'Search') {
          iconName = "search"
          iconGroup = "essential"
          console.log({iconName})
          // return <Icon name = "target-2" group = "miscellaneous" />
        } else if (route.name === 'Profile') {
          iconName = "profile"
          iconGroup = "basic"
          console.log({iconName})
          // return <Icon name = "target-2" group = "miscellaneous" />
        }
        // return <Icon name = "target-2" group = "miscellaneous" />

        // return <Icon name = {iconName} group = {iconGroup} />
        return <Image style ={{width : 30, height : 30}} source={{uri: 'https://i.imgur.com/qajrJEV.png'}}/>
      }
    })
  }
  > 
    <Tab.Screen name="Challenges" component={Challenge} options={{ headerShown: false }}/>
    <Tab.Screen name="Leagues" component={LeaguesPage} options={{ headerShown: false }}/>
    <Tab.Screen name="Add" component={AddPage} options={{ headerShown: false }}/>
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