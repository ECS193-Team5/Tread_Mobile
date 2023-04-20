import React from 'react';
import {
  View,
  Button,
  StyleSheet
} from 'react-native';

import ChallengesSwap from '../components/Challenges/ChallengeSwap';
import {styles} from "../css/challenges/Style"
import {cardStyles} from "../css/cards/Style"
import IncomingSwap from '../components/shared/IncomingSwap';


function IncomingChallengesPage(props): JSX.Element {
  var imageUrl = "https://imgur.com/nFRNXOB.png"  
  return (
    <View style = {styles.container}>
      
      <View style = {styles.topRightClickContainer}>
        <IncomingSwap
          props = {props}
          PageToSwap = {"Challenges"}
          imageUrl = {imageUrl}/>
      </View>
    </View>
  )
}

export default IncomingChallengesPage;
