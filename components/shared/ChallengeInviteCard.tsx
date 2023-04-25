import React, { useState } from 'react';
import {
	Pressable,
  Image,
  View,
  Text,
  StatusBar,
  StyleSheet,
  Dimensions,
  Animated,
  Button
} from 'react-native';

import {cardStyles} from "../../css/cards/Style"
import {styles} from "../../css/challenges/Style"
import { ImageStyles } from '../../css/imageCluster/Style';
import AcceptOrDelete from './AcceptOrDelete';

import {Swipeable, TouchableOpacity} from 'react-native-gesture-handler';

// Get image from cloudinary based on page title (receiver(sent) or sender(for received))
const image = 'https://media.licdn.com/dms/image/D5635AQFifIBR-OhDmw/profile-framedphoto-shrink_200_200/0/1629526954865?e=1682553600&v=beta&t=1m93JYRscH1wDz8rW3_cuF2IsOGuwn3BREKHdr-K1bM'

function ChallengeInviteCard({ChallengeData, index, handler, pageTitle}): JSX.Element {
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
    if (pageTitle === 'Sent'){
      console.log('unsent outgoing request')
      // backend call here 
    } else {
      console.log('rejected incoming request')
      // backend call here
    }
    handler(ChallengeData)
  }

  const AcceptInvite = function(){
    console.log('accepted incoming request')
    //backend call here
    handler(ChallengeData)
  }
  
  const renderRightActions = (progress, dragX, handler) => {
    return (
      <View
        style={{
          margin: 0,
          alignContent: 'center',
          justifyContent: 'center',
          width: 70,
        }}>
        <Button color="red" onPress={RejectInvite} title="Delete"></Button>
      </View>
    );
  };

  const renderLeftActions = (progress, dragX, handler) => {
    if (pageTitle === 'Sent'){
      return ('')
    } else {
      return (
        <View
          style={{
            margin: 0,
            alignContent: 'center',
            justifyContent: 'center',
            width: 70,
          }}>
          <Button color="green" onPress={AcceptInvite} title="Accept"></Button>
        </View>
      );
    }
  };

  return(
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
      rightOpenValue={-100} 
      childrenContainerStyle = {styles.FlatListContainer}>
      <View style= {[cardStyles.ChallengeCardContainer, cardStyles.shadowProp]}>
        <View style = {cardStyles.ImageContainer}>
          <Image style ={ImageStyles.first} source={{uri: image}}/>
        </View>

        <View style = {cardStyles.seperator}/>

        <View style = {cardStyles.ChallengeCardTextContainer}>
          <View style = {cardStyles.InboxChallengeTextContainer}>
            <Text style = {cardStyles.ChallengeNameText}>
              {ChallengeData.exercise.exerciseName + " " + ChallengeData.exercise.amount + " " + ChallengeData.exercise.unit}
            </Text>
            <Text style = {cardStyles.ChallengeNameText}>
              {"- " + ChallengeData.sentUser}
            </Text>
          </View>
        </View>


      </View>
    </Swipeable>
  )
}

export default ChallengeInviteCard


{/* <AcceptOrDelete
  pageTitle={pageTitle}
  acceptObj = {handleAccept}
  rejectObj = {handleReject}
  deleteObj = {handleDelete}
/> */}