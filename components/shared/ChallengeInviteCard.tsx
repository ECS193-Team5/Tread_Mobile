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

// Get image from cloudinary based on page title
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

  const renderRightActions = (progress, dragX, handler) => {
    return (
      <View
        style={{
          margin: 0,
          alignContent: 'center',
          justifyContent: 'center',
          width: 70,
        }}>
        <Button color="red" onPress={handler} title="Delete"></Button>
      </View>
    );
  };

  return(
    <Swipeable
      key = {ChallengeData._id}
      renderRightActions={(progress, dragX) =>
        renderRightActions(progress, dragX, handler)
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

        {/* <AcceptOrDelete
          pageTitle={pageTitle}
          acceptObj = {handleAccept}
          rejectObj = {handleReject}
          deleteObj = {handleDelete}
        /> */}
      </View>
    </Swipeable>
  )
}

export default ChallengeInviteCard