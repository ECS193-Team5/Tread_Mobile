import React, { useState } from 'react';
import {
	Pressable,
  Image,
  View,
  Text,
  StatusBar,
  Modal,
  StyleSheet,
  FlatList
} from 'react-native';
import { ImageStyles } from '../../css/imageCluster/Style';

import { modalstyle } from '../../css/shared/modalStyle';


function QRModalPopUp({Name, isLeague, security}) {
  const GeneratePrompt = function(){
    if(isLeague){
      if(security === 'private'){
        return ('This will send a request to join ' +  Name)
      } else {
        return ('You will join ' +  Name)
      }
    } else {
      return ('This will send a friend request to ' + Name)
    }
  }
  
  return(
    <View style={modalstyle.container}>
      <View style = {modalstyle.QRTextContainer}>
        <Text style = {modalstyle.QRTitleTextStyle}> 
          {'Scan to join :'}  
        </Text>
        <Text style = {modalstyle.QRTitleTextStyle}> 
          {Name}  
        </Text>
      </View>

      <View style = {modalstyle.ProgressContainer}>
        <View style = {modalstyle.QRCodeContainerStyle}>
         <Image style ={ImageStyles.QRCode} source={{uri: 'https://i.imgur.com/vdw15Hl.png'}}/>
        </View>
        <View style = {modalstyle.QRCodePromptContainer}>
          <Text style = {modalstyle.QRCodePromptTextStyle}> 
            {GeneratePrompt()}
          </Text>
        </View>
      </View>
    </View>
  )
}



export default QRModalPopUp;