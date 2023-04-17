import React from 'react';
import {
  View,
  Button,
  StyleSheet,
  Image,
  Pressable
} from 'react-native';
import { Text } from 'react-native-elements';
import IncomingSwap from '../components/shared/IncomingSwap';

import {styles} from "../css/challenges/Style"

function ChallengesPage(props): JSX.Element {
  return (
    <View style = {styles.container}>
      <View style = {styles.topRightClickContainer}>
        <View>
          <IncomingSwap
            props = {props}
            swapPage = "Incoming Challenges"/>
        </View>
      </View>
      <View style = {styles.titleContainer}>
        <Text style = {styles.textStyle}>Current Challenges</Text>
      </View>
      <View style = {styles.tabswitchContainer}>

      </View>
      <View style = {styles.swapChallengeContainer}>
      </View>
    </View>
  )
}

export default ChallengesPage;
