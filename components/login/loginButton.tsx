import React, {useEffect} from 'react';
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

function LoginButton({filled, text, navigation}): JSX.Element {
	useEffect(() => {
		getStoredLogIn().then((response) => {
			if(response == 'true' && filled) {
				onLoginPress();
			}
		})
	},[])

	const onLoginPress = function () {
		configureGoogleSignIn();
		signInGoogle();
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
		await messaging().registerDeviceForRemoteMessages();
		messaging().hasPermission().then(enabled => {
			if(enabled) {
				messaging().getToken({vapidKey: VAPID_KEY}).then(token => {
					return token
				});
			} else {
				messaging().requestPermission().then(() => {
					messaging().getToken({vapidKey: VAPID_KEY}).then(token => {
						return token
					});
				})
					.catch(error => {
						console.log('PERMISSION REQUEST :: notification permission rejected');
					})
			}
		})
	}

	const storeLogIn = async () => {
			await AsyncStorage.setItem('loggedIn', 'true');
	}

	const getStoredLogIn = async () => {
		try {
			const item = await AsyncStorage.getItem('loggedIn');
			return String(item)
		} catch (err) {
			console.log(err);
		}

	}

	const login = async (email, authToken, photo) => {
		// const deviceToken = await getFCMToken();
    // console.log(deviceToken)
		axios(loginConfig(authToken, null))
			.then((response) => {
				const hasUsername = response.data['hasUsername'];
				if(hasUsername) {
					storeLogIn();
					navigation.navigate('Challenge')
				} else {
					navigation.navigate('Signup',{
						email: email,
						photo: photo,
						navigation: navigation
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
