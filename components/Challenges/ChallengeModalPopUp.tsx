import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
} from 'react-native';

import { modalstyle } from '../../css/shared/modalStyle';
import ProgressCard from './ProgressCard';

import axios from 'axios';
import {BACKEND_URL} from '@env';
import { calculateProgress } from '../Helpers/calculationHelpers';
import DragDownBar from '../shared/DragDownBar';

function ChallengeModalPopUp({Challenge, isWeekly, totalBaseUnits}) {
  const makeProgressObj = function(item, index){
    var entry = {}
    entry['level'] = index + 1
    entry['name'] = item['username']
    entry['complete'] = item['progress'] / totalBaseUnits * 100
    entry['score'] = calculateProgress(item['progress'], Challenge.exercise.unit)
    return entry
  }

  const selfInTop5 = function(top5, selfData) {
    var myUsername = selfData.username;

    for (let i = 0; i < top5.length; i++) {
        if (myUsername === top5[i].username) {
            return true;
        }
    }
    return false;
  }

  const buildGlobalLeaderboard= function(response) {

    let top5 = response.data[0];
    let selfData = response.data[1];

    let top5Info = top5.map(makeProgressObj);

    if (!selfInTop5(top5, selfData)) {
        let item = makeProgressObj(selfData, 6);
        item[0]["level"] = " - ";
        top5Info.push(item[0]);
    }

    setProgressInfo(top5Info);
  }

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

  const getProgressInfo = function(){
    var route = isWeekly ? 'global_challenge/get_leaderboard' : 'challenges/get_challenge_leaderboard'
    var challengeID = isWeekly ? Challenge.challengeID : Challenge._id
    var config = {
      method: 'post',
      url: BACKEND_URL + route,
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
      data : {
        challengeID : challengeID
      }
    };

    axios(config)
      .then(function (response) {
        isWeekly ? buildGlobalLeaderboard(response) :
        setProgressInfo(response.data.map(makeProgressObj))
      })
      .catch((error) =>
        console.log(error)
      )
  }

  const [ProgressInfo, setProgressInfo] = useState(getProgressInfo)
  const [username, setUsername] = useState(getUsername)

  const renderProgress = ({item}) => {
    return (
    <ProgressCard
      ProgressObj = {item}
      Username = {username}/>
    )
  }

  var time_left_due = Math.round((new Date(Challenge.dueDate)-new Date())/(1000*60*60*24))
  var time_left_issue = Math.round((new Date(Challenge.issueDate)-new Date())/(1000*60*60*24))
  var time_left = (time_left_issue > 0 ? time_left_issue : time_left_due)
  let timeLeftTitle = (time_left_issue > 0 ? "Starting: " : "Time Left: ")
  var title = ''
  var sentUser = ''
  if (!isWeekly){
    title = Challenge.challengeType.charAt(0).toUpperCase() + Challenge.challengeType.slice(1) + ' Challenge'
    sentUser = "      " + Challenge.sentUser
  } else {
    title = 'Global Challenge'
    sentUser = '     Tread Mobile'
  }
  return(
    <View style={modalstyle.container}>
      <View style = {modalstyle.dragDownContainer}>
        <DragDownBar/>
      </View>
      <View style = {modalstyle.PopUpTextContainer}>
        <Text style = {modalstyle.TitleTextStyle}>{title}</Text>
      </View>
      <View style = {modalstyle.PopUpChallengeDescriptionContainer}>
        <View style = {modalstyle.ChallengeInfoIndividualContainer}>
          <Text style = {modalstyle.InfoTypeTextStyle}>Description       :
            <Text style = {modalstyle.InfoTextStyle}> {"     " + Challenge.exercise.exerciseName + " " + Challenge.exercise.amount + " " + Challenge.exercise.unit}</Text>
          </Text>
        </View>

        <View style = {modalstyle.ChallengeInfoIndividualContainer}>
          <Text style = {modalstyle.InfoTypeTextStyle}>Assigned by      :
            <Text style = {modalstyle.InfoTextStyle}>{sentUser}</Text>
          </Text>
        </View>

        <View style = {modalstyle.ChallengeInfoIndividualContainer}>
          <Text style = {modalstyle.InfoTypeTextStyle}>{timeLeftTitle}
            <Text style = {modalstyle.InfoTextStyle}>{"      " + time_left + "d"}</Text>
          </Text>
        </View>
      </View>

      <View style = {modalstyle.seperator}/>

      <View style = {modalstyle.PopUpTextContainer}>
        <Text style = {modalstyle.TitleTextStyle}>Leaderboard </Text>

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