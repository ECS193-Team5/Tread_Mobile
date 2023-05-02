import React, { useEffect, useState } from 'react';
import {
	Pressable,
  Image,
  View,
  Text,
  FlatList,
  UIManager,
  Platform,
  LayoutAnimation,
} from 'react-native';

import SwitchSelector from "react-native-switch-selector"

import {BACKEND_URL} from '@env';


import { SharedStyles } from '../../css/shared/Style';
import {styles} from "../../css/challenges/Style"
import { LeagueStyles } from '../../css/leagues/Style';
import UserScroll from '../shared/UserScroll';
import LeagueUserCard from '../shared/LeagueUserCard';
import Invite from '../shared/invite';

const options = [
  { label : "All" , value : 'all'},
  { label : "Pending", value : 'pending'},
  { label : "Sent", value : 'sent'},
  { label : "Banned", value : 'banned'},
  { label : "Invite" , value : 'invite'}
]

function getRequests() {
  return ([
    {
      "username": "batman#6380",
      "displayName": "Jhao Hua"
    },
    {
      "username": "batman#6381",
      "displayName": "Jhao Hua"
    },  
    {
    "username": "batman#6382",
    "displayName": "Jhao Hua"
    },
    {
      "username": "batman#6383",
      "displayName": "Jhao Hua"
    },
    {
      "username": "batman#6384",
      "displayName": "Jhao Hua"
    },  
    {
    "username": "batman#6385",
    "displayName": "Jhao Hua"
    }
  ])
} 

function LeagueMemberView({MemberData, setLeagueMembers}): JSX.Element {  
  
  const [isAdminOwnerParticipant, setIsAdminOwnerParticipant] = useState("")
  const [currentView, setCurrentView] = useState("all")
  const [requests, setRequests] = useState(getRequests);

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

  function handleDropDown(selectedItem) {
    console.log(selectedItem)
    setCurrentView(selectedItem)
    // set the appropriate member list, all, pending or sent or blocked
  }
  
  const typeOfUser = function(userType) {
    if(userType === 'owner' || userType === 'admin') {
      return (
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
      </View>)
    } else {
      return null
    }
  }
  
  const deleteItem = function(mData) {    
    console.log(mData.username)
    console.log("deleted")
    const filteredData = requests.filter(item => item.username !== mData.username);
    setRequests(filteredData)
    LayoutAnimation.configureNext(layoutAnimConfig) 
  }

  const deleteMember = function(mData) {    
    console.log(mData.username)
    console.log("deleted")
    // when writing the backend call instead of setting the filtered data, set the actual member list to update everything accordingly
    const filteredData = MemberData.filter(item => item.username !== mData.username);
    setLeagueMembers(filteredData)
    LayoutAnimation.configureNext(layoutAnimConfig) 
  }
    
  const renderInvite = ({item, index}) => {
    return (
    <LeagueUserCard
      MemberData= {item}
      index = {index}
      handler = {deleteItem}
      pageTitle = {currentView}
      />
    )
  }

  var config = {
	  method: 'post',
	};

  const typeOfView = function() {
    if (currentView === 'all') {
      return (<UserScroll
        UserData={MemberData}
        handler = {deleteMember}
        UserRole = {isAdminOwnerParticipant}
      />)
    } else if (currentView !== 'invite'){
      return (
        <FlatList
          data = {requests}
          renderItem = {renderInvite}
        />
      )
    } else {
      return (
        <Invite
          text = 'Invite to League'
          config={config}
        />
      )
      // add add friend component here
    }
  }

  useEffect(() =>{
    // get username and check if with MemberData to see if they are owner admin or participant
    // set isAdminOwner
    setIsAdminOwnerParticipant("admin")
  })

  return(
    <View style = {LeagueStyles.MembersChallengesContainer}>
      {typeOfUser(isAdminOwnerParticipant)}
      <View style = {[styles.ChallengesContainer, {marginBottom : "19%"}]}>
        {typeOfView()}
      </View>
    </View>

  )
}

export default LeagueMemberView


