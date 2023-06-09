import { NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import {AppState, Image, Platform} from 'react-native'

import messaging from "@react-native-firebase/messaging";
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

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import {BACKEND_URL} from '@env';


const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const TopTab = createMaterialTopTabNavigator();

import {styles} from '../../css/navigation/Style';
import { useEffect, useState } from 'react';
import ProfileInbox from '../../pages/profileInbox';
import { showMessage } from 'react-native-flash-message';

import { useSelector, useDispatch } from 'react-redux';
import { badgeC_increment } from '../../redux/actions/badgeC_actions'
import { badgeL_increment } from '../../redux/actions/badgeL_actions';
import { badgeF_increment } from '../../redux/actions/badgeF_actions';
import { badgeP_increment } from '../../redux/actions/badgeP_actions';

function ChallengesSwipeStack() {
  return (
    <TopTab.Navigator
      tabBarPosition='bottom'
      screenOptions={{
        swipeEnabled: Platform.OS === 'android' ? false : true
      }}
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
      screenOptions={{
        swipeEnabled: Platform.OS === 'android' ? false : true
      }}
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
      screenOptions={{
        swipeEnabled: Platform.OS === 'android' ? false : true
      }}
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
      screenOptions={{
        swipeEnabled: Platform.OS === 'android' ? false : true
      }}
    >
      <TopTab.Screen name = "Profile" component= {ProfilePage}/>
      <TopTab.Screen name = "Profile Inbox" component = {ProfileInbox}/>
    </TopTab.Navigator>
  )
}

function ChallengesStack(){
  return (
  <Stack.Navigator>
    <Stack.Screen name = "Challenges" component={ChallengesSwipeStack} options={{ headerShown: false }}/>
    <Stack.Screen name = "Incoming Challenges" component={IncomingChallengesPage} options={{ headerShown: false}}/>
  </Stack.Navigator>
  )
}

function LeaguesStack(){
  return (
  <Stack.Navigator>
    <Stack.Screen name = "Leagues" component={LeaguesSwipeStack} options={{ headerShown: false}}/>
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
    <Stack.Screen name = "Search" component={SearchSwipeStack} options={{ headerShown: false }}/>
    <Stack.Screen name = "Incoming Friends" component={IncomingFriendsPage} options={{ headerShown: false}}/>
  </Stack.Navigator>
  )
}

function ProfileStack(){
  return (
  <Stack.Navigator>
    <Stack.Screen name = "Profile" component={ProfileSwipeStack} options={{ headerShown: false }}/>
    <Stack.Screen name = "EditProfile" component={EditProfile} options={{ headerShown: false }}/>
    <Stack.Screen name = "Profile Inbox" component = {ProfileInbox}  options={{ headerShown: false }}/>
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
        .catch((error) =>{
          console.log(error);
        }
        )
  }

  const [picture, setPicture] = useState("https://i.imgur.com/jJaPs4q.png")
  const [load, setLoad] = useState(false)

  useEffect(() => {
    if(!load){
      setLoad(true)
      getUserName()
    }

  }, [load])

  const getBadgeChallenge = function(){
    var config = {
      method: 'post',
      url: BACKEND_URL + 'challenges/received_challenges',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      }
    };

    axios(config)
      .then(function (response) {
        dispatch(badgeC_increment(response.data.length))
      })
      .catch(function (error) {
        console.log(error)
      })
  }


  const getBadgeLeague = function(){
    var config = {
      method: 'post',
      url: BACKEND_URL + 'league/get_invited_leagues',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      }
    };

    axios(config)
      .then(function (response) {
        dispatch(badgeL_increment(response.data.length))
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const getBadgeFriend = function(){
    var config = {
      method: 'post',
      url: BACKEND_URL + 'friend_list/received_request_list',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      }
    };

    axios(config)
      .then(function (response) {
        dispatch(badgeF_increment(response.data.length))
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const getBadgeProfile = function(){
    var config = {
      method: 'post',
      url: BACKEND_URL + 'notifications/get_notifications',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      }
    };

    axios(config)
    .then(async function(response) {
      var notifLastTimeString = await AsyncStorage.getItem('Notifs')

      if (notifLastTimeString === null){
        console.log('not found setting for the first time')
        await AsyncStorage.setItem('Notifs', JSON.stringify(0))
        dispatch(badgeP_increment(response.data.length))
      } else {
        var notifLastTime = parseInt(notifLastTimeString, 10)
        if (response.data.length <= notifLastTime){
          dispatch(badgeP_increment(0))
        }
        else {
          dispatch(badgeP_increment(response.data.length - notifLastTime))
        }
      }
    })
    .catch(function(error){
      console.log(error)
    });
  }

  const dispatch = useDispatch()

  const badgeChallenge = useSelector(state=>state.badgeC_reducer.badgeC)
  const badgeLeague = useSelector(state=>state.badgeL_reducer.badgeL)
  const badgeFriends = useSelector(state=>state.badgeF_reducer.badgeF)
  const badgeProfile = useSelector(state=>state.badgeP_reducer.badgeP)

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Received a message')
      console.log('in use effect on notif receive to get badges')
      getBadgeChallenge()
      getBadgeLeague()
      getBadgeFriend()
      getBadgeProfile()
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    messaging().onNotificationOpenedApp(async remoteMessage => {
      console.log('Opened this when app was in background to get badges')
      getBadgeChallenge()
      getBadgeLeague()
      getBadgeFriend()
      getBadgeProfile()
    })
  })

  const handleAppRefresh = function(){
    getBadgeChallenge()
    getBadgeLeague()
    getBadgeFriend()
    getBadgeProfile()
  }

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppRefresh)
    return () => {
      subscription.remove()
    }
  }, [])

  const [loadBadge, setLoadBadge] = useState(false)

  useEffect(() => {
    if (!loadBadge) {
        setLoadBadge(true);
        console.log('in use effect to get badges')
        getBadgeChallenge()
        getBadgeLeague()
        getBadgeFriend()
        getBadgeProfile()
      }
    }, [loadBadge]
  );

  return (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon:({focused, color, size}) => {
        let iconName = 'https://imgur.com/a/5IVD5Ew';
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
    <Tab.Screen name="Challenges" component={ChallengesStack} options={{ tabBarAccessibilityLabel : 'Challenges Nav', headerShown: false, tabBarBadge : badgeChallenge > 0 ? (badgeChallenge < 99 ? badgeChallenge : '99+') : undefined, tabBarBadgeStyle: { backgroundColor: '#014421' }}}/>
    <Tab.Screen name="Leagues" component={LeaguesStack} options={{ tabBarAccessibilityLabel : 'Leagues Nav' , headerShown: false, tabBarBadge : badgeLeague > 0 ? (badgeLeague < 99 ? badgeLeague : '99+') : undefined , tabBarBadgeStyle: { backgroundColor: '#014421' }}}/>
    <Tab.Screen name="Add" component={AddStack} options={{tabBarAccessibilityLabel : 'Add Nav', headerShown: false}}/>
    <Tab.Screen name="Friends" component={SearchStack} options={{tabBarAccessibilityLabel : 'Friends Nav', headerShown: false, tabBarBadge : badgeFriends > 0 ? (badgeFriends < 99 ? badgeFriends : '99+') : undefined , tabBarBadgeStyle: { backgroundColor: '#014421' }}}/>
    <Tab.Screen name="Profile" component={ProfileStack} options={{tabBarAccessibilityLabel : 'Profile Nav', headerShown: false, tabBarBadge : badgeProfile > 0 ? (badgeProfile < 99 ? badgeProfile : '99+') : undefined , tabBarBadgeStyle: { backgroundColor: '#014421' }}}/>
  </Tab.Navigator>
  )
}

function Navigator(){
  return (
		<NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "Login" component = {Login} options={{ headerShown: false, animation : 'fade'}}/>
        <Stack.Screen name = "Signup" component={Signup} options={{ headerShown: false }}/>
        <Stack.Screen name = "Challenge" component={ShowTabs} options={{ headerShown: false, gestureEnabled : false,  animationTypeForReplace: 'push',
                                                                              animation:'slide_from_bottom', animationDuration : 375}}/>
        <Stack.Screen name = "CameraView" component={CameraView} options={{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator
