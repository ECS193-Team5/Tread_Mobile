import React, { useState } from 'react';
import {
  FlatList,
  RefreshControl
} from 'react-native';

import LeagueInviteCard from '../../components/shared/LeagueInviteCard';


function LeagueInviteScroll({LeagueData, handler, onRefresh, pageTitle, reRender}): JSX.Element {
  const [refreshing, setRefreshing] = useState(false)

  const Refresh = function() {
    setRefreshing(true);
    setTimeout(() => {
      onRefresh()
      setRefreshing(false);
      }, 450);
  }

  const renderInvite = ({item, index}) => {
    return (
    <LeagueInviteCard
      LeagueData= {item}
      index = {index}
      handler = {handler}
      pageTitle = {pageTitle}
      />
    )
  }

  return (
    <FlatList
      data = {LeagueData}
      renderItem = {renderInvite}
      extraData = {reRender}
      refreshControl ={
        <RefreshControl
          refreshing = {refreshing}
          onRefresh = {Refresh}
          tintColor = {'#014421'}
          progressViewOffset = {-10}
        />
      }
    />
  )
}

export default LeagueInviteScroll
