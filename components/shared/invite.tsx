import React, { useState, useEffect} from 'react';
import {
    View,
    Button,
    StyleSheet,
    Text,
    TextInput,
    Pressable,
    Platform,
    PermissionsAndroid,
    Image
} from 'react-native';

import {styles} from '../../css/add/friend/Style';
import axios from "axios";
import { ImageStyles } from '../../css/imageCluster/Style';
import {BACKEND_URL} from '@env';
import {showMessage} from 'react-native-flash-message'


function Invite({text, config, props, pagetoNav}): JSX.Element {

  const [qrValue, setQrValue] = useState('')
  const [openScanner, setOpenScanner] = useState(false)

  const onBarcodeScan = function(qrvalue) {
    if(!qrvalue.startsWith("https://tread.run/requestFriend?")){
      qrvalue = "";
    }
    else{
      qrvalue = qrvalue.split("?")[1];
    }

    setQrValue(qrvalue)
    setValidID(true)
    setOpenScanner(false)
    if(pagetoNav == 'League Details'){
      props.navigation.navigate(pagetoNav, {leagueData : props.route.params.leagueData})
    }else{
      props.navigation.navigate(pagetoNav)
    }
  }

  const handleBack = function(qrValue) {
    setOpenScanner(false)
    setValidID(false)
    if(pagetoNav == 'League Details'){
      props.navigation.navigate(pagetoNav, {leagueData : props.route.params.leagueData})
    }else{
      props.navigation.navigate(pagetoNav)
    }  }

  const onOpenScanner = function() {
    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'App needs permission for camera access',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setQrValue('');
            setOpenScanner(true);
          } else {
            alert('CAMERA permission denied');
          }
        } catch (err) {
          alert('Camera permission err', err);
          console.warn(err);
        }
      }
      requestCameraPermission();
    } else {
      setQrValue('');
      setOpenScanner(true);
    }
  }
    const [friendID, setFriendID] = useState("");
    const [validID, setValidID] = useState(false);

    const onFriendChange = function(id) {
        setFriendID(id);
        if(checkValidID(id)) {
            setValidID(true);
        } else {
            setValidID(false);
        }
    }

    const checkValidID = function(id) {
        return id.length > 0
    }
    const onSubmit = async function() {
      var message = ''

      pagetoNav === 'AddFriend' ? config['data']['friendName'] = friendID : config['data']['recipient'] = friendID;

      axios(config)
        .then(function (response) {
            var message = ''
            if(response.data === 'Already sent'){
              message = 'You\'ve already sent a request to ' + friendID
              showMessage({
                floating : true,
                message : message,
                backgroundColor : '#014421',
                color : '#F9A800',
              })
            } else if(response.data === "You are already a friend"){
              message = 'You\'re already friends with ' + friendID
              showMessage({
                floating : true,
                message : message,
                backgroundColor : '#014421',
                color : '#F9A800',
              })
            } else if(response.data === "You are blocked"){
              message = "You are blocked by " + friendID
              showMessage({
                floating : true,
                message : message,
                type : 'warning',
              })
            } else {
              message = pagetoNav === 'League Details' ? 'Sent league invite to ' + friendID :  'Sent friend request to ' + friendID
              showMessage({
                floating : true,
                message : message,
                backgroundColor : '#014421',
                color : '#F9A800',
              })
            }
            onFriendChange("");
        })
        .catch(function (error) {
            console.log(error);
            onFriendChange("");
            showMessage({
              floating : true,
              message : 'Error sending ' + (pagetoNav === 'League Details' ? 'league invite': 'friend request') + ' to ' + friendID,
              type : 'danger',
            })
        });
    }

    return (
        <View style = {styles.Background}>
          {openScanner ?
            props.navigation.navigate("CameraView", {qrValue : qrValue, setQrValue : setQrValue, openScanner : openScanner, setOpenScanner, onBarcodeScan : onBarcodeScan, handleBack : handleBack})
          :
          <View style = {{flex : 1}}>
            <View style = {styles.TitleContainer}>
              <Text style = {styles.Title}>
                  {text}
              </Text>
            </View>

            <View style = {styles.InputContainer}>
              <View style = {styles.FriendContainer}>
                <TextInput
                  placeholder = "Enter User id"
                  placeholderTextColor= "grey"
                  style = {styles.Input}
                  onChangeText = {onFriendChange}
                  value = {qrValue === '' ? friendID : qrValue}
                >
                </TextInput>
                <View>
                  <Pressable
                    onPress={() => onOpenScanner()}
                  >
                    <Image style ={ImageStyles.QR} source={{uri: 'https://imgur.com/zw0xwNA.png'}}/>
                  </Pressable>
                </View>
              </View>

              <View style = {styles.SubmitContainer}>
                  <Pressable style = {validID ? styles.ButtonValid : styles.ButtonInvalid}
                              onPress = {onSubmit}
                              disabled = {!validID}>
                      <Text style = {styles.RequestText}>
                          Send Request
                      </Text>
                  </Pressable>
              </View>
            </View>
          </View>
          }
      </View>
    )

}

export default Invite;
