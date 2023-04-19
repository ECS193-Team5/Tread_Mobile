import React from 'react';
import {
	Pressable,
  Image,
  View,
  Text,
  StatusBar
} from 'react-native';

import {cardStyles} from "../../css/cards/Style"
import ProgressCircle from "react-native-progress-circle"

function ChallengeCard({text}): JSX.Element {
	return (
    <View style = {[cardStyles.ChallengeCardContainer, cardStyles.shadowProp]}>
      <StatusBar
        barStyle="dark-content"
      />
      <View style = {cardStyles.ImageContainer}>
        <Image style ={{width :35, height : 35 , borderRadius : 17.5, borderWidth : 2, borderColor : 'black'}}
          source={{uri: "https://media.licdn.com/dms/image/D5635AQFifIBR-OhDmw/profile-framedphoto-shrink_200_200/0/1629526954865?e=1682553600&v=beta&t=1m93JYRscH1wDz8rW3_cuF2IsOGuwn3BREKHdr-K1bM"}}/>
        <Image style ={{width :35, height : 35 , borderRadius : 17.5, borderWidth : 2, borderColor : 'black',marginLeft : -12}}
          source={{uri: "https://media.licdn.com/dms/image/D5635AQFifIBR-OhDmw/profile-framedphoto-shrink_200_200/0/1629526954865?e=1682553600&v=beta&t=1m93JYRscH1wDz8rW3_cuF2IsOGuwn3BREKHdr-K1bM"}}/>
        <Image style ={{width :35, height : 35 , borderRadius : 17.5, borderWidth : 2, borderColor : 'black', marginLeft : -12}}
          source={{uri: "https://media.licdn.com/dms/image/D5635AQFifIBR-OhDmw/profile-framedphoto-shrink_200_200/0/1629526954865?e=1682553600&v=beta&t=1m93JYRscH1wDz8rW3_cuF2IsOGuwn3BREKHdr-K1bM"}}/>
      </View>

      <View style = {cardStyles.seperator}/>

      <View style = {cardStyles.ChallengeCardTextContainer}>
        <View style = {cardStyles.ChallengeNameContainer}>
          <Text style = {cardStyles.ChallengeNameText}>{text}</Text>
        </View>
        <View style = {cardStyles.ChallengeProgressContainer}>
          <ProgressCircle
            percent = {30}
            radius = {35}
            borderWidth = {3}
            color = '#014421'
            shadowColor='#bebebe'
            bgColor='#FFFFFF'
          >
          <Text style = {cardStyles.ChallengeProgressText}>30%</Text>
        </ProgressCircle>
        </View>
      </View>
    </View>
	)
}

export default ChallengeCard;