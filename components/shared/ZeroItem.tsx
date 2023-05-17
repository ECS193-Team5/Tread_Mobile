import React, { useEffect, useState } from 'react';
import {
  Pressable,
  Image,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

import {ImageStyles} from '../../css/imageCluster/Style'
import {SharedStyles} from '../../css/shared/Style'
function ZeroItem({promptText, navigateToText, navigateToPage, props}): JSX.Element {
  return (
    <View>
      <Image style ={ImageStyles.ZeroImage} source={{uri: 'https://imgur.com/q4Uysme.png'}}/>
      <Text style = {SharedStyles.ZeroTextStyle}> {promptText} </Text>
      <TouchableHighlight
        onPress={() => props.navigation.navigate('Add', {screen : navigateToPage})}
        style = {{alignSelf : 'center', marginTop : '2%', borderRadius : 20}}
        underlayColor = 'rgba(0,0,0,0.15)'>
        <Text style = {SharedStyles.NavigatePrompt}> {navigateToText} </Text>
      </TouchableHighlight>
    </View>
    )
}

export default ZeroItem