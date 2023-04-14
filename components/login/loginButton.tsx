import React from 'react';
import {
	TouchableOpacity,
	Button
} from 'react-native';

import {
	GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {ANDROID_CLIENT, WEB_CLIENT, IOS_CLIENT} from '@env';

function configureGoogleSignIn() {
	console.log('Configuring Google sign in');
	GoogleSignin.configure({
			offlineAccess: true,
			androidClientId: ANDROID_CLIENT,
			webClientId: WEB_CLIENT,
			iosClientId: IOS_CLIENT
	});
	console.log('Configured Google sign in');
}

function signInGoogle(navigation) {
	GoogleSignin.hasPlayServices().then((hasPlayService) => {
		console.log('Signing in');
		if (hasPlayService) {
			 GoogleSignin.signIn().then((userInfo) => {
				 console.log(JSON.stringify(userInfo))
				 navigation.navigate('Challenge')
			 }).catch((e) => {
				 console.log("ERROR IS A: " + JSON.stringify(e));
			 })
		}
	}).catch((e) => {
			console.log("ERROR IS B: " + JSON.stringify(e));
	})
}

function loginOnPress(navigation) {
// 	navigation.navigate('Challenge');
	console.log('Button pressed');
	configureGoogleSignIn();
	signInGoogle(navigation);
}

function LoginButton(props): JSX.Element {
	return (
		<Button
				title = 'Log in'
				onPress = {() => loginOnPress(props.navigation)}
			/>
	)
}

export default LoginButton;
