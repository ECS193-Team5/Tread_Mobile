import React, { useState } from 'react';
import {
  View,
  Text,
  Platform,
  UIManager,
  LayoutAnimation
} from 'react-native';

import SwitchSelector from "react-native-switch-selector"
import IncomingSwap from '../components/shared/IncomingSwap';
import {styles} from "../css/challenges/Style"
import UserScroll from '../components/shared/UserScroll';

import axios from 'axios';
import {BACKEND_URL} from '@env';
import ZeroItem from '../components/shared/ZeroItem';
import { useFocusEffect } from '@react-navigation/native';

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
        setCount(response.data.length)
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
        setCount(response.data.length)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  
  const [IncomingImageUrl, setIncomingImage] = useState(getIncomingImage)
  const [FriendData, setFriendData] = useState(getFriends)
  const [friendType, setFriendType] = useState('All Friends')
  const [count, setCount] = useState(0)

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

  useFocusEffect(
    React.useCallback(() => {
      if (friendType === 'All Friends'){
        getFriends()
      }else {
        getBlocked()
      }
      getIncomingImage()
    }, [friendType])
  );

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
    filteredData.length === 0 ? setCount(0) : null
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
        {count > 0 ?
          <UserScroll
            UserData={FriendData}
            handler = {deleteMember}
            UserRole = {friendType}
            onRefresh = {handleRefresh}
          />
          :
          <ZeroItem
            promptText= {'You ' + (friendType === 'All Friends' ? 'don\'t have any friends yet' : 'haven\'t blocked anyone yet')}
            navigateToText= {friendType === 'All Friends' ? 'Make some here!' : null}
            navigateToPage="AddFriend"
            props = {props}
          />    
        }

      </View> 

    </View>
  )
}

export default LeaguesPage;