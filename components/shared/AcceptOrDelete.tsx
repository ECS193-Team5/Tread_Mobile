import React, { useState } from 'react';
import {
	Pressable,
  Image,
  View,
  Text,
  StatusBar,
  StyleSheet,
  Dimensions,
  TouchableHighlight
} from 'react-native';

import {cardStyles} from "../../css/cards/Style"
import { ImageStyles } from '../../css/imageCluster/Style';
import { SharedStyles} from '../../css/shared/Style'

function AcceptOrDelete({pageTitle, acceptObj, deleteObj, rejectObj}): JSX.Element {  
  if (pageTitle === 'Sent'){
    return(
      <View style = {cardStyles.ChallengeProgressContainer}>
        <Pressable
          onPress={deleteObj}
        >
          <Image style ={ImageStyles.AcceptOrDecline} source={{uri: 'https://imgur.com/Jt0IjSQ.png'}}/>
        </Pressable>
      </View>

    )
  } else {
    return(
      <View style = {cardStyles.ChallengeProgressContainer}>
        <Pressable
        onPress={acceptObj}
        style = {SharedStyles.buttonStyle}
        >
          <Image style ={ImageStyles.AcceptOrDecline} source={{uri: 'https://imgur.com/PMJ1WhF.png'}}/>
        </Pressable>        
        <Pressable
        onPress={rejectObj}
        style = {SharedStyles.buttonStyle}
        >
          <Image style ={ImageStyles.AcceptOrDecline} source={{uri: 'https://imgur.com/ingQGWS.png'}}/>
        </Pressable>
      </View>
    )
  } 
}


export default AcceptOrDelete

