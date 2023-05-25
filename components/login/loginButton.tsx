import React, {useEffect, useState} from 'react';
import {
  Image,
	Platform,
	Text,
  TouchableHighlight,
  View
} from 'react-native';

import {LoginStyles} from '../../css/login/Style';
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import axios from "axios";
import loginConfig from "../../routes/login/login";

import uuid from 'react-native-uuid'
import {ANDROID_CLIENT, WEB_CLIENT, IOS_CLIENT, VAPID_KEY, APPLE_SIGN_IN_CLIENT_ID, APPLE_SIGN_IN_REDIRECT_URL} from '@env';
import messaging from "@react-native-firebase/messaging";
import {PermissionsAndroid} from 'react-native';

import {appleAuth, appleAuthAndroid} from '@invertase/react-native-apple-authentication'
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginButton({isGoogle, text, navigation}): JSX.Element {

	const onLoginPressGoogle = function () {
    configureGoogleSignIn();
    signInGoogle();
	}

  useEffect(() => {
    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    if (Platform.OS === 'ios'){
      return appleAuth.onCredentialRevoked(async () => {
        console.log('If this function executes, User Credentials have been Revoked');
      });
    }
  }, []);

  const onLoginPressApple = async function () {
    const rawNonce = uuid.v4()
    console.log(rawNonce)
    
    if (Platform.OS === 'ios'){
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation : appleAuth.Operation.LOGIN,
        requestedScopes : [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
        nonce : rawNonce
      })
  
  
      const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user)
      if (credentialState === appleAuth.State.AUTHORIZED){
        console.log('worked')
  
        console.log(appleAuthRequestResponse)
        // console.log(nonce)
        // console.log(email)
        // console.log(email_verified)
        // console.log(is_private_email)
        // console.log(sub)
  
        await AsyncStorage.setItem('Apple', JSON.stringify(true))
        await AsyncStorage.setItem('AppleUser', JSON.stringify(appleAuthRequestResponse))
  
        // call login function, where the entire request response is passed
        // need to pass rawNonce, idtoken, givenName, familyName 
  
        // login(email, appleAuthRequestResponse.identityToken, "https://imgur.com/FA5aXVD.png")
      }
    } else {
      appleAuthAndroid.configure({
        clientId : APPLE_SIGN_IN_CLIENT_ID,
        redirectUri : APPLE_SIGN_IN_REDIRECT_URL,
        responseType : appleAuthAndroid.ResponseType.ALL,
        scope : appleAuthAndroid.Scope.ALL,
        nonce : rawNonce
      });

      const response = await appleAuthAndroid.signIn()
      await AsyncStorage.setItem('Apple', JSON.stringify(true))

      // call login 
    }


	}

	const configureGoogleSignIn = function() {
		GoogleSignin.configure({
			offlineAccess: true,
			webClientId: WEB_CLIENT,
			iosClientId: IOS_CLIENT
		});
	}

	const signInGoogle = function () {
		GoogleSignin.hasPlayServices().then((hasPlayService) => {
			if (hasPlayService) {
				GoogleSignin.signIn().then((userInfo) => {
						loginGoogle(userInfo['user']['email'], userInfo['idToken'], userInfo['user']['photo']);
				}).catch((e) => {
					console.log("ERROR IS A: " + JSON.stringify(e));
				})
			}
		}).catch((e) => {
			console.log("ERROR IS B: " + JSON.stringify(e));
		})
	}

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

	const loginGoogle = async (email, authToken, photo) => {
		const deviceToken = await getFCMToken()
		axios(loginConfig(authToken, deviceToken))
			.then(async (response) => {
				const hasUsername = response.data['hasUsername'];
				if(hasUsername) {
          await AsyncStorage.setItem('Apple', JSON.stringify(false))
          await AsyncStorage.setItem('AppleUser', JSON.stringify(false))
					navigation.navigate('Challenge')
				} else {
					navigation.navigate('Signup',{
						email: email,
						photo: photo,
						navigation: navigation,
						deviceToken: deviceToken
					})
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	return (
		<TouchableHighlight
			style = {isGoogle ? LoginStyles.loginButton : LoginStyles.signupButton}
			onPress={isGoogle ? onLoginPressGoogle : onLoginPressApple}
      underlayColor = {'#dedfe0'}
		>
      <View style = {{flexDirection : 'row', alignItems : 'center'}}>
        <Image style = {{width : 30, height : 30, resizeMode: 'contain' }} source = {{uri : isGoogle ? "https://imgur.com/DEjJ2GR.png" : "https://imgur.com/b0rZPqQ.png"}}/>
        <Text style={LoginStyles.loginButtonText}>{'     ' + text}</Text>
      </View>
		</TouchableHighlight>
	)
}

export default LoginButton;