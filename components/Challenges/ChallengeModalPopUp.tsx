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
import ProgressCard from './ProgressCard';

const ChallengeData = ['1gasdghsahgafhgasdghjasghjdsfghjfghj','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20']

const renderProgress = () => {
  return (
  <ProgressCard/>
  )
}

function ChallengeModalPopUp({handleOnPress}) {
  return(
    <View style={modalstyle.container}>
      <View style = {modalstyle.PopUpTextContainer}>
        <Text style = {modalstyle.TitleTextStyle}> Challenge </Text>
      </View>
      <View style = {modalstyle.PopUpChallengeDescriptionContainer}>
        <View style = {modalstyle.ChallengeInfoIndividualContainer}> 
          <Text style = {modalstyle.InfoTypeTextStyle}>Description       :     
            <Text style = {modalstyle.InfoTextStyle}>      Do 250 Pushups</Text>
          </Text>
        </View>
        
        <View style = {modalstyle.ChallengeInfoIndividualContainer}> 
          <Text style = {modalstyle.InfoTypeTextStyle}>Assigned by      :     
            <Text style = {modalstyle.InfoTextStyle}>      Bob Jones</Text>
          </Text>
        </View>
        
        <View style = {modalstyle.ChallengeInfoIndividualContainer}> 
          <Text style = {modalstyle.InfoTypeTextStyle}>Time Left           :     
            <Text style = {modalstyle.InfoTextStyle}>      2d 3h</Text>
          </Text>
        </View>
      </View>

      <View style = {modalstyle.seperator}/>

      <View style = {modalstyle.PopUpTextContainer}>
        <Text style = {modalstyle.TitleTextStyle}> Progress </Text>

      </View>

      <View style = {modalstyle.ProgressContainer}>
      <FlatList
        data = {ChallengeData}
        renderItem = {renderProgress}
        contentContainerStyle = {modalstyle.FlatListContainer}
      />
      </View>
    </View>
  )
}



export default ChallengeModalPopUp;