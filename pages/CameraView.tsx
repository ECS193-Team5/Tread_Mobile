import React, { useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Platform,
  PermissionsAndroid,
  StatusBar,
  Image,
} from 'react-native';

import {CameraScreen} from 'react-native-camera-kit';
import {styles} from '../css/add/friend/Style';
import { ImageStyles } from '../css/imageCluster/Style';

function CameraView(props): JSX.Element {
  return (
    <View style = {{height : '100%'}}>
      <StatusBar
        barStyle="light-content"
      />
      <View style = {[styles.TitleContainer, {backgroundColor : 'black', flex: 10, marginHorizontal : 0}]}>
          <Pressable
            onPress={() => props.route.params.handleBack('test')}
          >
            <Image style ={{width : 20, height : 20, alignSelf : 'flex-start', margin : '3%'}} source={{uri: 'https://imgur.com/opW6uxv.png'}}/>
          </Pressable>

      </View>
      <View style = {{flex : 100}}>
        <CameraScreen
        hideControls
        showFrame={true}
        scanBarcode={true}
        laserColor={'#014421'}
        frameColor={'#F9A800'}
        colorForScannerFrame={'black'}
        onReadCode={(event) =>
          props.route.params.onBarcodeScan(event.nativeEvent.codeStringValue)
        }
      />
      </View>
    </View>

  )
}

export default CameraView