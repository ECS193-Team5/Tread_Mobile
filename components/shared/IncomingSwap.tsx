import React from 'react';
import {
	Pressable,
  Image,
  View,
} from 'react-native';

import {styles} from '../../css/login/Style';

function IncomingSwap({props, PageToSwap, imageUrl}): JSX.Element {
  return (
    <View>
      <Pressable
        onPress = {() => props.navigation.navigate(PageToSwap)}
      >
        <Image style ={{width : 35, height : 35}}
        source={{uri: imageUrl }}/>
      </Pressable>
    </View>
    )
}

export default IncomingSwap;