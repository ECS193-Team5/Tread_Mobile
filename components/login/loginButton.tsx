import React, {useEffect, useState} from 'react';
import {
	Text,
	Pressable
} from 'react-native';

import {LoginStyles} from '../../css/login/Style';
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import loginConfig from "../../routes/login/login";

import {ANDROID_CLIENT, WEB_CLIENT, IOS_CLIENT, VAPID_KEY} from '@env';
import messaging from "@react-native-firebase/messaging";
import {PermissionsAndroid} from 'react-native';

function LoginButton({filled, text, navigation}): JSX.Element {
	let autoLogin = true;

	useEffect(() => {
			GoogleSignin.isSignedIn().then((response) => {
				if(response) {
					if(filled) {
						console.log("Already signed in")
						configureGoogleSignIn();
						signInGoogle();
					}
				} else {
					console.log("Not signed in yet")
					autoLogin = false;
				}
			})
	})

	const onLoginPress = function () {
		if(!autoLogin) {
			configureGoogleSignIn();
			signInGoogle();
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
						login(userInfo['user']['email'], userInfo['idToken'], userInfo['user']['photo']);
				}).catch((e) => {
					console.log("ERROR IS A: " + JSON.stringify(e));
				})
			}
		}).catch((e) => {
			console.log("ERROR IS B: " + JSON.stringify(e));
		})
	}

	const getFCMToken = async() => {
		const enabled = await messaging().hasPermission()

		if(enabled) {
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

	const login = async (email, authToken, photo) => {
		const deviceToken = await getFCMToken()
		axios(loginConfig(authToken, deviceToken))
			.then((response) => {
				const hasUsername = response.data['hasUsername'];
				if(hasUsername) {
					// storeLogIn();
					autoLogin = false;
					navigation.navigate('Challenge')
				} else {
					autoLogin = false;
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
		<Pressable
			style = {filled ? LoginStyles.loginButton : LoginStyles.signupButton}
			onPress={onLoginPress}
		>
			<Text style={filled ? LoginStyles.loginButtonText : LoginStyles.signupButtonText}>{text}</Text>
		</Pressable>
	)
}

export default LoginButton;
