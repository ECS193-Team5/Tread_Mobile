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

// Get Image here from cloudinary again
const image = 'https://media.licdn.com/dms/image/D5635AQFifIBR-OhDmw/profile-framedphoto-shrink_200_200/0/1629526954865?e=1682553600&v=beta&t=1m93JYRscH1wDz8rW3_cuF2IsOGuwn3BREKHdr-K1bM'
            
function ProgressCard({ProgressObj}){
  
  var ProgressPercent = Math.min(ProgressObj.complete, 100)
  
  return (
    <View style ={progressCardStyle.CardContainer}>
      <View style = {progressCardStyle.ImageSwapSection}>
        <Image style ={progressCardStyle.imageStyle} source={{uri: image}}/>
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