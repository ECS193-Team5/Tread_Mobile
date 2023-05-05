import React, { useState } from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text,
  Image,
  FlatList,
  LayoutAnimation,
  Platform,
  UIManager
} from 'react-native';

import {styles} from "../css/challenges/Style"
import { SharedStyles } from '../css/shared/Style';

import SwitchSelector from "react-native-switch-selector"
import IncomingSwap from '../components/shared/IncomingSwap';
import ChallengeInviteCard from '../components/shared/ChallengeInviteCard';
import UserScroll from '../components/shared/UserScroll';

import axios from 'axios';
import {BACKEND_URL} from '@env';

const options = [
  { label : "Received" , value : 'Received'},
  { label : "Sent", value : 'Sent'},
]

function IncomingFriendsPage(props): JSX.Element {
  const getReceivedRequests = function() {
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
        setRequests(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const getSentRequests = function() {
    var config = {
      method: 'post',
      url: BACKEND_URL + 'friend_list/sent_request_list',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      }
    };
  
    axios(config)
      .then(function (response) {
        setRequests(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  var NavImageUrl = "https://imgur.com/nFRNXOB.png"  
  const [RequestData, setRequests] = useState(getReceivedRequests)
  const [pageTitle, setPageTitle] = useState('Received')

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
    console.log(selectedItem)
    setPageTitle(selectedItem)
    setRequests()
    if (selectedItem === 'Received'){
      getReceivedRequests()
    }else {
      getSentRequests()
    }
  }

  const handleRefresh = function(){
    if (pageTitle === 'Received'){
      getReceivedRequests()
    }else {
      getSentRequests()
    }
  }
  
  const deleteItem = function(rData) {    
    console.log(rData.username)
    console.log("deleted request")
    const filteredData = RequestData.filter(item => item.username !== rData.username);
    setRequests(filteredData)
    LayoutAnimation.configureNext(layoutAnimConfig) 
  }

  return (
    <View style = {styles.container}>
      <View style = {styles.topRightClickContainer}>
        <IncomingSwap
          props = {props}
          PageToSwap = {"Search"}
          imageUrl = {NavImageUrl}/>
      </View>
      <View style = {styles.titleContainer}>
        <Text style = {styles.TitleText}>{pageTitle} Requests</Text>
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
          UserData={RequestData}
          handler = {deleteItem}
          UserRole = {pageTitle}
          onRefresh = {handleRefresh}
        />
      </View>

    </View>
  )
}

export default IncomingFriendsPage;
