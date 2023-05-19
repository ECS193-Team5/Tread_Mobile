import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  UIManager,
  LayoutAnimation,
  FlatList,
  RefreshControl
} from 'react-native';

import {styles} from "../../css/challenges/Style"
import IncomingSwap from '../../components/shared/IncomingSwap';
import SwitchSelector from "react-native-switch-selector"
import LeagueInviteCard from '../../components/shared/LeagueInviteCard';
import axios from 'axios';
import {BACKEND_URL} from '@env';
import ZeroItem from '../../components/shared/ZeroItem';

function LeagueInviteScroll({LeagueData, handler, onRefresh, pageTitle}): JSX.Element {
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
