import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  UIManager,
  LayoutAnimation,
  FlatList,
  RefreshControl,
  AppState
} from 'react-native';

import {styles} from "../css/challenges/Style"
import IncomingSwap from '../components/shared/IncomingSwap';
import SwitchSelector from "react-native-switch-selector"
import messaging from "@react-native-firebase/messaging";
import axios from 'axios';
import {BACKEND_URL} from '@env';
import ZeroItem from '../components/shared/ZeroItem';
import LeagueInviteScroll from '../components/shared/LeagueInviteScroll';
import { useFocusEffect } from '@react-navigation/native';

import { useDispatch } from 'react-redux';
import {badgeL_increment,badgeL_decrement} from '../redux/actions/badgeL_actions'

const options = [
  { label : "Received" , value : 'Received'},
  { label : "Sent", value : 'Sent'},
]

function IncomingLeaguesPage(props): JSX.Element {
  const [reRender, setRender] = useState(true)

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      handleRefresh()
      setRender(!reRender)
      console.log('make list rerender')
    });

    return unsubscribe;
  }, []);

  const dispatch = useDispatch()

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
        dispatch(badgeL_increment(response.data.length))
        setCount(response.data.length)
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
        setCount(response.data.length)
      })
      .catch((error) =>
        console.log(error)
      )
  }

  const [LeagueData, setLeagueData] = useState(getReceived)
  const [count, setCount] = useState(0)
  const [pageTitle, setPageTitle] = useState('Received')

  useFocusEffect(
    React.useCallback(() => {
      if(pageTitle === 'Received'){
        getReceived()
      } else {
        getSent()
      }
    }, [pageTitle])
  );

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleRefresh)
    return () => {
      subscription.remove()
    }
  }, [])

  const handleRefresh = function(){
    if(pageTitle === 'Received'){
      getReceived()
    } else {
      getSent()
    }
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

  const deleteItem = function(lData, isReceived) {
    console.log(lData._id)
    console.log("deleted")
    const filteredData = LeagueData.filter(item => item._id !== lData._id);
    setLeagueData(filteredData)
    filteredData.length === 0 ? setCount(0) : null
    console.log(isReceived)
    if(isReceived){
      dispatch(badgeL_decrement())
    }
    LayoutAnimation.configureNext(layoutAnimConfig)
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
        <LeagueInviteScroll
          LeagueData={LeagueData}
          handler={deleteItem}
          onRefresh={handleRefresh}
          pageTitle={pageTitle}
          reRender = {reRender}
        />
        :
          <ZeroItem
            promptText={'You have not ' + (pageTitle === 'Received' ? 'received any' : 'sent any') + ' league invites'}
            navigateToText={pageTitle === 'Received' ? "" :  'Send one here'}
            navigateToPage={'AddLeague'}
            props = {props}
            defaultView = {false}
            SecondaryPrompt=""
          />
        }
      </View>
    </View>
  )
}

export default IncomingLeaguesPage;