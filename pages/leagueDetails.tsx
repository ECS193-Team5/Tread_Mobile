import React from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text
} from 'react-native';

import ChallengesSwap from '../components/Challenges/ChallengeSwap';
import {styles} from "../css/challenges/Style"
import {cardStyles} from "../css/cards/Style"
import IncomingSwap from '../components/shared/IncomingSwap';

function LeagueDetails(props): JSX.Element {
  var imageUrl = "https://imgur.com/nFRNXOB.png"  
  return (
    <View style = {styles.container}>
      
      <View style = {styles.topRightClickContainer}>
        <IncomingSwap
          props = {props}
          PageToSwap = {"Leagues"}
          imageUrl = {imageUrl}/>
      </View>
      <View style = {styles.titleContainer}>
        <Text style = {styles.TitleText}>{props.route.params.leagueData.leagueName}</Text>
      </View>
    </View>
  )
}

export default LeagueDetails;