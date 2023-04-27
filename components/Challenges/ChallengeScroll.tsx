import React, { useState } from 'react';
import {
  FlatList
} from 'react-native';

import {styles} from "../../css/challenges/Style"
import ChallengeCard from './ChallengeCard';

function ChallengeScroll({ChallengeData, isCurrent}): JSX.Element {
  const renderChallenge = ({item}) => {
    return (
    <ChallengeCard 
      ChallengeData = {item}
      isWeekly = {isCurrent}/>
    )
  }

  return (
    <FlatList
      data = {ChallengeData}
      renderItem = {renderChallenge}
      contentContainerStyle = {styles.FlatListContainer}
  />
  )
}

export default ChallengeScroll