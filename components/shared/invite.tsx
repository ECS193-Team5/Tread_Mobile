import React, { useState, useEffect } from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  StatusBar,
  Platform,
  PermissionsAndroid,
  Image,
  TouchableHighlight,
  SafeAreaView
} from 'react-native';
import { Camera, CameraScreen } from 'react-native-camera-kit';
import { styles } from '../../css/add/friend/Style';
import axios from "axios";
import { ImageStyles } from '../../css/imageCluster/Style';
import { BACKEND_URL } from '@env';
import { showMessage } from 'react-native-flash-message'
import CameraView from '../../pages/CameraView';
import { useDispatch } from 'react-redux';
import { badgeF_decrement } from '../../redux/actions/badgeF_actions'

function Invite({ text, config, props, pageToNav }): JSX.Element {

  const [friendID, setFriendID] = useState("");
  const [validID, setValidID] = useState(false);

  const onBarcodeScan = function (event) {
    let qrvalue = event.nativeEvent.codeStringValue;

    if (!qrvalue.startsWith("https://tread.run/requestFriend?")) {

      qrvalue = "";
      showMessage({
        floating: true,
        message: 'Error Getting User Information',
        type: 'danger',
      })
    }
    else {
      qrvalue = qrvalue.split("?")[1];
    }


    setFriendID(qrvalue)
    setValidID(true)
  }

  const handleBack = function () {
    setFriendID("");
    setValidID(false)
  }

  const onFriendChange = function (id) {
    setFriendID(id);
    if (checkValidID(id)) {
      setValidID(true);
    } else {
      setValidID(false);
    }
  }

  const checkValidID = function (id) {
    return id.length > 0
  }

  const dispatch = useDispatch()

  const onSubmit = async function () {
    var message = ''

    pageToNav === 'AddFriend' ? config['data']['friendName'] = friendID : config['data']['recipient'] = friendID;

    axios(config)
      .then(function (response) {
        var message = ''
        if (response.data === 'Already sent') {
          message = 'You\'ve already sent a request to ' + friendID
          showMessage({
            floating: true,
            message: message,
            backgroundColor: '#014421',
            color: '#F9A800',
          })
        } else if (response.data === "You are already a friend") {
          message = 'You\'re already friends with ' + friendID
          showMessage({
            floating: true,
            message: message,
            backgroundColor: '#014421',
            color: '#F9A800',
          })
        } else if (response.data === "You are blocked") {
          message = "You are blocked by " + friendID
          showMessage({
            floating: true,
            message: message,
            type: 'warning',
          })
        } else if (response.data === 'Accepted a received friend request.') {
          message = "Pending invite from " + friendID + ' was accepted'
          showMessage({
            floating: true,
            message: message,
            backgroundColor: '#014421',
            color: '#F9A800',
          })
          dispatch(badgeF_decrement())
        } else {
          message = pageToNav === 'League Details' ? 'Sent league invite to ' + friendID : 'Sent friend request to ' + friendID
          showMessage({
            floating: true,
            message: message,
            backgroundColor: '#014421',
            color: '#F9A800',
          })
        }
        onFriendChange("");
      })
      .catch(function (error) {

        onFriendChange("");
        showMessage({
          floating: true,
          message: 'Error sending ' + (pageToNav === 'League Details' ? 'league invite' : 'friend request') + ' to ' + friendID,
          type: 'danger',
        })
      });
  }

  const goCameraViewPage = () =>{
    props.navigation.navigate("CameraView", { onBarcodeScan: onBarcodeScan, handleBack: handleBack, navigation:props.navigation, pageToNav: pageToNav , pageProps: props})
  }
  return (
    <View style={styles.Background}>

        <View style={{ flex: 1 }}>
          <View style={styles.TitleContainer}>
            <Text style={styles.Title}>
              {text}
            </Text>
          </View>

          <View style={styles.InputContainer}>
            <View style={styles.FriendContainer}>
              <TextInput
                placeholder="Enter User ID"
                placeholderTextColor="grey"
                style={styles.Input}
                onChangeText={onFriendChange}
                value={friendID}
                testID = "enter id"
              >
              </TextInput>
              <View>
                <Pressable
                  onPress={goCameraViewPage}
                >
                  <Image style={ImageStyles.QR} source={{ uri: 'https://imgur.com/zw0xwNA.png' }} />
                </Pressable>
              </View>
            </View>

            <View style={styles.SubmitContainer}>
              <TouchableHighlight style={validID ? styles.ButtonValid : styles.ButtonInvalid}
                onPress={onSubmit}
                underlayColor='#013319'
                disabled={!validID}
                testID = {validID ? "valid send" : "invalid send"}
                >
                <Text style={styles.RequestText}>
                  Send Request
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
    </View>
  )

}

export default Invite;
