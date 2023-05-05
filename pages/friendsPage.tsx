import React, { useState } from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text,
  Image,
  FlatList,
  Platform,
  UIManager,
  LayoutAnimation
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import ChallengesSwap from '../components/Challenges/ChallengeSwap';
import LeagueCard from '../components/Leagues/LeagueCard';

import SwitchSelector from "react-native-switch-selector"
import IncomingSwap from '../components/shared/IncomingSwap';
import {styles} from "../css/challenges/Style"
import UserScroll from '../components/shared/UserScroll';

import axios from 'axios';
import {BACKEND_URL} from '@env';

const options = [
  { label : "All" , value : 'All Friends'},
  { label : "Blocked", value : 'Blocked Users'},
]

function LeaguesPage(props): JSX.Element {
  const getIncomingImage = function(){
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
        if (response.data.length > 0){
          setIncomingImage('https://imgur.com/gMqz2UZ.png')
        } else {
          setIncomingImage('https://imgur.com/ULlEPhH.png')
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  
  
  
  const getFriends = function() {
    var config = {
      method: 'post',
      url: BACKEND_URL + 'friend_list/get_all_friends_info',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      }
    };
  
    axios(config)
      .then(function (response) {
        setFriendData(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const getBlocked = function() {
    var config = {
      method: 'post',
      url: BACKEND_URL + 'friend_list/blocked_list',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      }
    };
  
    axios(config)
      .then(function (response) {
        setFriendData(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  
  // Check for invitations and update icon, but for now
  const [IncomingImageUrl, setIncomingImage] = useState(getIncomingImage)
  const [FriendData, setFriendData] = useState(getFriends)
  const [friendType, setFriendType] = useState('All Friends')

  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  const layoutAnimConfig = {
    duration: 1000,
    update: {
      type: LayoutAnimation.Types.easeInEaseOut, 
    },
    delete: {
      duration: 200,
      type: LayoutAnimation.Types.easeOut,
      property: LayoutAnimation.Properties.opacity,
    },
  };
  
  const handleDropDown = function(selectedItem){
    setFriendType(selectedItem)
    setFriendData()
    if (selectedItem === 'All Friends'){
      getFriends()
    }else {
      getBlocked()
    }
  }

  const handleRefresh = function(){
    if (friendType === 'All Friends'){
      getFriends()
    }else {
      getBlocked()
    }
  }

  const deleteMember = function(fData) {    
    console.log(fData.username) 
    console.log("deleted")
    // when writing the backend call instead of setting the filtered data, set the actual member list to update everything accordingly
    const filteredData = FriendData.filter(item => item.username !== fData.username);
    setFriendData(filteredData)
    LayoutAnimation.configureNext(layoutAnimConfig) 
  }

  return (
    <View style = {styles.container}>
      <View style = {styles.topRightClickContainer}>
        <IncomingSwap
          props = {props}
          PageToSwap = {"Incoming Friends"}
          imageUrl = {IncomingImageUrl}/>
      </View>

      <View style = {styles.titleContainer}>
        <Text style = {styles.TitleText}>{friendType}</Text>
      </View>
      <View style = {styles.filterContainer}>
        <SwitchSelector
          initial= {0}
          onPress = {value => handleDropDown(value)}
          textColor = {'#014421'}
          selectedColor = {'#F9A800'}
          buttonColor = {'#014421'}
          hasPadding
          options = {options}
        />
      </View>
      <View style = {styles.ChallengesContainer}>
        <UserScroll
          UserData={FriendData}
          handler = {deleteMember}
          UserRole = {friendType}
          onRefresh = {handleRefresh}
        />
      </View> 

    </View>
  )
}

export default LeaguesPage;