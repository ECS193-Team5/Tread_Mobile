import React, { useState } from 'react';
import {
	Pressable,
  Image,
  View,
  Text,
  StatusBar,
  StyleSheet,
  Dimensions
} from 'react-native';

import {cardStyles} from "../../css/cards/Style"
import { ImageStyles } from '../../css/imageCluster/Style';
import AcceptOrDelete from './AcceptOrDelete';

// Get image from cloudinary based on page title
const image = 'https://media.licdn.com/dms/image/D5635AQFifIBR-OhDmw/profile-framedphoto-shrink_200_200/0/1629526954865?e=1682553600&v=beta&t=1m93JYRscH1wDz8rW3_cuF2IsOGuwn3BREKHdr-K1bM'

function ChallengeInviteCard({ChallengeData, pageTitle}): JSX.Element {
  const handleAccept = function(){
    console.log("pressed accept")
  }

  const handleReject = function(){
    console.log("pressed reject")
  }

  const handleDelete = function(){
    console.log("pressed delete")
  }
  
  return(
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

      <AcceptOrDelete
        pageTitle={pageTitle}
        acceptObj = {handleAccept}
        rejectObj = {handleReject}
        deleteObj = {handleDelete}
      />
    </View>
  )
}

export default ChallengeInviteCard

