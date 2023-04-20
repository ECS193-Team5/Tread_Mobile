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

function ProgressCard(){
  return (
    <View style ={progressCardStyle.CardContainer}>
      <View style = {progressCardStyle.ImageSwapSection}>

      </View>
      <View style = {progressCardStyle.ProgressBarContainer}>
        <Text > Test Text</Text>
      </View>
    </View>
  )
}

export default ProgressCard;