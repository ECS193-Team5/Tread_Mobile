import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  LayoutAnimation,
  Platform,
  UIManager,
  AppState
} from 'react-native';

import {styles} from "../css/challenges/Style"

import SwitchSelector from "react-native-switch-selector"
import IncomingSwap from '../components/shared/IncomingSwap';
import UserScroll from '../components/shared/UserScroll';

import axios from 'axios';
import {BACKEND_URL} from '@env';
import ZeroItem from '../components/shared/ZeroItem';
import { useFocusEffect } from '@react-navigation/native';

const options = [
  { label : "Received" , value : 'Received'},
  { label : "Sent", value : 'Sent'},
]

import { useDispatch } from 'react-redux';
import {badgeF_increment, badgeF_decrement} from '../redux/actions/badgeF_actions'
import messaging from "@react-native-firebase/messaging";


function IncomingFriendsPage(props): JSX.Element {
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
        dispatch(badgeF_increment(response.data.length))
        setCount(response.data.length)
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
        console.log(response.data)
        setRequests(response.data)
        setCount(response.data.length)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  var NavImageUrl = "https://imgur.com/nFRNXOB.png"
  const [RequestData, setRequests] = useState(getReceivedRequests)
  const [pageTitle, setPageTitle] = useState('Received')
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
    console.log(selectedItem)
    setPageTitle(selectedItem)
    setRequests()
    if (selectedItem === 'Received'){
      getReceivedRequests()
    }else {
      getSentRequests()
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      if (pageTitle === 'Received'){
        getReceivedRequests()
      }else {
        getSentRequests()
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
    if (pageTitle === 'Received'){
      getReceivedRequests()
    }else {
      getSentRequests()
    }
  }

  const deleteItem = function(rData, isReceived) {
    console.log(rData.username)
    console.log("deleted request")
    const filteredData = RequestData.filter(item => item.username !== rData.username);
    setRequests(filteredData)
    filteredData.length === 0 ? setCount(0) : null
    if(isReceived){
      dispatch(badgeF_decrement())
    }
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
        <Text style = {styles.TitleText}>Requests</Text>
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
            UserData={RequestData}
            handler = {deleteItem}
            UserRole = {pageTitle}
            onRefresh = {handleRefresh}
            reRender = {reRender}
          />
        :
          <ZeroItem
            promptText={'You have ' + (pageTitle === 'Received' ? 'not received any' : 'not sent any') + ' friend requests'}
            navigateToText={pageTitle === 'Received' ? "" :  'Send one here'}
            navigateToPage='AddFriend'
            props = {props}
            SecondaryPrompt=""
          />
        }
      </View>

    </View>
  )
}

export default IncomingFriendsPage;
