import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList, RefreshControl
} from 'react-native';

import {styles} from "../../css/challenges/Style"
import ChallengeCard from '../Challenges/ChallengeCard';

function ChallengeScroll({ChallengeData, isCurrent, onRefresh, reRender}): JSX.Element {
  const [refreshing, setRefreshing] = useState(false)

  const renderChallenge = ({item}) => {
    return (
    <ChallengeCard 
      ChallengeData = {item}
      isWeekly = {!isCurrent}/>
    )
  }

  const Refresh = function() {
    setRefreshing(true);
    setTimeout(() => {
      onRefresh()
      setRefreshing(false);
      }, 450);
  }

  return (
    <FlatList
      data = {ChallengeData}
      renderItem = {renderChallenge}
      contentContainerStyle = {styles.FlatListContainer}
      extraData = {reRender}
      refreshControl ={
        <RefreshControl 
          refreshing = {refreshing} 
          onRefresh = {Refresh} 
          colors = {['#014421']}
          tintColor = {'#014421'}
          progressViewOffset = {-10}
        />
      }
      testID = "Challenge Scroll"
  />
  )
}

export default ChallengeScroll