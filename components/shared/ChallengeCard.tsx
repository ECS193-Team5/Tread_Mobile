import React from 'react';
import {
	Pressable,
  Image,
  View,
  Text,
  StatusBar
} from 'react-native';

import {cardStyles} from "../../css/cards/Style"
function ChallengeCard({text}): JSX.Element {
	return (
    <View style = {[cardStyles.ChallengeCardContainer, cardStyles.shadowProp]}>
      <StatusBar
        barStyle="dark-content"
      />
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
          <Text> Progress </Text>
        </View>
      </View>
    </View>
	)
}

export default ChallengeCard;