import React, { useState } from 'react';
import {
	Pressable,
  Image,
  View,
  Text,
  StatusBar,
  StyleSheet,
  Dimensions
} from 'react-native';

import {progressCardStyle} from '../../css/challenges/progressCardStyle'
import * as Progress from 'react-native-progress';
import { createProfilePictureURL } from '../Helpers/CloudinaryURLHelper';

import axios from 'axios';
import {BACKEND_URL} from '@env';

function ProgressCard({ProgressObj, Username}){
  var ProgressPercent = Math.min(ProgressObj.complete, 100)

  return (
    <View style ={[progressCardStyle.CardContainer, Username === ProgressObj.name ? {borderColor : '#014421', borderWidth : 2} : null]}>
      <View style = {progressCardStyle.ImageSwapSection}>
        <Image style ={progressCardStyle.imageStyle} source={{uri: createProfilePictureURL(ProgressObj.name)}}/>
      </View>
      <View style = {progressCardStyle.ProgressBarContainer}>
        <Progress.Bar
          progress={ProgressPercent/100}
          width = {null}
          height = {15}
          borderWidth	= {0.3}
          unfilledColor	= {'white'}
          color  = {'#014421'}
          borderRadius = {20}
        />
      </View>
      <View style = {progressCardStyle.ProgressPercentContainer}>
        <Text style = {progressCardStyle.TextStyle}>
          {Math.round(ProgressPercent)}%
        </Text>
      </View>
    </View>
  )
}

export default ProgressCard;