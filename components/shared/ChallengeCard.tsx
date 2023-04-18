import React from 'react';
import {
	Pressable,
  Image,
  View,
  Text
} from 'react-native';

import {cardStyles} from "../../css/cards/Style"

function ChallengeCard({text}): JSX.Element {
	return (
    <View style = {cardStyles.ChallengeCardContainer}>
      <View style = {cardStyles.ImageSection}>
        <Image style ={{width :30, height : 30}}
          source={{uri: "https://imgur.com/nFRNXOB.png"}}/>
      </View>

      <View style = {cardStyles.seperator}/>

      <View style = {cardStyles.ChallengeCardTextContainer}>
        <View>
          <Text style = {cardStyles.ChallengeNameText}>{text}</Text>
        </View>
        <View>
          <Text style = {cardStyles.ChallengeNameText}> Progress </Text>
        </View>
      </View>
    </View>
	)
}

export default ChallengeCard;