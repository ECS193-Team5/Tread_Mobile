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
        style = {{marginHorizontal : "5%"}}
        >
          <Image style ={ImageStyles.AcceptOrDecline} source={{uri: 'https://imgur.com/PMJ1WhF.png'}}/>
        </Pressable>
        <Pressable
        onPress={rejectObj}
        style = {{marginHorizontal : "5%"}}
        >
          <Image style ={ImageStyles.AcceptOrDecline} source={{uri: 'https://imgur.com/ingQGWS.png'}}/>
        </Pressable>
      </View>
    )
  } 
}


export default AcceptOrDelete

