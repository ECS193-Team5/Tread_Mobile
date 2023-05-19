import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,  
} from 'react-native';

import { modalstyle } from '../../css/shared/modalStyle';

import axios from 'axios';
import {BACKEND_URL} from '@env';
import LeagueProgressCard from './LeagueProgressCard';

function LeagueLeaderboard({progressInfo}) {
  const getUsername = function(){
    var config = {
      method: 'post',
      url: BACKEND_URL + 'user/get_username',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      }
    }
  
    axios(config)
      .then(function (response) {
        setUsername(response.data)
      })
      .catch((error) =>
        console.log(error)
      )
  }

  const [username, setUsername] = useState(getUsername)

  const renderProgress = ({item}) => {
    return (
    <LeagueProgressCard
      ProgressObj = {item}
      Username = {username}/>
    )
  }

  return(
    <View style = {{flex : 1}}>
      <View style = {modalstyle.LeaguePopUpTextContainer}>
        <Text style = {modalstyle.TitleTextStyle}>Leaderboard </Text>
      </View>
      <View style = {[modalstyle.ProgressContainer]}>
        <FlatList
          data = {progressInfo}
          renderItem = {renderProgress}
          contentContainerStyle = {modalstyle.FlatListContainer}
        />
      </View>
    </View>
  )
}

export default LeagueLeaderboard;