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

function Invite({ text, config, props, pagetoNav }): JSX.Element {
  let referenceCam;
  //const [qrValue, setQrValue] = useState('')
  const [openScanner, setOpenScanner] = useState(false)
  const [friendID, setFriendID] = useState("");
  const [validID, setValidID] = useState(false);

  useEffect(() => {
    if (openScanner) {
      console.log(openScanner);
      }
  }, [openScanner])
  const onBarcodeScan = function (event) {
    let qrvalue = event.nativeEvent.codeStringValue;
    console.log("On bar code scan called");
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

    console.log("friend values being set");
    setFriendID(qrvalue)
    setValidID(true)
    setOpenScanner(false)

    if (pagetoNav == 'League Details') {
      console.log("Navigate to league with ", props.route.params.leagueData)
      props.navigation.navigate(pagetoNav, { leagueData: props.route.params.leagueData })
    } else {
      console.log("navigate to ", pagetoNav);
      props.navigation.navigate(pagetoNav)
    }
  }

  const handleBack = function () {
    console.log("Handle back called");
    setOpenScanner(false)
    setValidID(false)
    if (pagetoNav == 'League Details') {
      props.navigation.navigate(pagetoNav, { leagueData: props.route.params.leagueData })
    } else {
      props.navigation.navigate(pagetoNav)
    }
  }

  async function requestAndroidCameraPermission() {
    try {
      console.log("Trying to request permissions");
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs permission for camera access',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Permissions granted");
        console.log(granted);
        //setQrValue('');
        setOpenScanner(true);
      } else {
        console.log("Permissions not granted");
        alert('CAMERA permission denied');
      }
    } catch (err) {
      console.log("Get permissios failed")
      alert('Camera permission err', err);
      console.warn(err);
    }
  }

  async function requestAppleCameraPermission() {
    console.log("Tries to call apple permissions??")
    try {
      let isCameraAuthorized = await referenceCam.requestDeviceCameraAuthorization();

      if (isCameraAuthorized === -1 || isCameraAuthorized === false) {
        isCameraAuthorized = await referenceCam.requestDeviceCameraAuthorization();
      }

      if (isCameraAuthorized === true) {
        //setQrValue('');
        setOpenScanner(true);
      }
      else {
        alert('Camera permission denied. Check your iphone settings');
      }
    }
    catch (err) {
      alert('Camera permission denied. Check your iphone settings');
    }
  }

  const onOpenScanner = function () {
    console.log("calls open scanner", openScanner)
    if (Platform.OS === 'android') {
      requestAndroidCameraPermission();
    } else if (Platform.OS === "ios") {
      requestAppleCameraPermission();
    }
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

    pagetoNav === 'AddFriend' ? config['data']['friendName'] = friendID : config['data']['recipient'] = friendID;

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
          message = pagetoNav === 'League Details' ? 'Sent league invite to ' + friendID : 'Sent friend request to ' + friendID
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
        console.log(error);
        onFriendChange("");
        showMessage({
          floating: true,
          message: 'Error sending ' + (pagetoNav === 'League Details' ? 'league invite' : 'friend request') + ' to ' + friendID,
          type: 'danger',
        })
      });
  }

  return (
    <View style={styles.Background}>
      <Camera style={{ visibility: 'hidden' }} ref={(ref) => { referenceCam = ref }} />

      {openScanner ? <CameraView handleBack={handleBack} onBarCodeScan={onBarcodeScan} /> :
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
              >
              </TextInput>
              <View>
                <Pressable
                  onPress={() => onOpenScanner()}
                >
                  <Image style={ImageStyles.QR} source={{ uri: 'https://imgur.com/zw0xwNA.png' }} />
                </Pressable>
              </View>
            </View>

            <View style={styles.SubmitContainer}>
              <TouchableHighlight style={validID ? styles.ButtonValid : styles.ButtonInvalid}
                onPress={onSubmit}
                underlayColor='#013319'
                disabled={!validID}>
                <Text style={styles.RequestText}>
                  Send Request
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>}
    </View>
  )

}

export default Invite;
