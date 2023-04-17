import React from 'react';
import {
	TouchableOpacity,
	Button,
	Text,
	Pressable,
  Image 
} from 'react-native';

import {styles} from '../../css/login/Style';

function IncomingSwap({props, swapPage}): JSX.Element {
	return (
    <Pressable
      onPress = {() => props.navigation.navigate(swapPage)}
    >
      <Image style ={{width : 40, height : 40}}
      source={{uri: "https://imgur.com/gMqz2UZ.png" }}/>
    </Pressable>
	)
}

export default IncomingSwap;