import React from 'react';
import {
  Image,
  View,
  Text,
  TouchableHighlight
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {cardStyles} from "../../css/cards/Style"
import { styles } from '../../css/challenges/Style';

function ChallengesSwap({onPress,text, available, imageURL}): JSX.Element {
	return (
    <TouchableHighlight 
      onPress = {onPress}
      style = {[cardStyles.ChallengeSwapCardContainer]}
    >
      <LinearGradient
      colors={['rgba(1, 63, 33,1)', 'rgba(1, 63, 33,0.5)', 'rgb(1, 100, 0)']}
      style = {[cardStyles.ChallengeSwapCardContainer]}
      >
      <View style = {cardStyles.ImageSwapSection}>
      <Image style ={{width : 70, height : 70}}
        source={{uri: imageURL }}/>
      </View>
      <View style = {cardStyles.ChallengeSwapTextContainer}>
        <View>
          <Text style = {cardStyles.ChallengeTypeText}>{text}</Text>
        </View>
        <View>
          <Text style = {cardStyles.ChallengeCountText}>{available}</Text>
        </View>
      </View>
      </LinearGradient>
    </TouchableHighlight>
	)
}

export default ChallengesSwap;