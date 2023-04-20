import React from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginButton from '../components/login/loginButton';
import SignUpButton from '../components/signup/signupButton';
import {
	GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {ANDROID_CLIENT, WEB_CLIENT, IOS_CLIENT, BACKEND_URL} from '@env';

import {styles} from '../css/login/Style';

function Login(props): JSX.Element {

  const configureGoogleSignIn = function() {
		console.log('Configuring Google sign in');
		GoogleSignin.configure({
				offlineAccess: true,
				androidClientId: ANDROID_CLIENT,
				webClientId: WEB_CLIENT,
				iosClientId: IOS_CLIENT
		});
		console.log('Configured Google sign in');	
	}

  const signInGoogle = function (target) {
		GoogleSignin.hasPlayServices().then((hasPlayService) => {
			console.log('Signing in');
			if (hasPlayService) {
				GoogleSignin.signIn().then((userInfo) => {
//           console.log(JSON.stringify(userInfo))
          storeInfo(userInfo['user']['email'], userInfo['idToken'])
          .then((res) => {
     				const token = getToken();
     				console.log(token)
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

  const storeInfo = async (email, token) => {
    console.log('storing info')
//     console.log(email)
//     console.log(token)
    try {
			await AsyncStorage.setItem('email', email)
			await AsyncStorage.setItem('token', String(token))
    } catch (err) {
      console.log(err)
    }

    console.log('stored info')
  }

// 	const storeEmail = async (email) => {
// 		try {
// 			await AsyncStorage.setItem('email', email)
// 		} catch (err) {
// 			console.log(err)
// 		}
// 	}
//
// 	const storeToken =  async (token) => {
// 	  console.log('Storing token')
// // 	  console.log(String(token))
// 		try {
// 			await AsyncStorage.setItem('token', String(token))
// 		} catch (err) {
// 			console.log(err)
// 		}
// 		console.log('Stored token')
// 	}

  const getToken = async () => {
    console.log('Getting token')
    try {
      const item = await AsyncStorage.getItem('token');
      console.log(item)

      return String(item)
    } catch (err) {
      console.log(err);
    }
  }

  const login = async () => {

  }

  const handleOnPressLogIn = function () {
		configureGoogleSignIn();
    signInGoogle('Challenge');
  }

  const handleOnPressSignUp = function () {
		configureGoogleSignIn();
    signInGoogle('Signup');
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
								onPress={handleOnPressLogIn}
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
								onPress={handleOnPressSignUp}
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
