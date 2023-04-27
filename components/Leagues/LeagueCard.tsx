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

import {cardStyles} from "../../css/cards/Style"
import { ImageStyles } from '../../css/imageCluster/Style';
import ImageCluster from '../shared/ImageCluster';

// get challenge leaderboard backend call to get image data 
// pass on that data to modal

// cloudinary image hosting will get these images
// const images = ['https://media.licdn.com/dms/image/D5635AQFifIBR-OhDmw/profile-framedphoto-shrink_400_400/0/1629526954865?e=1683165600&v=beta&t=EU0EmYCCgMEGnLTGtcZ64L70bjMBTWJIJAP6BjaYjdo',
//                 'https://media.licdn.com/dms/image/D5635AQFifIBR-OhDmw/profile-framedphoto-shrink_400_400/0/1629526954865?e=1683165600&v=beta&t=EU0EmYCCgMEGnLTGtcZ64L70bjMBTWJIJAP6BjaYjdo',
//                 'https://media.licdn.com/dms/image/D5635AQFifIBR-OhDmw/profile-framedphoto-shrink_400_400/0/1629526954865?e=1683165600&v=beta&t=EU0EmYCCgMEGnLTGtcZ64L70bjMBTWJIJAP6BjaYjdo',
//               ]

function LeagueCard({LeagueData, props}): JSX.Element {
  var image = 'https://imgur.com/N31G5Sk.png'

  const handleLeaguePress = function() {
    console.log(LeagueData.leagueName)
    props.navigation.navigate("League Details", {leagueData : LeagueData})
  }

  return (
    <Pressable 
      onPress={handleLeaguePress}
      style = {[cardStyles.ChallengeCardContainer, cardStyles.shadowProp]}
    >
      <StatusBar
        barStyle="dark-content"
      />
        
      <View style = {cardStyles.ImageContainer}>
        <Image style ={ImageStyles.single} source={{uri: image}}/>
      </View>
      
      <View style = {cardStyles.seperator}/>

      <View style = {cardStyles.ChallengeCardTextContainer}>
        <View style = {cardStyles.LeagueDetailContainer}>
          <Text style = {cardStyles.LeagueNameText}>
            {LeagueData.leagueName}
          </Text>
          <Text style = {cardStyles.ChallengeNameText}>
            {LeagueData.members.length + (LeagueData.members.length > 1 ? " Members" : " Member")}
          </Text>
          <Text style = {[cardStyles.ChallengeNameText , {color : "#F9A800"}]}>
            {LeagueData.activeChallenges + " Active Challenges"}
          </Text>
        </View>
      </View>
    </Pressable>
	)
}

export default LeagueCard;