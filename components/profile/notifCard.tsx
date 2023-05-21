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

import { SharedStyles } from '../../css/shared/Style';

import {GestureHandlerRootView, Swipeable, TouchableOpacity} from 'react-native-gesture-handler';

import axios from 'axios';
import {BACKEND_URL} from '@env';

function NotifCard({item, index, handler}): JSX.Element {

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
    var config = {
      method: 'post',
      url: BACKEND_URL + 'notifications/delete_notification',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
      data : {
        notificationID : item._id
      }
    };

    axios(config)
      .then(function (response) {
        console.log('deleted')
        handler(item)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  
  const renderRightActions = (progress, dragX, handler) => {
    return (
      <View style={SharedStyles.RightSliderContainer}>
        <Pressable
          onPress={RejectInvite}
        >
          <Image style ={ImageStyles.AcceptOrDecline} source={{uri: 'https://imgur.com/Tt2kctJ.png'}}/>
        </Pressable>   
      </View>
    );
  };

  const getDate = function(){
    var today = new Date()
    var notifDate = new Date(item.date)
    var timePeriod = today-notifDate

    timePeriod = timePeriod / 1000
    
    var d = Math.floor(timePeriod / (3600*24))
    var h = Math.floor(timePeriod % (3600*24) / 3600)
    var m = Math.floor(timePeriod % 3600 / 60)
    var s = Math.floor(timePeriod % 60)

    if (d > 0) {
      return d + 'd'
    } else if (h > 0){
      return h + 'h'
    } else if (m > 0) {
      return m + 'm'
    } else {
      return s +'s'
    }
  }
  return(
    <GestureHandlerRootView>
      <Swipeable
        key = {item._id}
        renderRightActions={(progress, dragX) =>
          renderRightActions(progress, dragX, handler)
        }
        onSwipeableOpen={() => closeRow(index)}
        ref={(ref) => (row[index] = ref)}
        friction = {1.5}
        leftThreshold = {30}
        rightThreshold = {30}
        childrenContainerStyle = {styles.FlatListContainer}>
        <View style= {[cardStyles.ChallengeCardContainer, cardStyles.shadowProp, {flexDirection : 'row', width : '91%' , marginBottom : '3%', borderColor : '#014421', borderWidth : 1}]}>
          <View style = {[cardStyles.ChallengeNameContainer, {marginLeft : '2%'}]}>
            <Text style = {cardStyles.ChallengeNameText}>
              {item.message}
            </Text>
  
          </View>
          <View style = {[cardStyles.ChallengeNameContainer, {flex : 8, justifyContent : 'center'}]}>
            <Text style = {[cardStyles.ChallengeNameText, {color : 'grey'}]}>
              {getDate()}
            </Text>
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  )
}

export default NotifCard