import { NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import {Image, Platform} from 'react-native'

import Login from '../../pages/loginPage';
import Signup from '../../pages/signupPage';
import Challenge from '../../pages/ChallengesPage';
import LeaguesPage from '../../pages/leaguesPage';
import AddPage from '../../pages/addPages/addPage';
import FriendPage from '../../pages/friendsPage';
import ProfilePage from '../../pages/profilePage';
import IncomingChallengesPage from '../../pages/incomingChallengesPage'
import AddChallengePage from '../../pages/addPages/addChallengePage'
import AddFriendPage from '../../pages/addPages/addFriendPage'
import AddLeaguePage from '../../pages/addPages/addLeaguePage'
import IncomingLeaguesPage from '../../pages/incomingLeaguesPage';
import EditLeaguePage from '../../pages/editLeague';
import LeagueDetails from '../../pages/leagueDetails';
import IncomingFriendsPage from '../../pages/incomingFriendsPage';
import CameraView from '../../pages/CameraView';
import EditProfile from "../../pages/editProfile";
import { createProfilePictureURL } from '../Helpers/CloudinaryURLHelper';

import axios from 'axios';
import {BACKEND_URL} from '@env';


const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const TopTab = createMaterialTopTabNavigator();

import {styles} from '../../css/navigation/Style';
import { useEffect, useState } from 'react';
import ProfileInbox from '../../pages/profileInbox';


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

function SearchSwipeStack() {
  return (
    <TopTab.Navigator
      tabBarPosition='bottom'
    >
      <TopTab.Screen name = "Search" component= {FriendPage}/>
      <TopTab.Screen name = "Incoming Friends" component = {IncomingFriendsPage}/>
    </TopTab.Navigator>
  )
}

function ProfileSwipeStack() {
  return (
    <TopTab.Navigator
      tabBarPosition='bottom'
    >
      <TopTab.Screen name = "Profile" component= {ProfilePage}/>
      <TopTab.Screen name = "Profile Inbox" component = {ProfileInbox}/>
    </TopTab.Navigator>
  )
}

function ChallengesStack(){
  return (
  <Stack.Navigator>
    {Platform.OS === 'android' &&
        <Stack.Screen name = "ChallengesMain" component={Challenge} options={{ headerShown: false }}/>
    }

    {Platform.OS === 'ios' &&
        <Stack.Screen name = "ChallengesMain" component={ChallengesSwipeStack} options={{ headerShown: false }}/>
    }

    <Stack.Screen name = "Incoming Challenges" component={IncomingChallengesPage} options={{ headerShown: false}}/>
  </Stack.Navigator>
  )
}

function LeaguesStack(){
  return (
  <Stack.Navigator>
    {Platform.OS === 'android' &&
        <Stack.Screen name = "LeaguesMain" component={LeaguesPage} options={{ headerShown: false}}/>
    }

    {Platform.OS === 'ios' &&
        <Stack.Screen name = "LeaguesMain" component={LeaguesSwipeStack} options={{ headerShown: false}}/>
    }

    <Stack.Screen name = "Incoming Leagues" component={IncomingLeaguesPage} options={{ headerShown: false }}/>
    <Stack.Screen name = "EditLeague" component={EditLeaguePage} options={{ headerShown: false }}/>
    <Stack.Screen name = "League Details" component={LeagueDetails} options={{headerShown: false ,
                                                                              animationTypeForReplace: 'push',
                                                                              animation:'slide_from_right'}}/>

  </Stack.Navigator>
  )
}

function AddStack(){
  return (
  <Stack.Navigator>
    <Stack.Screen name = "AddAll" component={AddPage} options={{ headerShown: false }}/>
    <Stack.Screen name = "AddChallenge" component={AddChallengePage} options={{ headerShown: false}}/>
    <Stack.Screen name = "AddFriend" component={AddFriendPage} options={{ headerShown: false }}/>
    <Stack.Screen name = "AddLeague" component={AddLeaguePage} options={{ headerShown: false }}/>
  </Stack.Navigator>
  )
}


function SearchStack(){
  return (
  <Stack.Navigator>

    {Platform.OS === 'android' &&
        <Stack.Screen name = "SearchMain" component={FriendPage} options={{ headerShown: false }}/>
    }

    {Platform.OS === 'ios' &&
        <Stack.Screen name = "SearchMain" component={SearchSwipeStack} options={{ headerShown: false }}/>
    }

    <Stack.Screen name = "Incoming Friends" component={IncomingFriendsPage} options={{ headerShown: false}}/>
  </Stack.Navigator>
  )
}

function ProfileStack(){
  return (
  <Stack.Navigator>

    {Platform.OS === 'android' &&
        <Stack.Screen name = "Profile" component={ProfilePage} options={{ headerShown: false }}/>
    }

    {Platform.OS === 'ios' &&
        <Stack.Screen name = "Profile" component={ProfileSwipeStack} options={{ headerShown: false }}/>
    }
    <Stack.Screen name = "EditProfile" component={EditProfile} options={{ headerShown: false }}/>
    <Stack.Screen name = "Profile Inbox" component = {ProfileInbox}/>
  </Stack.Navigator>
  )
}

function ShowTabs(){
  const getUserName = function() {
    var config = {
        method: 'post',
        url: BACKEND_URL + 'user/get_username',
        withCredentials: true,
        credentials: 'include',
        headers: {
            Accept: 'application/json',
        }
    };
  
    axios(config)
        .then(function (response) {
            setPicture(createProfilePictureURL(response.data))
        })
        .catch((error) =>
            console.log(error)
        )
  }

  const [picture, setPicture] = useState('')
  const [load, setLoad] = useState(false)
  useEffect(() => {
    if(!load){
      setLoad(true)
      getUserName()
    }

  }, [load])
  
  
  return (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon:({focused, color, size}) => {
        let iconName = undefined;
        let boolIsProfile;
        let borderColor;

        if (route.name === 'Challenges') {
          iconName = focused
          ? "https://imgur.com/FTvnYD3.png"
          : "https://imgur.com/yo7tEEr.png"
        } else if (route.name === 'Leagues') {
          iconName = focused
          ? "https://imgur.com/fMqLrA2.png"
          : "https://imgur.com/PZgaF7K.png"
        } else if (route.name === 'Add' || route.name === 'AddChallenge' || route.name ===
        'AddFriend' || route.name === 'AddLeague') {
          iconName = focused
          ? "https://imgur.com/0MHiWup.png"
          : "https://imgur.com/iWwOCAG.png"
        } else if (route.name === 'Friends') {
          iconName = focused
          ? "https://imgur.com/6mdmwb6.png"
          : "https://imgur.com/OdvBddd.png"
        } else if (route.name === 'Profile') {
          iconName = picture
          borderColor = focused
          ? "#F9A800"
          : "#014421"
          boolIsProfile = true 
        }

       return <Image 
        style ={ boolIsProfile ? {width : 32, height : 32 , borderRadius : 16, borderWidth : 2, borderColor : borderColor} : {width : 30, height : 30}} 
        source={{uri: iconName}}
        />
      },
      tabBarActiveTintColor: '#F9A800',
      tabBarInactiveTintColor: '#9B9595',
      tabBarStyle : styles.navBarStyle,
    })
  }
  >
    <Tab.Screen name="Challenges" component={ChallengesStack} options={{ headerShown: false}}/>
    <Tab.Screen name="Leagues" component={LeaguesStack} options={{ headerShown: false }}/>
    <Tab.Screen name="Add" component={AddStack} options={{headerShown: false}}/>
    <Tab.Screen name="Friends" component={SearchStack} options={{ headerShown: false }}/>
    <Tab.Screen name="Profile" component={ProfileStack} options={{ headerShown: false }}/>
  </Tab.Navigator>
  )
}

function Navigator(){
  return (
		<NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "Login" component = {Login} options={{ headerShown: false }}/>
        <Stack.Screen name = "Signup" component={Signup} options={{ headerShown: false }}/>
        <Stack.Screen name = "Challenge" component={ShowTabs} options={{ headerShown: false}}/>
        <Stack.Screen name = "CameraView" component={CameraView} options={{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator