import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList, RefreshControl
} from 'react-native';

import {styles} from "../../css/challenges/Style"
import ChallengeCard from '../Challenges/ChallengeCard';

function ChallengeScroll({ChallengeData, isCurrent, onRefresh}): JSX.Element {
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
      }, 3000);
  }

  return (
    <FlatList
      data = {ChallengeData}
      renderItem = {renderChallenge}
      contentContainerStyle = {styles.FlatListContainer}
      refreshControl ={
        <RefreshControl 
          refreshing = {refreshing} 
          onRefresh = {Refresh} 
          colors = {['#014421']}
          tintColor = {'#014421'}
          progressViewOffset = {-10}
        />
      }
  />
  )
}

export default ChallengeScroll