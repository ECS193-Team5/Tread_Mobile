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

// get challenge leaderboard backend call to get image data 
// pass on that data to modal

// cloudinary image hosting will get these images
// const images = ['https://media.licdn.com/dms/image/D5635AQFifIBR-OhDmw/profile-framedphoto-shrink_200_200/0/1629526954865?e=1682553600&v=beta&t=1m93JYRscH1wDz8rW3_cuF2IsOGuwn3BREKHdr-K1bM',
//                 'https://media.licdn.com/dms/image/D5635AQFifIBR-OhDmw/profile-framedphoto-shrink_200_200/0/1629526954865?e=1682553600&v=beta&t=1m93JYRscH1wDz8rW3_cuF2IsOGuwn3BREKHdr-K1bM',
//                 'https://media.licdn.com/dms/image/D5635AQFifIBR-OhDmw/profile-framedphoto-shrink_200_200/0/1629526954865?e=1682553600&v=beta&t=1m93JYRscH1wDz8rW3_cuF2IsOGuwn3BREKHdr-K1bM',
//               ]

function ChallengeCard({ChallengeData, isWeekly}): JSX.Element {
	const [modalVisible, setModalVisible] = useState(false)
  var images = []
  if (!isWeekly){
    images = ['https://media.licdn.com/dms/image/D5635AQFifIBR-OhDmw/profile-framedphoto-shrink_200_200/0/1629526954865?e=1682553600&v=beta&t=1m93JYRscH1wDz8rW3_cuF2IsOGuwn3BREKHdr-K1bM',
                'https://media.licdn.com/dms/image/D5635AQFifIBR-OhDmw/profile-framedphoto-shrink_200_200/0/1629526954865?e=1682553600&v=beta&t=1m93JYRscH1wDz8rW3_cuF2IsOGuwn3BREKHdr-K1bM',
                'https://media.licdn.com/dms/image/D5635AQFifIBR-OhDmw/profile-framedphoto-shrink_200_200/0/1629526954865?e=1682553600&v=beta&t=1m93JYRscH1wDz8rW3_cuF2IsOGuwn3BREKHdr-K1bM',
              ]
  }else {
    images = ['https://imgur.com/W03ovOf.png']
  }

  const handleOnPress = function(){
    setModalVisible(!modalVisible)
  }

  var ProgressPercent = Math.min(100, Math.round((ChallengeData.progress.progress)/(ChallengeData.exercise.amount) * 100))

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