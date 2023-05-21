import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  LayoutAnimation,
  Platform,
  UIManager,
  RefreshControl
} from 'react-native';

import axios from 'axios';
import {BACKEND_URL} from '@env';

import {styles} from "../css/challenges/Style"


import SwitchSelector from "react-native-switch-selector"
import IncomingSwap from '../components/shared/IncomingSwap';
import ChallengeInviteCard from '../components/shared/ChallengeInviteCard';
import { createProfilePictureURL } from '../components/Helpers/CloudinaryURLHelper';
import ZeroItem from '../components/shared/ZeroItem';
import { useFocusEffect } from '@react-navigation/native';

import { useSelector, useDispatch } from 'react-redux';
import {badgeC_decrement} from '../redux/actions/badgeC_actions'

const options = [
  { label : "Received" , value : 'Received'},
  { label : "Sent", value : 'Sent'},
]

function IncomingChallengesPage(props): JSX.Element {

  const dispatch = useDispatch()

  const getReceivedChallenges = function(){
    var config = {
      method: 'post',
      url: BACKEND_URL + 'challenges/received_challenges',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      }
    };
  
    axios(config)
      .then(function (response) {
        setChallengeData(response.data)
        setCount(response.data.length)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const getSentChallenges = function(){
    var config = {
      method: 'post',
      url: BACKEND_URL + 'challenges/sent_challenges',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      }
    };
  
    axios(config)
      .then(function (response) {
        setChallengeData(response.data)
        setCount(response.data.length)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  
  
  var NavImageUrl = "https://imgur.com/nFRNXOB.png"  

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
  
  const [pageTitle, setPageTitle] = useState('Received')
  const [count, setCount] = useState(0)
  const [ChallengeData, setChallengeData] = useState(getReceivedChallenges)
  const [refreshing, setRefreshing] = useState(false)
  
  useFocusEffect(
    React.useCallback(() => {
      if(pageTitle === 'Received'){
        getReceivedChallenges()
      } else {
        getSentChallenges()
      }
    }, [pageTitle])
  );

  const handleDropDown = function(selectedItem){
    console.log(selectedItem)
    setPageTitle(selectedItem)
    setChallengeData()
    if(selectedItem === 'Received'){
      getReceivedChallenges()
    } else {
      getSentChallenges()
    }
  }
  
  const deleteItem = function(cData, isReceived) {    
    console.log(cData._id)
    console.log("deleted")
    const filteredData = ChallengeData.filter(item => item._id !== cData._id);
    setChallengeData(filteredData)
    filteredData.length === 0 ? setCount(0) : null
    if(isReceived){
      dispatch(badgeC_decrement())
    }
    LayoutAnimation.configureNext(layoutAnimConfig) 
  }

  const getImage = function(item) {
    if (pageTitle === 'Received'){
      return createProfilePictureURL(item.sentUser)
    } else {
      return createProfilePictureURL(item.receivedUser)
    }
  }


  const renderInvite = ({item, index}) => {
    return (
    <ChallengeInviteCard
      ChallengeData = {item}
      index = {index}
      handler = {deleteItem}
      pageTitle = {pageTitle}
      image = {getImage(item)}
      />
    )
  }

  const handleRefresh = function(){
    if(pageTitle === 'Received'){
      getReceivedChallenges()
    } else {
      getSentChallenges()
    }
  }

  const Refresh = function() {
    setRefreshing(true);
    setTimeout(() => {
      handleRefresh()
      setRefreshing(false);
      }, 450);
  }

  return (
    <View style = {styles.container}>
      <View style = {styles.topRightClickContainer}>
        <IncomingSwap
          props = {props}
          PageToSwap = {"Challenges"}
          imageUrl = {NavImageUrl}/>
      </View>
      <View style = {styles.titleContainer}>
        <Text style = {styles.TitleText}>{pageTitle} Challenges</Text>
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
          <FlatList
            data = {ChallengeData}
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
          :
          <ZeroItem
            promptText={'You have ' + (pageTitle === 'Received' ? 'no received' : 'not sent any') + ' Challenges'}
            navigateToText={pageTitle === 'Received' ? null :  'Send one here'}
            navigateToPage='AddChallenge'
            defaultView={true}
            fromLeague = {false}
            props = {props}
          />    
        } 
      </View>

    </View>
  )
}

export default IncomingChallengesPage;
