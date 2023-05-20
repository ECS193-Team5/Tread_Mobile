import React, { useState, useEffect} from 'react';
import {
    View,
    Text,
    TouchableHighlight,
} from 'react-native';

import {styles} from '../../css/add/friend/Style';


function LeagueInvite({text, config, onPress, qrValue}): JSX.Element {
  return (
      <View style = {[styles.Background, {paddingTop : '0%'}]}>
        <View style = {styles.LeagueTitleContainer}>
          <Text style = {styles.Title}>
              {text}
          </Text>
        </View>
        <View style = {[styles.InputContainer, {flex: 90, marginTop : '0%', marginHorizontal : '0%'}]}>
          <View style = {[styles.SubmitContainer,{justifyContent : 'center'}]}>
            <TouchableHighlight style = {styles.ButtonValid}
              onPress = {onPress}
              underlayColor = '#013319'
            >
              <Text style = {styles.RequestText}>
                Scan QR Code
              </Text>
            </TouchableHighlight>
          </View>
        </View>
        <Text style = {styles.RequestText}>
        </Text>
      </View>
  )
}

export default LeagueInvite;
