import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  StatusBar, Image, AppState
} from 'react-native';
import { Text } from 'react-native-elements';
import IncomingSwap from '../components/shared/IncomingSwap';
import ChallengesSwap from '../components/Challenges/ChallengeSwap';
import {styles} from "../css/challenges/Style"
import {cardStyles} from "../css/cards/Style"
import ChallengeScroll from '../components/shared/ChallengeScroll';

import axios from 'axios';
import {BACKEND_URL} from '@env';
import messaging from "@react-native-firebase/messaging";
import ListenerHealthSensor from '../components/Sensors/ListenerHealthSensor';
import ZeroItem from '../components/shared/ZeroItem';
import { useFocusEffect } from '@react-navigation/native';

function ChallengesPage(props): JSX.Element {
  const [update, setUpdate] = useState(true);
  const [titleName, setTitleName] = useState('Current')
  const [count, setCount] = useState(0)
  const [ChallengeData, setChallengeData] = useState([])
  const [globalChallengeData, setGlobalChallengeData] = useState([])
  const [availableCount, setAvailableCount] = useState('')
  const [isCurrent, setIsCurrent] = useState(true)
  const [challengeImage, setChallengeImage] = useState("https://imgur.com/2BHAmsN.png")
  const [IncomingImage, setIncomingImage] = useState(getIncomingImage)

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      setUpdate(true);
    });
  }, []);
  const [reRender, setRender] = useState(true)

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      handleRefresh()
      setRender(!reRender)
      console.log('make list rerender')
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if(isCurrent){
      setTitleName("Current")
      getChallengeData()
      setChallengeImage("https://imgur.com/2BHAmsN.png")
    }
    else{
      setTitleName("Weekly")
      getGlobalChallengeData()
      setChallengeImage("https://imgur.com/j33n2DQ.png")
    }
    getIncomingImage()
  }, [isCurrent]);

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
        setGlobalChallengeData(response.data)
        setCount(response.data.length)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  function getIncomingImage (){
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

  const handleOnPressSwap = function(){
    if (titleName === 'Current') {
      setIsCurrent(false)
    } else {
      setIsCurrent(true)
    }
  }

  const handleRefresh = function(){
    if (isCurrent === true) {
      getChallengeData()
    } else {
      getGlobalChallengeData()
    }
    getIncomingImage()
  }



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

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleRefresh)
    return () => {
      subscription.remove()
    }
  }, [])

  return (
    <View style = {styles.container}>
      <StatusBar
        barStyle="dark-content"
      />
      <ListenerHealthSensor type="Challenges" update={update} setUpdate = {setUpdate} refreshPage = {handleRefresh}/>
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
        {count <= 0 ?
        <ZeroItem
          promptText='You have no accepted Challenges'
          navigateToText='Make one here'
          navigateToPage="AddChallenge"
          SecondaryPrompt=""
          defaultView={true}
          fromLeague = {false}
          props = {props}
        /> :<></>}
        { (isCurrent && count > 0) ?
          <ChallengeScroll
          ChallengeData={ChallengeData}
          isCurrent = {true}
          onRefresh = {handleRefresh}
          reRender = {reRender}
        />
        :
        <ChallengeScroll
          ChallengeData={globalChallengeData}
          isCurrent = {false}
          onRefresh = {handleRefresh}
          reRender = {reRender}
        />
        }

      </View>

    </View>
  )
}

export default ChallengesPage;
