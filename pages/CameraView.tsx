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

import { CameraScreen} from 'react-native-camera-kit';
import {styles} from '../css/add/friend/Style';
import { useIsFocused } from '@react-navigation/native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

function CameraView(props): JSX.Element {
  const isFocused = useIsFocused();
  const [leave, setLeave] = useState(false);
  const [permissions, setPermissions] = useState(false);
  
  useEffect(() => {
    if(isFocused){
      askPermissions();
    }
  }, [isFocused])
  
  useEffect(() => {
    if(isFocused && leave && !permissions){
      setLeave(false);
      if(props.route.params.pageToNav !== "League Details"){
        props.route.params.navigation.navigate(props.route.params.pageToNav, props.route.params.pageProps);
      }
      else{
        props.route.params.navigation.navigate(props.route.params.pageToNav, {leagueData: props.route.params.pageProps.route.params.leagueData});
      }
    }
  }, [isFocused, permissions, leave])

  useEffect(() => {
    console.log("permissions has changed!", permissions);
  }, [permissions])

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
        returnToPreviousPage();
      }
    } catch (err) {
      console.log("Get permissios failed")
      alert('Camera permission err', err);
      console.warn(err);
      returnToPreviousPage();
    }
    console.log(permissions && isFocused);
  }

  async function requestAppleCameraPermission() {
    const cameraPermission = PERMISSIONS.IOS.CAMERA;
    console.log("about to ask for permissions", permissions);
    try {
      const cameraPermissionStatus = await check(cameraPermission);
      console.log(cameraPermissionStatus, " already authorized");
      if (cameraPermissionStatus === RESULTS.GRANTED) {
        console.log("got  camera permissions");
        setPermissions(true);
      }
      else {
        const cameraPermissionRequestResult = await request(cameraPermission);
        
        if(cameraPermissionRequestResult === RESULTS.GRANTED){
          console.log("got camera permissions via prompt");
          setPermissions(true)
        }else{ 
          alert('Camera permission denied. Check your iphone settings');
          returnToPreviousPage();
        }
      }
    }
    catch (err) {
      console.log("denied  due to err");
      console.log(err);
      alert('Camera permission denied. Check your iphone settings');
      returnToPreviousPage();
      
    }
    console.log("At the end, permissions is", permissions);
  }

  const askPermissions = function () {
    if (Platform.OS === 'android') {
      requestAndroidCameraPermission();
    } else if (Platform.OS === "ios") {
      requestAppleCameraPermission();
    }
  }

  const returnToPreviousPage = () => {
    setPermissions(false);
    setLeave(true);
  }

  const onReadCode = (event) => {
    props.route.params.onBarcodeScan(event);
    returnToPreviousPage();
  }

  if(isFocused){
  return(
      <View style = {{height : '100%'}}>
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
        {
          (isFocused && permissions) ?
          <View  style ={{flex:91}}>
          <CameraScreen
            hideControls={false}
            showFrame={true}
            scanBarcode={true}
            laserColor={'#014421'}
            frameColor={'#F9A800'}
            colorForScannerFrame={'black'}
            onReadCode={onReadCode}
            />
            </View>
          :<></>
          }
      </View>
  )
  }
  else{
    return <></>;
  }
}

export default CameraView