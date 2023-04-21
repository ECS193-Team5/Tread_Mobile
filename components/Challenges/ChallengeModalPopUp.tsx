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

// output of getLeaderboard Info with the convertProgress and makeLeaderBoardObj function applied
// IssuedChallengesObj.js from the web frontend
const ProgressInfo = [
  {
      "level": 1,
      "name": "batman#6380",
      "complete": 10018.243243243243,
      "score": 44481
  },
  {
      "level": 2,
      "name": "batman#9320",
      "complete": 50,
      "score": 0
  },
  {
      "level": 3,
      "name": "Kauboy#8925",
      "complete": 20,
      "score": 0
  }
]

function ChallengeModalPopUp({Challenge}) {
  
  const renderProgress = ({item}) => {
    return (
    <ProgressCard
      Progress = {item}/>
    )
  }

  var time_left = ((new Date(Challenge.dueDate)-new Date(Challenge.issueDate))/(1000*60*60*24))

  return(
    <View style={modalstyle.container}>
      <View style = {modalstyle.PopUpTextContainer}>
        <Text style = {modalstyle.TitleTextStyle}> Challenge </Text>
      </View>
      <View style = {modalstyle.PopUpChallengeDescriptionContainer}>
        <View style = {modalstyle.ChallengeInfoIndividualContainer}> 
          <Text style = {modalstyle.InfoTypeTextStyle}>Description       :     
            <Text style = {modalstyle.InfoTextStyle}> {"     " + Challenge.exercise.exerciseName + " " + Challenge.exercise.amount + " " + Challenge.exercise.unit}</Text>
          </Text>
        </View>
        
        <View style = {modalstyle.ChallengeInfoIndividualContainer}> 
          <Text style = {modalstyle.InfoTypeTextStyle}>Assigned by      :     
            <Text style = {modalstyle.InfoTextStyle}>{"      " + Challenge.sentUser}</Text>
          </Text>
        </View>
        
        <View style = {modalstyle.ChallengeInfoIndividualContainer}> 
          <Text style = {modalstyle.InfoTypeTextStyle}>Time Left           :     
            <Text style = {modalstyle.InfoTextStyle}>{"      " + time_left + "d"}</Text>
          </Text>
        </View>
      </View>

      <View style = {modalstyle.seperator}/>

      <View style = {modalstyle.PopUpTextContainer}>
        <Text style = {modalstyle.TitleTextStyle}> Progress </Text>

      </View>

      <View style = {modalstyle.ProgressContainer}>
      <FlatList
        data = {ProgressInfo}
        renderItem = {renderProgress}
        contentContainerStyle = {modalstyle.FlatListContainer}
      />
      </View>
    </View>
  )
}



export default ChallengeModalPopUp;