import React, { useEffect, useState } from 'react';
import {
	Pressable,
  Image,
  View,
  Text,
} from 'react-native';

import {cardStyles} from "../../css/cards/Style"
import {styles} from "../../css/challenges/Style"
import { ImageStyles } from '../../css/imageCluster/Style';
import {showMessage} from 'react-native-flash-message'

import { SharedStyles } from '../../css/shared/Style';

import {GestureHandlerRootView, Swipeable, TouchableOpacity} from 'react-native-gesture-handler';

import axios from 'axios';
import {BACKEND_URL} from '@env';

function ChallengeInviteCard({ChallengeData, index, handler, pageTitle, image}): JSX.Element {
  const [SenderOrReceiver , setSenderOrReceiver] = useState("From")

  useEffect(() => {
    if (pageTitle === 'Sent'){
      setSenderOrReceiver("To")
    } else {
      setSenderOrReceiver("From")
    }
  })

  let row: Array<any> = [];
  let prevOpenedRow;

  const closeRow = (index) => {
    console.log('closerow', index);
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  };

  const RejectInvite = function(){
    var route = pageTitle === 'Sent' ? 'challenges/delete_friend_challenge' : 'challenges/decline_friend_challenge'
    var config = {
      method: 'post',
      url: BACKEND_URL + route,
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
      data : {
        challengeID : ChallengeData._id
      }
    };
    
    if (pageTitle === 'Sent'){
      console.log('unsent outgoing request')
      axios(config)
        .then(function (response) {
          console.log(ChallengeData.exercise.exerciseName + ' unsent')
          showMessage({
            floating : true,
            message : 'Unsent challenge',
            backgroundColor : '#014421',
            color : '#F9A800',
          })
          handler(ChallengeData, false)
        })
        .catch(function (error) {
          console.log(error)
          showMessage({
            floating : true,
            message : 'Error unsending challenge',
            type : 'danger',
          })
        })
    } else {
      console.log('rejected incoming request')    
      axios(config)
        .then(function (response) {
          console.log(ChallengeData.exercise.exerciseName + ' rejected')
          showMessage({
            floating : true,
            message : 'Rejected incoming challenge',
            backgroundColor : '#014421',
            color : '#F9A800',
          })
          handler(ChallengeData, true)
        })
        .catch(function (error) {
          console.log(error)
          showMessage({
            floating : true,
            message : 'Error rejecting challenge',
            type : 'danger',
          })
        })
    }
  }

  const AcceptInvite = function(){
    console.log('accepted incoming request')
    var config = {
      method: 'post',
      url: BACKEND_URL + 'challenges/accept_friend_challenge',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
      data : {
        challengeID : ChallengeData._id
      }
    };
    axios(config)
    .then(function (response) {
      console.log(ChallengeData.exercise.exerciseName + ' accepted')
      showMessage({
        floating : true,
        message : 'Accepted incoming challenge',
        backgroundColor : '#014421',
        color : '#F9A800',
      })
      handler(ChallengeData, true)
    })
    .catch(function (error) {
      console.log(error)
      showMessage({
        floating : true,
        message : 'Error accepting challenge',
        type : 'danger',
      })
    })
  }
  
  const renderRightActions = (progress, dragX, handler) => {
    return (
      <View style={SharedStyles.RightSliderContainer}>
        <Pressable
          onPress={RejectInvite}
          testID = "reject invite"
        >
          <Image style ={ImageStyles.AcceptOrDecline} source={{uri: 'https://imgur.com/Tt2kctJ.png'}}/>
        </Pressable>   
      </View>
    );
  };

  const renderLeftActions = (progress, dragX, handler) => {
    if (pageTitle === 'Sent'){
      return ('')
    } else {
      return (
        <View style={SharedStyles.LeftSliderContainer}>
          <Pressable
            onPress={AcceptInvite}
            testID = "accept invite"
          >
            <Image style ={ImageStyles.AcceptOrDecline} source={{uri: 'https://imgur.com/PMJ1WhF.png'}}/>
          </Pressable>   
        </View>
      );
    }
  };

  return(
    <GestureHandlerRootView>
      <Swipeable
        key = {ChallengeData._id}
        renderRightActions={(progress, dragX) =>
          renderRightActions(progress, dragX, handler)
        }
        renderLeftActions={(progress, dragX) =>
          renderLeftActions(progress, dragX, handler)
        }
        onSwipeableOpen={() => closeRow(index)}
        ref={(ref) => (row[index] = ref)}
        friction = {1.5}
        leftThreshold = {30}
        rightThreshold = {30}
        childrenContainerStyle = {styles.FlatListContainer}>
        <View style= {[cardStyles.ChallengeCardContainer, cardStyles.shadowProp]}>
          <View style = {cardStyles.ImageContainer}>
            <Image style ={ImageStyles.single} source={{uri: image}}/>
          </View>

          <View style = {cardStyles.seperator}/>

          <View style = {cardStyles.ChallengeCardTextContainer}>
            <View style = {cardStyles.ChallengeNameContainer}>
              <Text style = {cardStyles.ChallengeNameText}>
                {ChallengeData.exercise.exerciseName + " " + ChallengeData.exercise.amount + " " + ChallengeData.exercise.unit}
              </Text>
            </View>
            <View style = {cardStyles.ChallengeNameContainer}>
              <Text style = {cardStyles.ChallengeNameText}>
                  {SenderOrReceiver + " : "}
              </Text>
              <Text style = {cardStyles.ChallengeNameText}>
                  {pageTitle === 'Received' ? ChallengeData.sentUser : ChallengeData.receivedUser}
              </Text>
            </View>
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  )
}

export default ChallengeInviteCard