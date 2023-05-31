import React, { useState, useEffect} from 'react';
import {
  View,
  Pressable,
  StatusBar,
  Image,
  SafeAreaView,
  Platform,
  PermissionsAndroid
} from 'react-native';

import {Camera, CameraScreen} from 'react-native-camera-kit';
import {styles} from '../css/add/friend/Style';
import { ImageStyles } from '../css/imageCluster/Style';
import { useIsFocused } from '@react-navigation/native';

function CameraView(props): JSX.Element {
  const isFocused = useIsFocused();
  console.log(props);
  const [permissions, setPermissions] = useState(false);
  let referenceCam;

  useEffect(() => {
    if(isFocused){
      askPermissions();
    }
  }, [isFocused])

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
        setPermissions(true);
      } else {
        console.log("Permissions not granted");
        alert('CAMERA permission denied');
        setPermissions(false);
      }
    } catch (err) {
      console.log("Get permissios failed")
      alert('Camera permission err', err);
      console.warn(err);
      setPermissions(false);
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
        setPermissions(true);
      }
      else {
        setPermissions(false);
        alert('Camera permission denied. Check your iphone settings');
      }
    }
    catch (err) {
      setPermissions(false);
      alert('Camera permission denied. Check your iphone settings');
    }
  }

  const askPermissions = function () {
    if (Platform.OS === 'android') {
      requestAndroidCameraPermission();
    } else if (Platform.OS === "ios") {
      requestAppleCameraPermission();
    }
  }

  const returnToPreviousPage = () => {
    if(props.route.params.pageToNav !== "League Details"){
      props.route.params.navigation.navigate(props.route.params.pageToNav, props.route.params.pageProps);
    }
    else{
      props.route.params.navigation.navigate(props.route.params.pageToNav, {leagueData: props.route.params.pageProps.route.params.leagueData});
    }
  }

  if(isFocused && permissions){
    return(
      <View style = {{height : '100%'}}>
        <Camera style={{ visibility: 'hidden' }} ref={(ref) => { referenceCam = ref }} />
        <StatusBar
          barStyle="light-content"
        />
        <SafeAreaView style = {[styles.TitleContainer, {backgroundColor : 'black', flex:3, marginHorizontal : 0}]}>
            <Pressable
              onPress={() => {
                props.route.params.handleBack();
                returnToPreviousPage();
              }}
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
            onReadCode={(event) => {
              props.route.params.onBarcodeScan(event);
              returnToPreviousPage();
            }}
          />
        </View>
      </View>

    )
  }
  else{
    return null;
  }

}

export default CameraView