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

const options = [
  { label : "Received" , value : 'Received'},
  { label : "Sent", value : 'Sent'},
]

const getRequests = function() {
  // backend call here
  return (
    [
      {
          "_id": "6406c89e17ed18fca1d6e4f7",
          "username": "User#6822",
          "displayName": "Rebekah Grace"
      },
      {
          "_id": "643782002acc6cd471d2f3f3",
          "username": "NewUser#2224",
          "displayName": "NewUser"
      },
      {
          "_id": "64448e820e7644e8ced214fb",
          "username": "PrabTheCrab#6525",
          "displayName": "Prabhdeep"
      },
      {
          "_id": "645043cebc6f0328a786d994",
          "username": "Username#2929",
          "displayName": "DisplayName"
      }
    ]
  )
}


function IncomingFriendsPage(props): JSX.Element {
  var NavImageUrl = "https://imgur.com/nFRNXOB.png"  
  const [RequestData, setRequests] = useState(getRequests)
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
  

  const getdropdownIcon = function(){
    return (
    <Image style = {{width : 10, height : 10}}source={{uri: "https://imgur.com/ybSDJeh.png"}}/>
    )
  }

  const handleDropDown = function(selectedItem){
    console.log(selectedItem)
    setPageTitle(selectedItem)
    // set challenges array here
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
        />
      </View>

    </View>
  )
}

export default IncomingFriendsPage;
