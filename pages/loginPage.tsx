import React from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text
} from 'react-native';

import "../components/Sensors/healthKit";
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

import LoginButton from '../components/login/loginButton';
import SignUpButton from '../components/signup/signupButton';
import {
	GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import axios from 'axios';

import {ANDROID_CLIENT, WEB_CLIENT, IOS_CLIENT, BACKEND_URL, VAPID_KEY} from '@env';

import {styles} from '../css/login/Style';

function Login(props): JSX.Element {

	const storeToken = async () => {
// 	  console.log('Registering device');
		await messaging().registerDeviceForRemoteMessages();
		const fcmToken = await messaging().getToken({vapidKey: VAPID_KEY});
// 		console.log(fcmToken);
// 		console.log('FCM token')
		if (fcmToken) {
// 		  console.log('Setting token')
      await AsyncStorage.setItem('fcmToken', fcmToken)
 		}
	}

  const configureGoogleSignIn = function() {
// 		console.log('Configuring Google sign in');
		GoogleSignin.configure({
				offlineAccess: true,
				androidClientId: ANDROID_CLIENT,
				webClientId: WEB_CLIENT,
				iosClientId: IOS_CLIENT
		});
// 		console.log('Configured Google sign in');	
	}

  const signInGoogle = function () {
		GoogleSignin.hasPlayServices().then((hasPlayService) => {
// 			console.log('Signing in');
			if (hasPlayService) {
				GoogleSignin.signIn().then((userInfo) => {
//           console.log(JSON.stringify(userInfo))
          storeInfo(userInfo['user']['email'], userInfo['idToken'], userInfo['user']['photo'])
          .then((res) => {
//      				const token = getToken();
//      				console.log(token)
							login();
//             props.navigation.navigate('Signup')
          });
// 					props.navigation.navigate(target);
				}).catch((e) => {
					console.log("ERROR IS A: " + JSON.stringify(e));
				})
			}
		}).catch((e) => {
				console.log("ERROR IS B: " + JSON.stringify(e));
		})	
	}

  const storeInfo = async (email, token, photo) => {
//     console.log('storing info')
    try {
			await AsyncStorage.setItem('email', String(email))
			await AsyncStorage.setItem('token', String(token))
			await AsyncStorage.setItem('photo', String(photo))
			await storeToken();
    } catch (err) {
      console.log(err)
    }

//     console.log('stored info')
  }

  const getGoogleToken = async () => {
//     console.log('Getting token')
    try {
      const item = await AsyncStorage.getItem('token');
//       console.log(item)
// 			console.log('Got token')
      return String(item)
    } catch (err) {
      console.log(err);
    }
  }

  const getFCMToken = async () => {
//     console.log('Getting FCM token')
    try {
      const item = await AsyncStorage.getItem('fcmToken');
//       console.log(item)
// 			console.log('Got FCM token')
// 			console.log(item)
      return String(item)
    } catch (err) {
      console.log(err);
    }

  }

  const login = async () => {
//   	console.log('Logging in');
		const authToken = await getGoogleToken();
		const deviceToken = await getFCMToken();

// 		console.log(token);
//     console.log(deviceToken);
//     var FormData = require('form-data');
//     var data = new FormData();

//     data.append('deviceToken', deviceToken);
    // console.log(BACKEND_URL)
		var config = {
      method: 'post',
      url: BACKEND_URL + 'auth/login/google',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Authorization': authToken,
        Accept: 'application/json',
//         ...data.getHeaders()
      },
//       data: data
//       },
      data: {
        'deviceToken': deviceToken
      }
    };

    axios(config)
    .then((response) => {
//       console.log(response.data)
      const hasUsername = response.data['hasUsername'];
// 				console.log(response.data['hasUsername']);
      if(hasUsername) {
        props.navigation.navigate('Challenge')
      } else {
        props.navigation.navigate('Signup')
      }
    })
    .catch(function (error) {
      console.log(error);
    });
//     axios(config)
//     .then(function (response) {
//       console.log(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
  }

//   const handleOnPressLogIn = function () {
// 		configureGoogleSignIn();
//     signInGoogle();
//   }
//
//   const handleOnPressSignUp = function () {
// 		configureGoogleSignIn();
//     signInGoogle();
//   }

  const handleOnPress = function () {
		configureGoogleSignIn();
    signInGoogle();
  }


  return (
      <View >
        <LinearGradient
          colors = {['#014421', '#000000']}
          style = {styles.linearGradient}
          start = {{x:1, y: 0}}
        >
					<View style = {styles.mainContainer}>
						<View style = {styles.titleContainer}>
							<Text style = {styles.titleText}>
								Tread
							</Text>
						</View>
						<View style = {styles.loginContainer}>
							<LoginButton
								onPress={handleOnPress}
							>
							</LoginButton>
						</View>
						<View style = {styles.separatorContainer}>
						    <View style = {styles.outsideSeparator}>
						    </View>
						    <View style = {styles.middleSeparator}>
						        <Text style = {styles.orText}>
						            or
						        </Text>
						    </View>
						    <View style = {styles.outsideSeparator}>
						    </View>
						</View>
						<View style = {styles.signUpContainer}>
							<SignUpButton
								onPress={handleOnPress}
							>
							</SignUpButton>

						</View>

					</View>

        </LinearGradient>
      </View>
  )
}

{/*           <LoginButton */}
{/*             onPress={handleOnPressLogIn} */}
{/*           > */}
{/*           </LoginButton> */}
{/*           <View style={styles.space}/> */}
{/*           <SignUpButton */}
{/*             onPress={handleOnPressSignUp} */}
{/*           >   */}
{/*           </SignUpButton> */}

export default Login;
