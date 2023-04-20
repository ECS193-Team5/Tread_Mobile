import React, { useState } from 'react';
import {
	Pressable,
  Image,
  View,
  Text,
  StatusBar,
  Modal,
  StyleSheet,
  FlatList
} from 'react-native';

import { modalstyle } from '../../css/challenges/modalStyle';
import ChallengeCard from './ChallengeCard';

const ChallengeData = ['1gasdghsahgafhgasdghjasghjdsfghjfghj','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20']

const renderChallenge = ({item}) => {
  return (
  <ChallengeCard 
    text = {item}/>
  )
}


function ChallengeModalPopUp({handleOnPress}) {
  return(
    <View style={modalstyle.container}>
      <View style = {modalstyle.PopUpTextContainer}>
        <Text> Challenge </Text>
      </View>
      <View style = {modalstyle.PopUpChallengeDescriptionContainer}>
        <Text> Description </Text>

      </View>

      <View style = {modalstyle.seperator}/>

      <View style = {modalstyle.PopUpTextContainer}>
        <Text> Progress </Text>

      </View>

      <View style = {modalstyle.ProgressBarContainer}>
      <FlatList
        data = {ChallengeData}
        renderItem = {renderChallenge}
        contentContainerStyle = {modalstyle.FlatListContainer}
      />
      </View>
    </View>
  )
}



export default ChallengeModalPopUp;