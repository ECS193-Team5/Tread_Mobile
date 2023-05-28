import React, {useEffect, useState} from 'react';
import {
  View,
  Text, Image, ActivityIndicator, Platform
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import LoginButton from '../components/login/loginButton';
import {LoginStyles} from '../css/login/Style';
import {GoogleSignin} from "@react-native-google-signin/google-signin";

import axios from "axios";
import loginConfig from "../routes/login/login";

import {ANDROID_CLIENT, WEB_CLIENT, IOS_CLIENT, VAPID_KEY, APPLE_SIGN_IN_CLIENT_ID, APPLE_SIGN_IN_REDIRECT_URL} from '@env';
import messaging from "@react-native-firebase/messaging";
import {PermissionsAndroid} from 'react-native';

import Logo from '../assets/logorenderflipped.png'
import { useFocusEffect } from '@react-navigation/native';
import uuid from 'react-native-uuid'

import { getPageToNavigateOnNotif } from '../components/Helpers/getPageToNavigateOnNotif';
import { showMessage } from 'react-native-flash-message';
import CheckBox from '@react-native-community/checkbox';
import appleAuth, { appleAuthAndroid } from '@invertase/react-native-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import loginConfigApple from '../routes/login/loginApple';

function Login({route, navigation}) {

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
    const rawNonce = uuid.v4()

    if (isLoggedInApple === "true"){
      console.log("says apple is logged in");
      var appleAuthResponse = JSON.parse(appleAuthResponseUser)
      console.log(appleAuthResponse)
      if (Platform.OS === 'ios'){
        console.log("gets into ios");
        try{
        const credentialState = await appleAuth.getCredentialStateForUser(appleAuthResponse.user)
        if (credentialState){
          console.log(credentialState, appleAuthResponse);
          loginApple(appleAuthResponse)
        } else {
          console.log("Try no signedin");
          setIsSignedInApple(false)
        }
        }
        catch(err){
          setIsSignedInApple(false);
        }
      } else {
        navigation.navigate('Challenge', paramsForNavigate);
      }
    } else {
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

  const loginApple = async (authInfo) => {
		const deviceToken = await getFCMToken()
    console.log("Gets  into loggin anpple");
		axios(loginConfigApple(authInfo.identityToken , deviceToken, authInfo.nonce, authInfo.fullName))
			.then(async (response) => {
        console.log("then from the login");
				const hasUsername = response.data['hasUsername'];
				if(hasUsername) {
          setAnimate(false)
          setTimeout(() => {
            setCheckOn(true);
          }, 20);
          setTimeout(() => {
            navigation.navigate('Challenge', paramsForNavigate);
          }, 500);
				} else {
					navigation.navigate('Signup',{
						email: authInfo.email,
						photo: "https://imgur.com/FA5aXVD.png",
						navigation: navigation,
						deviceToken: deviceToken
					})
				}
			})
			.catch(async function (error) {
        console.log("fails login apple");
        await AsyncStorage.setItem('Apple', JSON.stringify(false))
        await AsyncStorage.setItem('AppleUser', JSON.stringify(false))
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
      {isSignedInGoogle || isSignedInApple?
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