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

function LeagueUserCard({MemberData, index, handler, pageTitle}): JSX.Element {
  const [SenderOrReceiver , setSenderOrReceiver] = useState("From")
  
  // Get image from cloudinary based on page title (receiver(sent) or sender(for received))
  const getImage = function() {
    return 'https://media.licdn.com/dms/image/D5635AQFifIBR-OhDmw/profile-framedphoto-shrink_400_400/0/1629526954865?e=1683777600&v=beta&t=HUgGzkTxHKUGP6_JQupbKEty3qKO-dd8Spm52asCjH8'
  }

  const [image, setImage] = useState(getImage)

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
      console.log('unsent outgoing request')
      // backend call here 
    } else {
      console.log('rejected incoming request')
      // backend call here
    }
    handler(MemberData)
  }

  const UnbanUser = function(){
    console.log('unbanned user')
    // backend call here
    handler(MemberData)
  }

  const AcceptInvite = function(){
    console.log('accepted incoming request')
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