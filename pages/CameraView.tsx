import React, { useState, useEffect} from 'react';
import {
  View,
  Pressable,
  StatusBar,
  Image,
  SafeAreaView,
  Platform,
} from 'react-native';

import {CameraScreen} from 'react-native-camera-kit';
import {styles} from '../css/add/friend/Style';
import { ImageStyles } from '../css/imageCluster/Style';

function CameraView(props): JSX.Element {
  return(
    <View style = {{height : '100%'}}>
      <StatusBar
        barStyle="light-content"
      />
      <SafeAreaView style = {[styles.TitleContainer, {backgroundColor : 'black', flex:3, marginHorizontal : 0}]}>
          <Pressable
            onPress={props.handleBack}
          >
            <Image style ={{width : 20, height : 20, alignSelf : 'flex-start', margin : '3%'}} source={{uri: 'https://imgur.com/opW6uxv.png'}}/>
          </Pressable>

      </SafeAreaView>
      <View style = {{flex : 100}}>
        <CameraScreen
        hideControls={false}
        showFrame={true}
        scanBarcode={true}
        laserColor={'#014421'}
        frameColor={'#F9A800'}
        colorForScannerFrame={'black'}
        onReadCode={props.onBarCodeScan}
        actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
        onBottomButtonPressed={props.handleBack}
      />
      </View>
    </View>

  )
}

export default CameraView