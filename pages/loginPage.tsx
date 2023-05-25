import React, {useEffect, useState} from 'react';
import {
  View,
  Text, Image, ActivityIndicator
} from 'react-native';

import "../components/Sensors/healthKit";
import LinearGradient from 'react-native-linear-gradient';
import LoginButton from '../components/login/loginButton';
import {LoginStyles} from '../css/login/Style';
import {GoogleSignin} from "@react-native-google-signin/google-signin";

import axios from "axios";
import loginConfig from "../routes/login/login";

import {ANDROID_CLIENT, WEB_CLIENT, IOS_CLIENT, VAPID_KEY} from '@env';
import messaging from "@react-native-firebase/messaging";
import {PermissionsAndroid} from 'react-native';

import Logo from '../assets/logorenderflipped.png'
import { useFocusEffect } from '@react-navigation/native';

import { getPageToNavigateOnNotif } from '../components/Helpers/getPageToNavigateOnNotif';
import { showMessage } from 'react-native-flash-message';
import CheckBox from '@react-native-community/checkbox';
import appleAuth from '@invertase/react-native-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login({route, navigation}): JSX.Element {

  const [isSignedInGoogle, setIsSignedInGoogle] = useState(true)
  const [isSignedInApple, setIsSignedInApple] = useState(true)

  const [animate, setAnimate] = useState(true)
  const [CheckOn, setCheckOn] = useState(false)

  var paramsForNavigate

  useEffect(() => {
    messaging().getInitialNotification().then(async remoteMessage => {
      if(remoteMessage){
        console.log(remoteMessage)
        console.log('Opened this when app was opened')
        var message = remoteMessage['notification']['body']

        paramsForNavigate = getPageToNavigateOnNotif(message)

        GoogleLogIn()
      }
    })
  })

  useEffect(() => {
    messaging().onNotificationOpenedApp(async remoteMessage => {
      if(remoteMessage){
        console.log('Opened this when app was in background to navigate')
        var message = remoteMessage['notification']['body']
        var paramsForNavigate
        console.log(message)
        paramsForNavigate = getPageToNavigateOnNotif(message)
        console.log(paramsForNavigate)
        navigation.navigate('Challenge', paramsForNavigate)
     }
    }) 
  })

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      var message = remoteMessage['notification']['body']
      showMessage({
        message : remoteMessage['notification']['body'],
        duration	: 3000,
        icon: props => <Image source={{uri: 'https://imgur.com/T3dcr1T.png'}} {...props} />,
        backgroundColor : '#F9A800',
        color : '#014421',
        onPress : () => {navigation.navigate('Challenge', getPageToNavigateOnNotif(message))}
      })
    });
    
    return unsubscribe;
  }, []);
  
  const GoogleLogIn = async function(){
    var isLoggedInApple = await AsyncStorage.getItem('Apple')
    var appleAuthResponseUser =  await AsyncStorage.getItem('AppleUser')
    GoogleSignin.isSignedIn().then((response) => {
      if(response) {
          console.log("Already signed in Google")
          configureGoogleSignIn();
          signInGoogleSilently();
      } else {
        console.log("Not signed in yet Google")
        setIsSignedInGoogle(false)
      }
    })
  }

  const AppleLogIn = async function() {
    var isLoggedInApple = await AsyncStorage.getItem('Apple')
    var appleAuthResponseUser =  await AsyncStorage.getItem('AppleUser')
    if (isLoggedInApple === "true"){
      console.log(appleAuthResponseUser)
      const credentialState = await appleAuth.getCredentialStateForUser(appleAuthResponseUser)
      // call login
      if (credentialState){
        console.log('auto login with apple')
      } else {
        console.log("Not signed in apple yet")
        setIsSignedInApple(false)
      }
    } else {
      console.log("Not signed in apple yet")
      setIsSignedInApple(false)
    }
  }

  const AutoLogin = async function(){
    await GoogleLogIn()
    await AppleLogIn()
  }

	useFocusEffect(() => {
    AutoLogin()
  })

  const getFCMToken = async() => {
		const authorizationStatus = await messaging().hasPermission()
		if(authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
			console.log("Permissions is enabled")
			const token = await messaging().getToken({vapidKey: VAPID_KEY})
			return token
		} else {
			console.log("Permissions not enabled")
			await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
			await messaging().requestPermission()
			const token = await messaging().getToken({vapidKey: VAPID_KEY})
			return token
		}
	}

  const signInGoogleSilently = function () {
		GoogleSignin.hasPlayServices().then((hasPlayService) => {
			if (hasPlayService) {
				GoogleSignin.signInSilently().then((userInfo) => {
						loginGoogle(userInfo['user']['email'], userInfo['idToken'], userInfo['user']['photo']);
				}).catch((e) => {
					console.log("ERROR IS A: " + JSON.stringify(e));
				})
			}
		}).catch((e) => {
			console.log("ERROR IS B: " + JSON.stringify(e));
		})
	}

  const loginGoogle = async (email, authToken, photo) => {
		const deviceToken = await getFCMToken()
		axios(loginConfig(authToken, deviceToken))
			.then(async (response) => {
				const hasUsername = response.data['hasUsername'];
				if(hasUsername) {
          await AsyncStorage.setItem('Apple', JSON.stringify(false))
          await AsyncStorage.setItem('AppleUser', JSON.stringify(false))
          setAnimate(false)
          setTimeout(() => {
            setCheckOn(true);
          }, 20);
          setTimeout(() => {
            navigation.navigate('Challenge', paramsForNavigate);
          }, 500);
				}else {
          setIsSignedInGoogle(false)
        }
			})
			.catch(function (error) {
				console.log(error);
			});
	}

  const configureGoogleSignIn = function() {
		GoogleSignin.configure({
			offlineAccess: true,
			webClientId: WEB_CLIENT,
			iosClientId: IOS_CLIENT
		});
	}

  const default_image = Image.resolveAssetSource(Logo).uri

  return (
    <View >
      {isSignedInGoogle? 
        <LinearGradient
          colors = {['#014421', '#000000']}
          style = {LoginStyles.linearGradientAuto}
          start = {{x:1, y: 0}}
        >
          <Image
            src={default_image}
            style={LoginStyles.logo}
          />
          {animate ? 
            <ActivityIndicator size = 'large' color = "#F9A800" animating = {animate}/>
            :
            <CheckBox
              disabled={false}
              value={CheckOn}
              boxType = {'circle'}
              onFillColor = '#F9A800'
              onCheckColor= '#ffffff'
              animationDuration={0.5}
              lineWidth = {2}
              style = {{alignSelf : 'center'}}
            />
          }
    
        </LinearGradient>

      :
      <LinearGradient
        colors = {['#014421', '#000000']}
        style = {LoginStyles.linearGradient}
        start = {{x:1, y: 0}}
      >
        <Image
          src={'https://i.imgur.com/FTHVwBA.png'}
          style={LoginStyles.pushupImage}
        />

        <Image
          src={'https://i.imgur.com/7z2WZm7.png'}
          style={LoginStyles.liftingImage}
        />

        <Image
          src={'https://i.imgur.com/JqkFVQC.png'}
          style={LoginStyles.skiImage}
        />
        <View style = {LoginStyles.mainContainer}>
          <View style = {LoginStyles.titleContainer}>
            <Text style = {LoginStyles.titleText}>
              Tread
            </Text>
          </View>
          <View style = {LoginStyles.loginContainer}>
            <LoginButton
              isGoogle={true}
              text={'Continue With Google'}
              navigation={navigation}
            >
            </LoginButton>
          </View>
          <View style = {LoginStyles.separatorContainer}>
              <View style = {LoginStyles.outsideSeparator}>
              </View>
              <View style = {LoginStyles.middleSeparator}>
                <Text style = {LoginStyles.orText}>
                    or
                </Text>
              </View>
              <View style = {LoginStyles.outsideSeparator}>
              </View>
          </View>
          <View style = {LoginStyles.signUpContainer}>
            <LoginButton
              isGoogle={false}
              text={'Continue With Apple'}
              navigation={navigation}
            >
            </LoginButton>
          </View>
        </View>

      </LinearGradient>
      }
    </View>
  )
}

export default Login;