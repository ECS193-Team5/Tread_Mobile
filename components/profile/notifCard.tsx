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
        <View style= {[cardStyles.ChallengeCardContainer, cardStyles.shadowProp, {width : '91%' , marginBottom : '3%', borderColor : '#014421', borderWidth : 1}]}>
          <View style = {[cardStyles.ChallengeNameContainer, {marginLeft : '2%'}]}>
            <Text style = {cardStyles.ChallengeNameText}>
              {item.message}
            </Text>
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  )
}

export default NotifCard