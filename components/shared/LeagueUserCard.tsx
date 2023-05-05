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

import {Swipeable, TouchableOpacity} from 'react-native-gesture-handler';
import { createProfilePictureURL } from '../Helpers/CloudinaryURLHelper';

function LeagueUserCard({MemberData, index, handler, pageTitle}): JSX.Element {
  const [SenderOrReceiver , setSenderOrReceiver] = useState("From")
  
  const [image, setImage] = useState(createProfilePictureURL(MemberData.username))

  useEffect(() => {
    if (pageTitle === 'sent'){
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
    if (pageTitle === 'sent'){
      console.log('unsent outgoing request league')
      // backend call here 
    } else {
      console.log('rejected incoming request league')
      // backend call here
    }
    handler(MemberData)
  }

  const UnbanUser = function(){
    console.log('unbanned user league')
    // backend call here
    handler(MemberData)
  }

  const AcceptInvite = function(){
    console.log('accepted incoming request league')
    //backend call here
    handler(MemberData)
  }
  
  const renderRightActions = (progress, dragX, handler) => {
    if (pageTitle === 'banned') {
      return (
        <View style={SharedStyles.RightSliderContainer}>
          <Pressable
            onPress={UnbanUser}
          >
            <Image style ={ImageStyles.AcceptOrDecline} source={{uri: 'https://imgur.com/q7fgVdM.png'}}/>
          </Pressable>   
        </View>
      );
    } else {
      return (
        <View style={SharedStyles.RightSliderContainer}>
          <Pressable
            onPress={RejectInvite}
          >
            <Image style ={ImageStyles.AcceptOrDecline} source={{uri: 'https://imgur.com/Tt2kctJ.png'}}/>
          </Pressable>   
        </View>
      );
    }
  };

  const renderLeftActions = (progress, dragX, handler) => {
    if (pageTitle === 'sent' || pageTitle === 'banned'){
      return ('')
    } else {
      return (
        <View style={SharedStyles.LeftSliderContainer}>
          <Pressable
            onPress={AcceptInvite}
          >
            <Image style ={ImageStyles.AcceptOrDecline} source={{uri: 'https://imgur.com/PMJ1WhF.png'}}/>
          </Pressable>   
        </View>
      );
    }
  };

  return(
    <Swipeable
      key = {MemberData.username}
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
          {pageTitle === 'banned' ? 
            null : 
            <View style = {cardStyles.LeagueAddressContainer}>
              <Text style = {cardStyles.ChallengeNameText}>
                {SenderOrReceiver + " : "}
              </Text>
            </View>
          }
          <View style = {cardStyles.ChallengeNameContainer}>
            <Text style = {cardStyles.LeagueNameText}>
            {MemberData.displayName}
            </Text>
            <Text style = {[cardStyles.ChallengeNameText , {color : "#F9A800"}]}>
              {MemberData.username}
            </Text>
          </View>
        </View>
      </View>
    </Swipeable>
  )
}

export default LeagueUserCard