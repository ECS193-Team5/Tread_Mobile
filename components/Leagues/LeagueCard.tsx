import React, { useState } from 'react';
import {
	Pressable,
  Image,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {cardStyles} from "../../css/cards/Style"
import { ImageStyles } from '../../css/imageCluster/Style';
import { createLeaguePictureURL } from '../Helpers/CloudinaryURLHelper';

function LeagueCard({LeagueData, props, refresh}): JSX.Element {
  var image = createLeaguePictureURL(LeagueData._id)
  const handleLeaguePress = function() {
    console.log(LeagueData.leagueName)
    props.navigation.navigate("League Details", {leagueData : LeagueData, refresh : refresh})
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
      <View style = {cardStyles.ChallengeOpenImageContainer}>
           <Image style ={{width : 15, height : 15, alignSelf: 'center'}}
            source={{uri: 'https://i.imgur.com/aNoUoZK.png' }}/>
      </View>
    </Pressable>
	)
}

export default LeagueCard;