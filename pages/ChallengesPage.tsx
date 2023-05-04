import React, { useEffect, useState } from 'react';
import {
  View,
  Button,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  FlatList,
  StatusBar
} from 'react-native';
import { Text } from 'react-native-elements';
import IncomingSwap from '../components/shared/IncomingSwap';
import ChallengesSwap from '../components/Challenges/ChallengeSwap';
import {styles} from "../css/challenges/Style"
import {cardStyles} from "../css/cards/Style"
import ChallengeCard from '../components/Challenges/ChallengeCard';
import ChallengeScroll from '../components/shared/ChallengeScroll';

import { getAllChallenges } from '../postRequests/ChallengesRequests';

import axios from 'axios';
import {BACKEND_URL} from '@env';

import ListenerComponentHealthKit from '../components/Sensors/healthKit';
import ListenerComponentHealthConnect from '../components/Sensors/healthConnect';

function ChallengesPage(props): JSX.Element {
  const getChallengeData = function(){
    var config = {
      method: 'post',
      url: BACKEND_URL + 'challenges/accepted_challenges',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      }
    };
  
    axios(config)
      .then(function (response) {
        setAvailableCount(response.data.length + ' available')
        setChallengeData(response.data)
      })
      .catch((error) =>
        console.log(error)
      )
  }

  const getGlobalChallengeData = function(){  
    var config = {
      method: 'post',
      url: BACKEND_URL + 'global_challenge/get_challenges',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      }
    };
  
    axios(config)
      .then(function (response) {
        setAvailableCount(response.data.length + ' available')
        setChallengeData(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  
  const [titleName, setTitleName] = useState('Current')
  const [ChallengeData, setChallengeData] = useState(getChallengeData)
  const [availableCount, setAvailableCount] = useState('')
  const [isCurrent, setIsCurrent] = useState(true)
  const [challengeImage, setChallengeImage] = useState("https://imgur.com/2BHAmsN.png")
  
  const handleOnPressSwap = function(){
    if (titleName === 'Current') {
      setIsCurrent(false)
      setTitleName("Weekly")
      getGlobalChallengeData()

      setAvailableCount('')
      setChallengeData()

      setChallengeImage("https://imgur.com/j33n2DQ.png")
    } else {
      setIsCurrent(true)
      setTitleName("Current")
      getChallengeData()

      setAvailableCount('')
      setChallengeData()

      setChallengeImage("https://imgur.com/2BHAmsN.png")
    }
  }

  const handleRefresh = function(){
    if (isCurrent === true) {
      getChallengeData()
    } else {
      getGlobalChallengeData()
    }
  }

  // Check for invitations and update icon, but for now
  var IncomingImageUrl = "https://imgur.com/ULlEPhH.png"
  
  return (
    <View style = {styles.container}>
      <StatusBar
        barStyle="dark-content"
      />
      <ListenerComponentHealthConnect/>
      <ListenerComponentHealthKit/>
      <View style = {styles.topRightClickContainer}>
        <IncomingSwap
          props = {props}
          PageToSwap = {"Incoming Challenges"}
          imageUrl = {IncomingImageUrl}/>
      </View>

      <View style = {styles.titleContainer}>
        <Text style = {styles.TitleText}>Challenges</Text>
      </View>

      <View style = {[styles.tabswitchContainer, cardStyles.shadowProp]}>
        <ChallengesSwap
          onPress = {handleOnPressSwap}
          text = {titleName}
          available = {availableCount}
          imageURL = {challengeImage}
        />
      </View>

      <View style = {styles.seperator}/>

      <View style = {styles.ChallengesContainer}>
        <ChallengeScroll
          ChallengeData={ChallengeData}
          isCurrent = {isCurrent}
          onRefresh = {handleRefresh} 
        />
      </View>

    </View>
  )
}

export default ChallengesPage;
