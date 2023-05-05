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
import { cardStyles } from '../css/cards/Style';
import {styles} from "../css/challenges/Style"
import { SharedStyles } from '../css/shared/Style';
import UserScroll from '../components/shared/UserScroll';

const options = [
  { label : "All" , value : 'All Friends'},
  { label : "Banned", value : 'Banned Friends'},
]

const getFriends = function() {
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


function LeaguesPage(props): JSX.Element {
  // Check for invitations and update icon, but for now
  var IncomingImageUrl = "https://imgur.com/ULlEPhH.png"
  const [FriendData, setFriendData] = useState(getFriends)
  const [friendType, setFriendType] = useState('All Friends')

  const getdropdownIcon = function(){
    return (
    <Image style = {{width : 10, height : 10}}source={{uri: "https://imgur.com/ybSDJeh.png"}}/>
    )
  }

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
    setFriendType(selectedItem)
    // set friends array here
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
        />
      </View> 

    </View>
  )
}

export default LeaguesPage;