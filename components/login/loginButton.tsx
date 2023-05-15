import React from 'react';
import {
	Text,
	Pressable
} from 'react-native';

import {LoginStyles} from '../../css/login/Style';
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import axios from "axios";
import loginConfig from "../../routes/login/login";

import {ANDROID_CLIENT, WEB_CLIENT, IOS_CLIENT, BACKEND_URL, VAPID_KEY} from '@env';
import messaging from "@react-native-firebase/messaging";

function LoginButton({filled, text, navigation}): JSX.Element {
	const onLoginPress = function () {
		configureGoogleSignIn();
		signInGoogle();
	}

	const configureGoogleSignIn = function() {
		GoogleSignin.configure({
			offlineAccess: true,
			androidClientId: ANDROID_CLIENT,
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
		await messaging().registerDeviceForRemoteMessages();
		const fcmToken = await messaging().getToken({vapidKey: VAPID_KEY});
		return fcmToken;
	}

	const login = async (email, authToken, photo) => {
		const deviceToken = await getFCMToken();

		axios(loginConfig(authToken, deviceToken))
			.then((response) => {
				const hasUsername = response.data['hasUsername'];
				if(hasUsername) {
					navigation.navigate('Challenge')
				} else {
					navigation.navigate('Signup')
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
