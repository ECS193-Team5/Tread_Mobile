import React, { useState, useEffect} from 'react';
import {
    View,
    Text,
    Pressable,
} from 'react-native';

import {styles} from '../../css/add/friend/Style';
import axios from "axios";
import {CameraScreen} from 'react-native-camera-kit';

function LeagueInvite({text, config, onPress, qrValue}): JSX.Element {
  return (
      <View style = {styles.Background}>
        <View style = {[styles.InputContainer, {flex: 20, marginTop : '0%', marginHorizontal : '0%'}]}>
          <View style = {[styles.SubmitContainer,{justifyContent : 'center'}]}>
            <Pressable style = {styles.ButtonValid}
              onPress = {onPress}
            >
              <Text style = {styles.RequestText}>
                Scan QR Code
              </Text>
            </Pressable>
          </View>
        </View>
        <Text style = {styles.RequestText}>
            {qrValue}
        </Text>
        <View style = {styles.SeparatorContainer}>
        </View>
      </View>
    // }
    // </View>
  )
}

export default LeagueInvite;
