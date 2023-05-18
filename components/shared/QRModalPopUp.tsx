import React, { useState, useEffect } from 'react';
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
import QRCode from 'react-native-qrcode-svg';
import { modalstyle } from '../../css/shared/modalStyle';
import DragDownBar from './DragDownBar';


function QRModalPopUp({Name, isLeague, security, encodedInfo}) {
  const [url, setURl] = useState("meow");
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if(!load){
      if(isLeague){
        setURl("https://tread.run/requestLeague?" +encodedInfo)
      }
      else{
        setURl("https://tread.run/requestFriend?" +encodedInfo)
      }
      setLoad(true);
    }
  }, [load]);

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

  const GenerateScanPrompt = function(){
    if(isLeague){
      return ('Scan to join')
    } else {
      return ('Scan to add friend')
    }
  }

  return(
    <View style={modalstyle.container}>
      <View style = {modalstyle.dragDownContainer}>
        <DragDownBar/>
      </View>
      <View style = {modalstyle.QRTextContainer}>
        <Text style = {modalstyle.QRTitleTextStyle}>
          {GenerateScanPrompt()}
        </Text>
        <Text style = {modalstyle.QRTitleTextStyle}>
          {Name}
        </Text>
      </View>

      <View style = {modalstyle.ProgressContainer}>
        <View style = {modalstyle.QRCodeContainerStyle}>
        <QRCode
        size={250}
        backgroundColor={'#D9D9D9'}
      value={url}
    />
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