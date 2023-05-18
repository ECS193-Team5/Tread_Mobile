import React, { useState } from 'react';
import {
	Pressable,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Modal from "react-native-modal"
import {cardStyles} from "../../css/cards/Style"
import ProgressCircle from "progress-circle-react-native"
import ImageCluster from '../shared/ImageCluster';
import ChallengeModalPopUp from './ChallengeModalPopUp';
import GestureRecognizer from 'react-native-swipe-gestures'
import { calculateProgress } from '../Helpers/calculationHelpers';
import { createProfilePictureURL } from '../Helpers/CloudinaryURLHelper';

function ChallengeCard({ChallengeData, isWeekly}): JSX.Element {
	const [modalVisible, setModalVisible] = useState(false)
  var images = []
  var ProgressPercent = 0
  var totalBaseUnits = 0
  if (!isWeekly){
    for (let User of ChallengeData.participants){
      images.push(createProfilePictureURL(User))
    }
    // console.log(images)
    var myProgressBaseUnits = ChallengeData.progress.progress;
    totalBaseUnits = ChallengeData.progress.exercise.convertedAmount;
    var ProgressPercent = Math.min(100,Math.round(myProgressBaseUnits / totalBaseUnits * 100));
  }else {
    images = ['https://imgur.com/W03ovOf.png']
    var myProgressBaseUnits = ChallengeData.progress;
    totalBaseUnits = ChallengeData.exercise.convertedAmount;
    ProgressPercent = Math.min(100, Math.round(myProgressBaseUnits / totalBaseUnits * 100));
  }

  const handleOnPress = function(){
    setModalVisible(!modalVisible)
  }


  return (
    <Pressable 
      onPress={() => setModalVisible(true)}
      style = {[cardStyles.ChallengeCardContainer, cardStyles.shadowProp]}
    >
    <GestureRecognizer
      onSwipeDown={() => setModalVisible(false)}
    >
      <Modal
        isVisible={modalVisible}
        hasBackdrop = {true}
        backdropColor = 'black'
        style = {{margin : 2}}
        onBackdropPress = { () => setModalVisible(false)}
      >
        <ChallengeModalPopUp 
          Challenge = {ChallengeData}
          isWeekly = {isWeekly}
          totalBaseUnits = {totalBaseUnits}
        />
      </Modal>
    </GestureRecognizer>

      <StatusBar
        barStyle="dark-content"
      />
      
      <ImageCluster 
        images = {images}
        isWeekly = {isWeekly}
      />
      
      <View style = {cardStyles.seperator}/>

      <View style = {cardStyles.ChallengeCardTextContainer}>
        <View style = {cardStyles.ChallengeNameContainer}>
          <Text style = {cardStyles.ChallengeNameText}>
            {ChallengeData.exercise.exerciseName + " " + ChallengeData.exercise.amount + " " + ChallengeData.exercise.unit}
          </Text>
        </View>
        <View style = {cardStyles.ChallengeProgressContainer}>
          <ProgressCircle
            percent = {ProgressPercent}
            radius = {35}
            borderWidth = {3}
            color = '#014421'
            shadowColor='#bebebe'
            bgColor='#FFFFFF'
          >
          <Text style = {cardStyles.ChallengeProgressText}>{ProgressPercent + "%"}</Text>
        </ProgressCircle>
        </View>
      </View>
    </Pressable>
	)
}

export default ChallengeCard;