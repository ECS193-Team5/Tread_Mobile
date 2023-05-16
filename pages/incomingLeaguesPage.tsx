import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  UIManager,
  LayoutAnimation,
  FlatList,
  RefreshControl
} from 'react-native';

import {styles} from "../css/challenges/Style"
import IncomingSwap from '../components/shared/IncomingSwap';
import SwitchSelector from "react-native-switch-selector"
import LeagueInviteCard from '../components/shared/LeagueInviteCard';
import axios from 'axios';
import {BACKEND_URL} from '@env';

const options = [
  { label : "Received" , value : 'Received'},
  { label : "Sent", value : 'Sent'},
]

function IncomingLeaguesPage(props): JSX.Element {
  function getReceived() { 
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
        setLeagueData(response.data)
      })
      .catch((error) =>
        console.log(error)
      )
  }

  function getSent() { 
    var config = {
      method: 'post',
      url: BACKEND_URL + 'league/get_requested_leagues',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      }
    };
  
    axios(config)
      .then(function (response) {
        setLeagueData(response.data)
      })
      .catch((error) =>
        console.log(error)
      )
  }

  const [LeagueData, setLeagueData] = useState(getReceived)
  const [pageTitle, setPageTitle] = useState('Sent')
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = function(){
    if(pageTitle === 'Received'){
      getReceived()
    } else {
      getSent()
    }
  }

  const Refresh = function() {
    setRefreshing(true);
    setTimeout(() => {
      handleRefresh()
      setRefreshing(false);
      }, 450);
  }


  var imageUrl = "https://imgur.com/nFRNXOB.png"  
  
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
    setLeagueData()
    if(selectedItem === 'Received'){
      getReceived()
    } else {
      getSent()
    }
  }
  
  const deleteItem = function(lData) {    
    console.log(lData._id)
    console.log("deleted")
    const filteredData = LeagueData.filter(item => item._id !== lData._id);
    setLeagueData(filteredData)
    LayoutAnimation.configureNext(layoutAnimConfig) 
  }

  const renderInvite = ({item, index}) => {
    return (
    <LeagueInviteCard
      LeagueData= {item}
      index = {index}
      handler = {deleteItem}
      pageTitle = {pageTitle}
      />
    )
  }

  return (
    <View style = {styles.container}>
      <View style = {styles.topRightClickContainer}>
        <IncomingSwap
          props = {props}
          PageToSwap = {"Leagues"}
          imageUrl = {imageUrl}/>
      </View>
      <View style = {styles.titleContainer}>
        <Text style = {styles.TitleText}>{pageTitle} Invitations</Text>
      </View>
      <View style = {styles.filterContainer}>
      <SwitchSelector
          initial= {1}
          onPress = {value => handleDropDown(value)}
          textColor = {'#014421'}
          selectedColor = {'#F9A800'}
          buttonColor = {'#014421'}
          hasPadding
          options = {options}
        />
      </View>
      <View style = {styles.ChallengesContainer}>
        <FlatList
          data = {LeagueData}
          renderItem = {renderInvite}
          refreshControl ={
            <RefreshControl 
              refreshing = {refreshing} 
              onRefresh = {Refresh} 
              colors = {['#014421']}
              tintColor = {'#014421'}
              progressViewOffset = {-10}
            />
          }
        />
      </View>
    </View>
  )
}

export default IncomingLeaguesPage;