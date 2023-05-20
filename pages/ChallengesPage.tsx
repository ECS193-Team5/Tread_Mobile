import React, { useEffect, useState } from 'react';
import {
  View,
  StatusBar
} from 'react-native';
import { Text } from 'react-native-elements';
import IncomingSwap from '../components/shared/IncomingSwap';
import ChallengesSwap from '../components/Challenges/ChallengeSwap';
import {styles} from "../css/challenges/Style"
import {cardStyles} from "../css/cards/Style"
import ChallengeScroll from '../components/shared/ChallengeScroll';

import axios from 'axios';
import {BACKEND_URL} from '@env';

import ListenerComponentHealthKit from '../components/Sensors/healthKit';
import ListenerComponentHealthConnect from '../components/Sensors/healthConnect';
import ZeroItem from '../components/shared/ZeroItem';
import { useFocusEffect } from '@react-navigation/native';

function ChallengesPage(props): JSX.Element {
  const [update, setUpdate] = useState(true);
  useEffect(() => {
    // Get the deep link used to open the app
    props.navigation.addListener('focus', () => {
      setUpdate(true);
    });
  }, [props.navigation]);

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
        setCount(response.data.length)
      })
      .catch((error) =>
        console.log(error)
      )
  }

  const getIncomingImage = function(){
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
        if (response.data.length > 0){
          setIncomingImage('https://imgur.com/gMqz2UZ.png')
        } else {
          setIncomingImage('https://imgur.com/ULlEPhH.png')
        }
      })
      .catch(function (error) {
        console.log(error)
      })
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
        setCount(response.data.length)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const handleOnPressSwap = function(){
    if (titleName === 'Current') {
      setIsCurrent(false)
      setTitleName("Weekly")

      getGlobalChallengeData()
      getIncomingImage()

      setAvailableCount('')
      setChallengeData()


      setChallengeImage("https://imgur.com/j33n2DQ.png")
    } else {
      setIsCurrent(true)
      setTitleName("Current")

      getChallengeData()
      getIncomingImage()

      setAvailableCount('')
      setChallengeData()

      setChallengeImage("https://imgur.com/2BHAmsN.png")
    }
  }

  // Check for invitations and update icon, but for now
  var IncomingImageUrl = "https://imgur.com/ULlEPhH.png"

  const handleRefresh = function(){
    if (isCurrent === true) {
      getChallengeData()
    } else {
      getGlobalChallengeData()
    }
  }



  const [titleName, setTitleName] = useState('Current')
  const [count, setCount] = useState(0)
  const [ChallengeData, setChallengeData] = useState(getChallengeData)
  const [availableCount, setAvailableCount] = useState('')
  const [isCurrent, setIsCurrent] = useState(true)
  const [challengeImage, setChallengeImage] = useState("https://imgur.com/2BHAmsN.png")
  const [IncomingImage, setIncomingImage] = useState(getIncomingImage)

  useFocusEffect(
    React.useCallback(() => {
      if (isCurrent === true) {
        getChallengeData()
      } else {
        getGlobalChallengeData()
      }
      getIncomingImage()
    }, [isCurrent])
  );
  return (
    <View style = {styles.container}>
      <StatusBar
        barStyle="dark-content"
      />
      <ListenerComponentHealthConnect update={update} setUpdate = {setUpdate}/>
      <ListenerComponentHealthKit update = {update} setUpdate = {setUpdate}/>
      <View style = {styles.topRightClickContainer}>
        <IncomingSwap
          props = {props}
          PageToSwap = {"Incoming Challenges"}
          imageUrl = {IncomingImage}/>
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
        {count > 0 ?
          <ChallengeScroll
            ChallengeData={ChallengeData}
            isCurrent = {isCurrent}
            onRefresh = {handleRefresh}
          />
        :
        <ZeroItem
          promptText='You have no accepted Challenges'
          navigateToText='Make one here'
          navigateToPage="AddChallenge"
          defaultView={true}
          fromLeague = {false}
          props = {props}
        />
        }
      </View>

    </View>
  )
}

export default ChallengesPage;
