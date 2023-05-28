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
import loginConfigApple from '../../routes/login/loginApple';

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

    if (Platform.OS === 'ios'){
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation : appleAuth.Operation.LOGIN,
        requestedScopes : [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
        nonce : rawNonce
      })

      const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user)
      if (credentialState === appleAuth.State.AUTHORIZED){
        await AsyncStorage.setItem('Apple', JSON.stringify(true))
        await AsyncStorage.setItem('AppleUser', JSON.stringify(appleAuthRequestResponse))

        loginApple(appleAuthRequestResponse)
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
      loginAppleAndroid(response)
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

  const loginApple = async (authInfo) => {
		const deviceToken = await getFCMToken()
		var fullName = {givenName : null, familyName : null}
		if (authInfo && authInfo.user !== undefined && authInfo.user.name){
		 fullName = {givenName : authInfo.user.name.firstName, familyName : authInfo.user.name.lastName}
		}

		axios(loginConfigApple(authInfo.identityToken , deviceToken, authInfo.nonce, fullName))
			.then(async (response) => {
				const hasUsername = response.data['hasUsername'];
				if(hasUsername) {
					navigation.navigate('Challenge')
				} else {
					console.log("full name", authInfo.fullName)
					navigation.navigate('Signup',{
						email: authInfo.email,
						photo: "https://imgur.com/FA5aXVD.png",
						navigation: navigation,
						deviceToken: deviceToken,
						firstName: fullName.givenName
					})
				}
			})
			.catch(async function (error) {
        await AsyncStorage.setItem('Apple', JSON.stringify(false))
        await AsyncStorage.setItem('AppleUser', JSON.stringify(false))
				console.log(error);
			});
	}

  const loginAppleAndroid = async (authInfo) => {
		const deviceToken = await getFCMToken()
    	var fullName = {givenName : null, familyName : null}
		if (authInfo && authInfo.user !== undefined && authInfo.user.name){
			fullName = {givenName : authInfo.user.name.firstName, familyName : authInfo.user.name.lastName}
		}
		console.log("Should not be called");
		axios(loginConfigApple(authInfo.id_token , deviceToken, authInfo.nonce, fullName))
			.then(async (response) => {
				console.log("Got a response though");
				const hasUsername = response.data['hasUsername'];
				if(hasUsername) {
					navigation.navigate('Challenge')
				} else {
					navigation.navigate('Signup',{
						email: authInfo.email,
						photo: "https://imgur.com/FA5aXVD.png",
						navigation: navigation,
						deviceToken: deviceToken,
						firstName:fullName.givenName
					})
				}
			})
			.catch(async function (error) {
        await AsyncStorage.setItem('Apple', JSON.stringify(false))
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