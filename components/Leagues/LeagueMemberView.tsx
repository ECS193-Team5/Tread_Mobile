import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  UIManager,
  Platform,
  LayoutAnimation,
  RefreshControl,
} from 'react-native';

import SwitchSelector from "react-native-switch-selector"

import axios from 'axios';
import {BACKEND_URL} from '@env';

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

function LeagueMemberView({MemberData, setLeagueMembers, props, onRefresh}): JSX.Element {  
  const getLeagueRole = function(){
    var config = {
      method: 'post',
      url: BACKEND_URL + 'league/get_role',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
      data : {
        leagueID : props.route.params.leagueData._id
      }
    };
  
    axios(config)
      .then(function (response) {
        setIsAdminOwnerParticipant(response.data)
      })
      .catch((error) =>
        console.log(error)
      )
  }

  const updateRequests = function(route){
    var config = {
      method: 'post',
      url: BACKEND_URL + route,
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
      data : {
        leagueID : props.route.params.leagueData._id
      }
    };
  
    axios(config)
      .then(function (response) {
        setRequests(response.data)
      })
      .catch((error) =>
        console.log(error)
      )
  }
  
  useEffect(() =>{
    getLeagueRole()
  })

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
    var route = ''
    if(selectedItem === 'pending'){
      route = 'league/get_pending_request_list'
    } else if(selectedItem === 'sent'){
      route = 'league/get_sent_invite_list'
    } else if(selectedItem === 'banned'){
      route = 'league/get_banned_list'
    }
    setRequests([])
    updateRequests(route)
  }

  function handleRefresh() {
    var route = ''
    if(currentView === 'pending'){
      route = 'league/get_pending_request_list'
    } else if(currentView === 'sent'){
      route = 'league/get_sent_invite_list'
    } else if(currentView === 'banned'){
      route = 'league/get_banned_list'
    }
    updateRequests(route)
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

  const [isAdminOwnerParticipant, setIsAdminOwnerParticipant] = useState("")
  const [currentView, setCurrentView] = useState("all")
  const [requests, setRequests] = useState(getRequests);
  const [refreshing, setRefreshing] = useState(false)

  const Refresh = function() {
    setRefreshing(true);
    setTimeout(() => {
      handleRefresh()
      setRefreshing(false);
      }, 3000);
  }

  var config = {
    method: 'post',
    url: BACKEND_URL + 'league/invite_to_join',
    withCredentials: true,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
    },
    data : {
      leagueID : props.route.params.leagueData._id,
      recipient : ''
    }
  };

  const typeOfView = function() {
    if (currentView === 'all') {
      return (<UserScroll
        UserData={MemberData}
        handler = {deleteMember}
        UserRole = {isAdminOwnerParticipant}
        props = {props}
        onRefresh = {onRefresh}
      />)
    } else if (currentView !== 'invite'){
      return (
        <FlatList
          data = {requests}
          renderItem = {renderInvite}
          refreshControl ={
            <RefreshControl 
              refreshing = {refreshing} 
              onRefresh = {Refresh} 
              colors = {'#014421'} 
              tintColor = {'#014421'}
              progressViewOffset = {-10}
            />
          }
        />
      )
    } else {
      return (
        <Invite
          text = 'Invite to League'
          config={config}
          props = {props}
          pagetoNav = 'League Details'
        />
      )
    }
  }



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


