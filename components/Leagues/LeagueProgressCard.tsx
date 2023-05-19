import React, { useState } from 'react';
import {
  Image,
  View,
  Text,
} from 'react-native';

import {progressCardStyle} from '../../css/challenges/progressCardStyle'
import * as Progress from 'react-native-progress';
import { createProfilePictureURL } from '../Helpers/CloudinaryURLHelper';
import { cardStyles } from '../../css/cards/Style';

function LeagueProgressCard({ProgressObj, Username}){
  var ProgressPercent = Math.min(ProgressObj.complete, 100)
  var left = ''
  var color = '#F9A800'
  if (ProgressPercent < 30) {
    left = ProgressPercent + '%'
    color = '#014421'
  } else if (ProgressPercent > 20 && ProgressPercent <= 80){
    left = ProgressPercent - 20 + '%'
    color = '#F9A800'
  }

  return (
    <View style ={[progressCardStyle.LeagueCardContainer, cardStyles.shadowProp, Username === ProgressObj[0] ? {borderColor : '#014421', borderWidth : 2} : null]}>
      <View style = {progressCardStyle.ImageSwapSection}>
        <Image style ={progressCardStyle.imageStyle} source={{uri: createProfilePictureURL(ProgressObj[0])}}/>
      </View>

      <View style = {progressCardStyle.ProgressBarContainer}>
          <Text style = {[progressCardStyle.ProgressTextStyle, {color : '#014421', alignSelf : 'center'}]}>
            {ProgressObj[0]}
          </Text>
      </View>
      <View style = {progressCardStyle.ProgressPercentContainer}>
        <Text style = {progressCardStyle.ScoreTextStyle}>
          {ProgressObj[1]}
        </Text>
      </View>
    </View>
  )
}

export default LeagueProgressCard;