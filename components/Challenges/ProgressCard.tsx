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
import {ProgressView} from "@react-native-community/progress-view"
import { ImageStyles } from '../../css/imageCluster/Style';

// Get Image here from cloudinary again
const image = 'https://media.licdn.com/dms/image/D5635AQFifIBR-OhDmw/profile-framedphoto-shrink_200_200/0/1629526954865?e=1682553600&v=beta&t=1m93JYRscH1wDz8rW3_cuF2IsOGuwn3BREKHdr-K1bM'
            
function ProgressCard({Progress}){
  return (
    <View style ={progressCardStyle.CardContainer}>
      <View style = {progressCardStyle.ImageSwapSection}>
        <Image style ={progressCardStyle.imageStyle} source={{uri: image}}/>
      </View>
      <View style = {progressCardStyle.ProgressBarContainer}>
        {/* <Text > Test Text</Text> */}
        <ProgressView
          progressTintColor="#014421"
          trackTintColor="white"
          progress={(Progress.complete)/100}
          style = {
            {
              borderWidth : 0.2,
            }
          }
        />
      </View>
    </View>
  )
}

export default ProgressCard;