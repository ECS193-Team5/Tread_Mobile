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

import Modal from "react-native-modal"
import {cardStyles} from "../../css/cards/Style"
import ProgressCircle from "progress-circle-react-native"
import ImageCluster from '../shared/ImageCluster';
import ChallengeModalPopUp from './ChallengeModalPopUp';
import GestureRecognizer from 'react-native-swipe-gestures'
import { calculateProgress } from '../Helpers/calculationHelpers';
import { createProfilePictureURL } from '../Helpers/CloudinaryURLHelper';

// get challenge leaderboard backend call to get image data 
// pass on that data to modal

// cloudinary image hosting will get these images
// const images = ['https://media.licdn.com/dms/image/D5635AQFifIBR-OhDmw/profile-framedphoto-shrink_400_400/0/1629526954865?e=1683777600&v=beta&t=HUgGzkTxHKUGP6_JQupbKEty3qKO-dd8Spm52asCjH8',
//                 'https://media.licdn.com/dms/image/D5635AQFifIBR-OhDmw/profile-framedphoto-shrink_400_400/0/1629526954865?e=1683777600&v=beta&t=HUgGzkTxHKUGP6_JQupbKEty3qKO-dd8Spm52asCjH8',
//                 'https://media.licdn.com/dms/image/D5635AQFifIBR-OhDmw/profile-framedphoto-shrink_400_400/0/1629526954865?e=1683777600&v=beta&t=HUgGzkTxHKUGP6_JQupbKEty3qKO-dd8Spm52asCjH8',
//               ]

function ChallengeCard({ChallengeData, isWeekly}): JSX.Element {
	const [modalVisible, setModalVisible] = useState(false)
  var images = []
  var ProgressPercent = 0
  if (!isWeekly){
    // images = ['https://media.licdn.com/dms/image/D5635AQFifIBR-OhDmw/profile-framedphoto-shrink_400_400/0/1629526954865?e=1683777600&v=beta&t=HUgGzkTxHKUGP6_JQupbKEty3qKO-dd8Spm52asCjH8',
    //             'https://media.licdn.com/dms/image/D5635AQFifIBR-OhDmw/profile-framedphoto-shrink_400_400/0/1629526954865?e=1683777600&v=beta&t=HUgGzkTxHKUGP6_JQupbKEty3qKO-dd8Spm52asCjH8',
    //             'https://media.licdn.com/dms/image/D5635AQFifIBR-OhDmw/profile-framedphoto-shrink_400_400/0/1629526954865?e=1683777600&v=beta&t=HUgGzkTxHKUGP6_JQupbKEty3qKO-dd8Spm52asCjH8',
    //           ]
    for (let User of ChallengeData.participants){
      images.push(createProfilePictureURL(User))
    }
    var myProgressBaseUnits = ChallengeData.progress.progress;
    var totalBaseUnits = ChallengeData.progress.exercise.convertedAmount;
    var totalRealUnits = ChallengeData.progress.exercise.amount;
    var myProgressRealUnits = calculateProgress(myProgressBaseUnits, ChallengeData.exercise.unit);
    var ProgressPercent = Math.min(100,Math.round(myProgressBaseUnits / totalBaseUnits * 100));
  }else {
    images = ['https://imgur.com/W03ovOf.png']
    var myProgressBaseUnits = ChallengeData.progress;
    var totalBaseUnits = ChallengeData.exercise.convertedAmount;
    var totalRealUnits = ChallengeData.exercise.amount;
    ProgressPercent = Math.min(100, Math.round(myProgressBaseUnits / totalBaseUnits * 100));
    var myProgressRealUnits = calculateProgress(myProgressBaseUnits, ChallengeData.exercise.unit);
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
      >
        <ChallengeModalPopUp 
          Challenge = {ChallengeData}
          isWeekly = {isWeekly}
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